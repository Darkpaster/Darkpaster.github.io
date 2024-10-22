export function createButton(content = "ok", type = "menuButton") {
    const button = document.createElement("button");
    button.textContent = content;
    button.className = type;
    // button.onclick = onClick;
    return button;
}