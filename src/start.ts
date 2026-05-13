
const TitleText = 'The weight of Words';


function start(callback: () => void):HTMLElement {
    const startElement = document.createElement('div');
    startElement.style.display = 'flex';
    startElement.style.flexDirection = 'column';
    startElement.style.alignItems = 'center';
    startElement.style.justifyContent = 'center';
    startElement.style.height = '100%';
    const element = document.createElement('h1');
    element.innerHTML = TitleText;
    element.style.fontSize = '3em';
    const button = document.createElement('button');
    button.innerHTML = 'Start';
    button.style.fontSize = '1.5em';
    button.onclick = callback;
    button.style.display = 'block';
    startElement.appendChild(element);
    startElement.appendChild(button);
    return startElement;
}
export default start;