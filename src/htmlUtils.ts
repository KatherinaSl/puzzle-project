export default function createHTMLElement(tagName: string, className: string): HTMLElement {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}
