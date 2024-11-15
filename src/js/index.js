function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBoxShadows(n) {
    let boxShadows = [];
    for (let i = 0; i < n; i++) {
        boxShadows.push(`${random(0, 2000)}px ${random(0, 2000)}px #FFF`);
    }
    return boxShadows.join(', ');
}

window.onload = function () {
    document.getElementById('stars').style.boxShadow = generateBoxShadows(700);
    document.getElementById('stars2').style.boxShadow = generateBoxShadows(200);
    document.getElementById('stars3').style.boxShadow = generateBoxShadows(100);

    const style = document.createElement('style');
    style.textContent = `
        #stars:after { box-shadow: ${document.getElementById('stars').style.boxShadow}; }
        #stars2:after { box-shadow: ${document.getElementById('stars2').style.boxShadow}; }
        #stars3:after { box-shadow: ${document.getElementById('stars3').style.boxShadow}; }
    `;
    document.head.appendChild(style);
    if (/(ipad|iphone|ipod|android)/gi.test(navigator.userAgent)) {
        document.open();
        document.write(`<html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>:(</title><style>body,html{display:flex;justify-content:center;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}h1{font-size:60px;letter-spacing:-1px;line-height:60px;font-weight:100;position:relative;top:20%}p{line-height:1.6;top:50%}</style><div class=container><h1>404</h1><p>This site was configured for PC and cannot be loaded on phone.</div>`);
        document.close();
    }
};
