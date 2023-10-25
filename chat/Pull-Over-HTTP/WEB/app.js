import { WCAplicattion } from './WCAplicattion.js'

let main = ()=>
{
    let WCApp = new WCAplicattion();

    document.body.appendChild(WCApp);
}

window.onload = main();
