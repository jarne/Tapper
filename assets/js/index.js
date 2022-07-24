/**
 * Tapper | client script
 */

const avgClickTimeField = document.getElementById("avgClickTime");

const levelIcon = document.getElementById("levelIcon");
const levelDescription = document.getElementById("levelDescription");

let lastTimestamps = [];

function calcAvgClickTime() {
    const countTimestamps = lastTimestamps.length;

    if (countTimestamps < 10) {
        return;
    }

    let intervals = [];

    for (let t = countTimestamps - 10; t < countTimestamps - 1; t++) {
        let olderTimestamp = lastTimestamps[t];
        let newerTimestamp = lastTimestamps[t + 1];

        const diffSecs = (newerTimestamp - olderTimestamp) / 1000;

        intervals.push(diffSecs);
    }

    let intervalsSum = 0;

    for (let i = 0; i < intervals.length; i++) {
        intervalsSum += intervals[i];
    }

    const avgInterval = intervalsSum / intervals.length;

    return avgInterval;
}

function renderResult(icon, description) {
    levelIcon.innerText = icon;
    levelDescription.innerText = description;
}

function rateResult(clkTime) {
    if (clkTime > 0.3) {
        renderResult("👻", "noob");
    } else if (clkTime > 0.225) {
        renderResult("🙃", "beginner");
    } else if (clkTime > 0.2) {
        renderResult("🤨", "player");
    } else if (clkTime > 0.17) {
        renderResult("🥳", "better player");
    } else if (clkTime > 0.16) {
        renderResult("🤓", "nearly pro");
    } else if (clkTime > 0.15) {
        renderResult("😎", "pro");
    } else if (clkTime < 0.15) {
        renderResult("🤖", "der gerät");
    }
}

function triggerAvgTimeUpdate() {
    const avgClickTime = calcAvgClickTime();

    if (avgClickTime === undefined) {
        return;
    }

    const roundedAvgClickTime = Math.round(avgClickTime * 1000) / 1000;

    avgClickTimeField.innerText = roundedAvgClickTime;

    rateResult(roundedAvgClickTime);
}

document.addEventListener("keydown", (ev) => {
    if (ev.code === "Space") {
        lastTimestamps.push(new Date());
    }

    triggerAvgTimeUpdate();
});
