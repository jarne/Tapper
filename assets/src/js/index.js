/**
 * Tapper | client script
 */

const avgClickTimeField = $("#avgClickTime");

const levelIcon = $("#levelIcon");
const levelDescription = $("#levelDescription");

let lastTimestamps = [];

function calcAvgClickTime() {
    const countTimestamps = lastTimestamps.length;

    if(countTimestamps < 10) {
        return;
    }

    let intervals = [];

    for(let t = (countTimestamps - 10); t < (countTimestamps - 1); t++) {
        let olderTimestamp = lastTimestamps[t];
        let newerTimestamp = lastTimestamps[t + 1];

        const diffSecs = (newerTimestamp - olderTimestamp) / 1000;

        intervals.push(diffSecs);
    }

    let intervalsSum = 0;

    for(let i = 0; i < intervals.length; i++) {
        intervalsSum += intervals[i];
    }

    const avgInterval = intervalsSum / intervals.length;

    return avgInterval;
}

function rateResult(clkTime) {
    if(clkTime > 0.3) {
        levelIcon.text("👻");
        levelDescription.text("noob");
    } else if(clkTime > 0.225) {
        levelIcon.text("🙃");
        levelDescription.text("beginner");
    } else if(clkTime > 0.2) {
        levelIcon.text("🤨");
        levelDescription.text("player");
    } else if(clkTime > 0.17) {
        levelIcon.text("🥳");
        levelDescription.text("better player");
    } else if(clkTime > 0.16) {
        levelIcon.text("🤓");
        levelDescription.text("nearly pro");
    } else if(clkTime > 0.15) {
        levelIcon.text("😎");
        levelDescription.text("pro");
    } else if(clkTime < 0.15) {
        levelIcon.text("🤖");
        levelDescription.text("der gerät");
    }
}

function triggerAvgTimeUpdate() {
    const avgClickTime = calcAvgClickTime();

    if(avgClickTime === undefined) {
        return;
    }

    const roundedAvgClickTime = Math.round(avgClickTime * 1000) / 1000;

    avgClickTimeField.text(roundedAvgClickTime);

    rateResult(roundedAvgClickTime);
}

$(document).keypress((event) => {
    if(event.which === 32) {
        lastTimestamps.push(new Date());
    }

    triggerAvgTimeUpdate();
});
