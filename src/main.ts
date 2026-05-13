import start from './start';
import "./analogsense";
import StartAnalogType from './analogtype';
document.body.style.margin = '0';   
const app = document.getElementById('app');
document.body.style.height = '100dvh';






if (app) {
    app.style.display = 'block';
    app.style.height = '100%';
    
    app.appendChild(start(() => {
        onStartButtonClick();
    }));
}
function onStartButtonClick() {
    console.log('Start button clicked!');
    if (app) {
        app.innerHTML = '';
        app.appendChild(StartAnalogType([{
                line: "本当に申し訳ありませんでした。",
                reading: "ほんとうにもうしわけありませんでした。",
                enemys: [0, 1, 0.2],
                coins: [0.3, 0.5]
        }]));
    }
}

