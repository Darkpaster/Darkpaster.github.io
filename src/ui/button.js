export function createButton(txt, onClick){
    const button = document.createElement("button");
    const styles = `
    background-color: red;
    color: black;
    border-radius: 2dvi;
    padding: 1dvi;
    margin: 3dvi;
    bottom: 0px;
    border-color: black;
    `;
    button.setAttribute("style", styles);
    button.onclick = onClick;
    return button;
}