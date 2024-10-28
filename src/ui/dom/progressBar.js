

export function createProgressBar(id, type, value, maxValue) {
    const progressBar = document.createElement("progress");
    progressBar.id = id;
    progressBar.className = type;
    progressBar.value = value;
    progressBar.max = maxValue;
    return progressBar;
}