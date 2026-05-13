import StartAnalogSenseReader from "./analogSenseReader";
import type { OnPressedKeyData } from "./analogSenseReader";
import sprite from "./sprite.drawio.svg";
import coinSprite from "./coin.drawio.svg";
import enemySprite from "./enemy.drawio.svg";
import { keygraph } from "./keygraph";


interface typingLine{
    line: string;
    reading: string;
    enemys: number[];
    coins: number[];
}
let typingLines: typingLine[]= [];
let dispTexArea: HTMLDivElement;
let typeArea: HTMLDivElement;
let dispArea: HTMLDivElement;
let hpbar: HTMLMeterElement;
let player: HTMLImageElement;

function StartAnalogType(typingLines: typingLine[],hp?:number):HTMLElement{

    StartAnalogSenseReader(processKeyData);
    
    const game=document.createElement('div');
    game.style.display = 'flex';
    game.style.flexDirection = 'column';
    game.style.height = '100%';
    typingLines = typingLines;

    


    hpbar = document.createElement('meter');
    hpbar.style.width = '100%';
    hpbar.style.height = '5%';
    hpbar.max = hp??100;
    hpbar.value = hp??100;
    hpbar.style.position = 'relative';
    hpbar.style.float = 'top';
    
    game.appendChild(hpbar);


    dispArea = document.createElement('div');
    dispArea.style.height='70%';
    dispArea.appendChild(player = document.createElement('img'));
    player.src = sprite;
    player.style.position = 'absolute';
    player.style.transition = 'bottom 0.1s linear';
    game.appendChild(dispArea);
    
    
    dispTexArea = document.createElement('div');
    dispTexArea.style.height = '10%';
    dispTexArea.style.fontSize = '3em';
    game.appendChild(dispTexArea);
    
    typeArea = document.createElement('div');
    typeArea.style.height = '20%';
    typeArea.style.fontSize = '2em';
    game.appendChild(typeArea);
    
    dispArea.style.position="relative";
    if (hp !== undefined) {
        hp = hp;
    }
    keygraph.build(typingLines[0].reading);
    dispTexArea.innerHTML = typingLines[0].line;
    typeArea.innerHTML = keygraph.key_candidate();
    console.log("Initial setup completed");
    return game;

}
let lock = false;
let altitude = 0;
let hp = 100;

const threshold = 0.2;//強さの閾値
const maxspeed = 0.3;//最大速度
// -1--------------0--------------1
// |---threshold---|---maxspeed---|
const playerSpeed = 0.1;//プレイヤーが一回に最大で移動できる画面での割合（1なら端から端までいける）
async function processKeyData(data: OnPressedKeyData){
    if(lock)return;
    const key = data.key.toLowerCase();
    const depthTimeData = data.data;
    const deltatime = depthTimeData[depthTimeData.length-1].time - depthTimeData[0].time;
    const depth = depthTimeData[depthTimeData.length-1].depth;
    const speed = depth / deltatime;
    
    if(keygraph.next(key)){
        const signedSpeed= speed-threshold;
        const normspeed= signedSpeed>0?Math.min(signedSpeed/(maxspeed-threshold),1):signedSpeed/threshold;//-1から1の範囲に正規化
        altitude += normspeed*playerSpeed;//速度に応じて高度を変化させる
        
        altitude = Math.min(Math.max(altitude,0),1);//0から1の範囲に制限
        console.log(`altitude: ${altitude}, speed: ${speed}, normspeed: ${normspeed}`);
        player.style.bottom = `${altitude*100}%`;//高度に応じてプレイヤーの位置を更新

        typeArea.innerHTML = keygraph.key_done()+`<span style="color:gray;">${keygraph.key_candidate()}</span>`;

        if(keygraph.is_finished())
        {
            typingLines.shift();
            if(typingLines.length>0)
            {
                console.log("Processing next typing line");
                keygraph.build(typingLines[0].reading);
                dispTexArea.innerHTML = typingLines[0].line;
                typeArea.innerHTML = keygraph.key_candidate();
                

            }
            console.log(`finished line data`);
            lock = true;
            await processEnamyAndCoin(typingLines[0].enemys,typingLines[0].coins,altitude);
            lock = false;
        }
        
        
    }
    else
    {
        hp -= 10;
        hpbar.value = hp;
        if(hp<=0)        {
            alert("Game Over");
            location.reload();
        }

    }
}
async function processEnamyAndCoin(enemys: number[], coins: number[],altitudenow:number){
    console.log("Processing enemys and coins");
    //敵とコインの処理を行う関数
    enemys.forEach((num) =>
    {
        document.createElement("img");
        const enemy = document.createElement("img");
        enemy.src = enemySprite;
        enemy.style.position = "absolute";
        enemy.style.left = `${num * 100}%`;
        enemy.style.bottom = "0px";
        enemy.style.transition = `left 1s linear`;
        dispArea.appendChild(enemy);
        enemy.style.left = '0%';
    });
    coins.forEach((num) =>
    {
        const coin = document.createElement("img");
        coin.src = coinSprite;
        coin.style.position = "absolute";
        coin.style.left = `${num * 100}%`;
        coin.style.bottom = "0px";
        coin.style.transition = `left 1s linear`;
        dispArea.appendChild(coin);
        coin.style.left = '0%';
    });
    
    
}


export default StartAnalogType;