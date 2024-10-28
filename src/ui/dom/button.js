export function createButton(content = "ok", onclick = () => alert("Unhandled click"), type = "menuButton") {
    const button = document.createElement("button");
    button.textContent = content;
    button.className = type;
    button.id = content.replaceAll(" ", "-");
    button.onclick = onclick;
    return button;
}
