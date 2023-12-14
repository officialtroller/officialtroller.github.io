// ==UserScript==
// @name         Troll Client
// @version      0.3.4
// @description  Troll Client
// @author       official_troller
// @license      GPL-3.0
// @match        https://starblast.io/
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @updateURL    https://officialtroller.github.io/ecp-generator/js/surv.user.js
// @downloadURL  https://officialtroller.github.io/ecp-generator/js/surv.user.js
// ==/UserScript==
const CURRENT_RUNNING_VERSION = "0.3.4";
const log = (msg) => console.log(`%c[Troll Client] ${msg}`, "color: #ffff00");
const modlog = (msg) => console.log(`%c[Mod] ${msg}`, "color: #FF00A6");
const stylelog = (msg) => console.log(`%c[Style] ${msg}`, "color: #06c26d");
const updtaelog = (msg) =>
    console.log(`%c[Troll Client] ${msg}`, "color: #00ff00");
const updatelog = (msg) =>
    console.log(`%c[Troll Client] ${msg}`, "color: #ff0000");
console.clear();
document.open();
document.write(
    `<html><head><title>Loading...</title></head><body style="background-color:#a9a90f;"><div style="margin: auto; width: 50%;"><h1 style="text-align: center;padding: 170px 0;font-family:Play,Verdana;">Loading Troll Client...</h1><h1 style="text-align: center;font-family:Play,Verdana;">Please wait</h1></div></body></html>`
);
document.close();
log(`Started`);

function injectLoader() {
    if (window.location.pathname !== "/") {
        log(`Injection not needed`);
        return;
    }

    var url = "https://starblast.io";
    var xhr = new XMLHttpRequest();
    log("Fetching starblast src...");
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var starSRC = xhr.responseText;
            if (starSRC !== undefined) {
                log(`Src fetched successfully`);
                /*console.log("Fetched Source Code:", starSRC);*/ // Add this line for debugging
            }
            if (localStorage.getItem("malaor") === null) {
                localStorage.setItem("malaor", "#ff0000");
            }

            if (localStorage.getItem("gemindeed") === null) {
                localStorage.setItem("gemindeed", "#ff0000");
            }
            const start_time = performance.now();

            function darkenColor(color, percent) {
                // Parse the color into its RGB components
                const hex = color.slice(1);
                const num = parseInt(hex, 16);

                // Convert to HSL
                let r = (num >> 16) / 255;
                let g = ((num >> 8) & 0xFF) / 255;
                let b = (num & 0xFF) / 255;

                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);

                let h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0; // achromatic
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }

                // Darken the color in the HSL space
                l *= 1 - percent / 100;

                // Convert back to RGB
                let c = (1 - Math.abs(2 * l - 1)) * s;
                let x = c * (1 - Math.abs((h * 6) % 2 - 1));
                let m = l - c / 2;

                let newR, newG, newB;

                if (0 <= h && h < 1 / 6) {
                    newR = c;
                    newG = x;
                    newB = 0;
                } else if (1 / 6 <= h && h < 2 / 6) {
                    newR = x;
                    newG = c;
                    newB = 0;
                } else if (2 / 6 <= h && h < 3 / 6) {
                    newR = 0;
                    newG = c;
                    newB = x;
                } else if (3 / 6 <= h && h < 4 / 6) {
                    newR = 0;
                    newG = x;
                    newB = c;
                } else if (4 / 6 <= h && h < 5 / 6) {
                    newR = x;
                    newG = 0;
                    newB = c;
                } else {
                    newR = c;
                    newG = 0;
                    newB = x;
                }

                newR = Math.round((newR + m) * 255);
                newG = Math.round((newG + m) * 255);
                newB = Math.round((newB + m) * 255);

                return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
            }

            log("Loading Mods...");
            //Materials
            const substrings = [
        'case"carbon":this.buildCarbonMaterial();break;'
        , "t.prototype.buildCarbonMaterial=function(){return this.material=new THREE.MeshPhongMaterial({map:I1l0O,bumpMap:I1l0O,specular:6316128,shininess:5,bumpScale:.1,color:1052688,emissive:l11OO.hsvToRgbHex(this.hue,.5,1),emissiveMap:OIO10})},"
        , 'case"titanium":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"#444"),s.addColorStop(.5,"#AAA"),s.addColorStop(.5,"#444"),s.addColorStop(1,"#111");break;'
        , 'carbon:"Carbon"'
      , ];
            const malaor = localStorage.getItem("malaor");
            const additions = [
        'case"x27":this.buildX27Material();break;case"fullcool":this.buildFullColorMaterial();break;case"dimamond":this.buildDiamondMaterial();break;case"fx27":this.buildfX27Material();break;case"blackmonk":this.buildmonkMaterial();break;'
        , `t.prototype.buildfX27Material=function(){return this.material=new THREE.MeshPhongMaterial({map:I1l0O,bumpMap:I1l0O,specularMap:I1l0O,specular:16742012,shininess:30,bumpScale:.1,color:"${malaor}",emissive:l11OO.hsvToRgbHex(this.hue,.5,1),emissiveMap:OIO10})},t.prototype.buildX27Material=function(){return this.material=new THREE.MeshPhongMaterial({map:I1l0O,bumpMap:I1l0O,specularMap:I1l0O,specular:4243711,shininess:30,bumpScale:.1,color:5275808,emissive:l11OO.hsvToRgbHex(this.hue,.5,1),emissiveMap:OOOO0})},t.prototype.buildFullColorMaterial=function(){var t;return t=OlIl0.hsvToRgbHex(this.hue,1,1),this.material=new THREE.MeshPhongMaterial({map:OOO0I,bumpMap:OOO0I,specularMap:OOO0I,specular:12632256,shininess:50,bumpScale:.1,color:t,emissive:OlIl0.hsvToRgbHex(this.hue,.5,1),emissiveMap:II1ll})},t.prototype.buildDiamondMaterial=function(){return this.material=new THREE.MeshPhongMaterial({map:OOO0I,bumpMap:OOO0I,specular:16777215,opacity:.5,shininess:50,side:THREE.DoubleSide,bumpScale:.1,transparent:!0,color:8421504,emissive:OlIl0.hsvToRgbHex(this.hue,.5,1),emissiveMap:II1ll})},t.prototype.buildmonkMaterial=function(){return this.material=new THREE.MeshPhongMaterial({map:I1l0O,bumpMap:I1l0O,specular:0,shininess:0,bumpScale:.1,color:0,emissive:l11OO.hsvToRgbHex(this.hue,.5,1),emissiveMap:OIO10})},`
        , 'case"fx27":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"' + darkenColor(malaor, 80) + '"),s.addColorStop(.5,"' + malaor + '"),s.addColorStop(.5,"' + darkenColor(malaor, 60) + '"),s.addColorStop(1,"' + darkenColor(malaor, 30) + '");break;case"x27":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"hsla(220,100%,30%)"),s.addColorStop(.5,"hsla(200,100%,70%)"),s.addColorStop(.5,"hsla(220,100%,40%)"),s.addColorStop(1,"hsla(200,100%,70%)");break;case"fullcool":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"hsl(" + this.hue + ",90%,50%)"),s.addColorStop(.5,"hsl(" + this.hue + ",90%,70%)"),s.addColorStop(.5,"hsl(" + this.hue + ",90%,30%)"),s.addColorStop(1,"hsl(" + this.hue + ",90%,60%)");break;case"dimamond":for(s=t.createLinearGradient(0,0,0,i),h=Math.min(10,this.size/10),n=a=0,u=h-1;a<=u;n=a+=1)s.addColorStop(n/h,"#757575"),s.addColorStop((n+1)/h,"#222");for(l=t.createLinearGradient(0,0,0,i),l.addColorStop(0,"#ff0000"),l.addColorStop(.1,"#ff0000"),n=o=0,d=h-1;o<=d;n=o+=1)l.addColorStop((n+.5)/h,"#ff0000"),l.addColorStop(Math.min(1,(n+1.5)/h),"#ff0000");break;case"blackmonk":for(s=t.createLinearGradient(0,0,0,i),h=Math.min(10,this.size/10),l=a=0,u=h-1;a<=u;l=a+=1)s.addColorStop(l/h,"#000"),s.addColorStop((l+1)/h,"#2c2c2c");for(n=t.createLinearGradient(0,0,0,i),n.addColorStop(0,"#181818"),n.addColorStop(.1,"#2c2c2c"),l=o=0,d=h-1;o<=d;l=o+=1)n.addColorStop((l+.5)/h,"#000"),n.addColorStop(Math.min(1,(l+1.5)/h),"#2c2c2c");break;'
        , ',x27:"Electric Blue",fullcool:"Full Color",dimamond:"Diamond",fx27:"Custom Material",blackmonk:"Ultra Carbon"'
      , ];
            for (let i = 0; i < substrings.length; i++) {
                const index = starSRC.indexOf(substrings[i]);
                if (index !== -1) {
                    starSRC =
                        starSRC.slice(0, index + substrings[i].length) +
                        additions[i] +
                        starSRC.slice(index + substrings[i].length);
                } else {
                    throw new Error(`Could not find substring ${i + 1}`);
                }
            }
            modlog("Materials added");
            //Emotes
            function modifyVocabulary(mode, additionalEmotes) {
                const modeRegex = new RegExp(
                    `(this\\.${mode}=function\\(e\\)\\{)([\\s\\S]*?)(this\\.vocabulary=\\[)([\\s\\S]*?)(\\])`
                );
                const matchMode = starSRC.match(modeRegex);
                if (matchMode) {
                    const prefix = matchMode[1];
                    const middleCode = matchMode[2];
                    const vocabularyPrefix = matchMode[3];
                    const existingVocabulary = matchMode[4];
                    const suffix = matchMode[5];
                    let modifiedVocabulary;
                    if (mode === "DeathMatchMode" || mode === "BattleRoyaleMode") {
                        modifiedVocabulary = additionalEmotes;
                    } else {
                        modifiedVocabulary = existingVocabulary + "," + additionalEmotes;
                    }
                    starSRC = starSRC.replace(
                        modeRegex
                        , `${prefix}${middleCode}${vocabularyPrefix}${modifiedVocabulary}${suffix}`
                    );
                }
            }
            modifyVocabulary(
                "TutorialMode"
                , '{text:"Nigger",icon:"®",key:"I"},{text:"EOT=Trash",icon:"🤡",key:"J"},{text:"Me",icon:"?",key:"E"},{text:"You",icon:">",key:"D"},{text:"IM a Loser",icon:" ",key:"V"}'
            );
            modifyVocabulary(
                "SurvivalMode"
                , '{text:"Nigger",icon:"®",key:"I"},{text:"EOT=Trash",icon:"🤡",key:"J"},{text:"Me",icon:"?",key:"E"},{text:"You",icon:">",key:"D"},{text:"IM a Loser",icon:" ",key:"V"}'
            );
            modifyVocabulary(
                "TeamMode"
                , '{text:"Nigger",icon:"®",key:"I"},{text:"EOT=Trash",icon:"🤡",key:"J"},{text:"contribute",icon:"°",key:"L"},{text:"Hello",icon:":",key:"W"},{ text: "Bye", icon: "F", key: "H" }'
            );
            modifyVocabulary(
                "InvasionMode"
                , '{text:"Nigger",icon:"®",key:"T"},{text:"EOT=Trash",icon:"🤡",key:"J"},{text:"Alien",icon:"0",key:"W"},{text:"Boss",icon:"¿",key:"V"}'
            );
            modifyVocabulary(
                "DeathMatchMode"
                , '{text:"Good Game",icon:"GG",key:"G"}'
            );
            modifyVocabulary(
                "BattleRoyaleMode"
                , '{text:"Good Game",icon:"GG",key:"G"}'
            );
            modlog("Emotes added");
            //Badges
            const localStorageKey = "badgergers";
            const localStorageData = localStorage.getItem(localStorageKey);

            if (!localStorageData) {
                console.warn(
                    `Local storage key "${localStorageKey}" not found or empty. Nothing will be loaded.`
                );
            } else {
                const badgegersData = JSON.parse(localStorageData);

                if (Array.isArray(badgegersData) && badgegersData.length > 0) {
                    const newCaseTemplate = `case "{name}": this.icon = "{url}"; break;`;
                    let newCases = "";
                    let newBadges = "";

                    badgegersData.forEach(({
                        name
                        , url
                    }) => {
                        const sanitizedCaseName = name.replace(/\s/g, "");
                        newCases += newCaseTemplate
                            .replace("{name}", sanitizedCaseName)
                            .replace("{url}", url);
                        newBadges += `"${sanitizedCaseName}":"${name}",`;
                    });

                    const seasonalIndex = starSRC.indexOf('case"seasonal":');
                    if (seasonalIndex !== -1) {
                        starSRC =
                            starSRC.slice(0, seasonalIndex) +
                            newCases +
                            starSRC.slice(seasonalIndex);
                    }

                    const blankIndex = starSRC.indexOf('blank:"Blank"');
                    if (blankIndex !== -1) {
                        newBadges = newBadges.replace(/,\s*$/, "");
                        starSRC =
                            starSRC.slice(0, blankIndex + 'blank:"Blank"'.length) +
                            "," +
                            newBadges +
                            starSRC.slice(blankIndex + 'blank:"Blank"'.length);
                    }
                }
            }
            modlog("Badges added");
            //Client Settings
            let scibidy = document.createElement("script");
            scibidy.src =
                "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/settingstablablarus.js";
            document.body.appendChild(scibidy);
            //Badge Manager
            let sibiti = document.createElement("script");
            sibiti.src =
                "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/badge-managerse.js";
            document.body.appendChild(sibiti);
            const lowNameCase = localStorage.getItem("lownamecase");
            const timDel = localStorage.getItem("timdel");
            const noobus = localStorage.getItem("noobus");
            const leaderunde = localStorage.getItem("leaderunde");
            const get = localStorage.getItem("emopacity");
            const gemslol = localStorage.getItem("gemindeed");
            const blurdes = localStorage.getItem("blurdes");
            const stationisten = localStorage.getItem("stationisten");
            const weaponisten = localStorage.getItem("weaponisten");
            const oiceat = localStorage.getItem("oiceat");
            const goodles = localStorage.getItem("goodles");
            //main settings
            starSRC = starSRC.replace(
                /"fullcolor"===this\.custom\.finish&&(this\.custom\.finish="alloy"),/
                , ""
            );
            if (oiceat) {
                let vcscript = document.createElement("script");
                vcscript.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/voicechat.user.js";
                document.body.appendChild(vcscript);
                modlog(`Voice Chat loaded`);
            }
            if (weaponisten === "true") {
                let script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/weaponmodels.user.js";
                document.body.appendChild(script);
                modlog(`Custom Weapons added`);
            }

            if (stationisten === "true") {
                let sbibt = document.createElement("script");
                sbibt.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/stationmodels.user.js";
                document.body.appendChild(sbibt);
                modlog(`Custom Bases added`);
            }

            if (get) {
                starSRC = starSRC.replace(/>=\s*4/, `>= ${get}`);
                modlog(get + " Emotes added");
            }

            if (gemslol) {
                starSRC = starSRC.replace(/16711680/g, `"${gemslol}"`);
                modlog("Crystal Color changed");
            }

            if (lowNameCase === "true") {
                starSRC = starSRC.replace(/\.toUpperCase\(\)/g, "");
                starSRC = starSRC.replace(/text-transform:uppercase;/gim, "");
                modlog(`Lowercase added`);
            }

            if (timDel === "true") {
                starSRC = starSRC.replace(
                    /<\/span>\s*\(<span id="menucountdown"><\/span>\)/
                    , ""
                );
                starSRC = starSRC.replace(
                    /e\.prototype\.countdown=function\(\)\{[^}]*\},/
                    , ""
                );
                modlog(`Timer removed`);
            }

            if (noobus === "true") {
                starSRC = starSRC.replace(
                    "Elite Commander Pass"
                    , "Noob Commander Pass"
                );
                starSRC = starSRC.replace("LEADERBOARD", "Leaderboard");
                modlog(`Noob Pass loaded`);
            }

            if (leaderunde === "true") {
                starSRC = starSRC.replace(
                    /this\.[iI10OlL]{3,6}\.mode\.radar_shows_leader/g
                    , "1"
                );
                modlog(`Leader Uncovered`);
            }
            if (blurdes === "true") {
                starSRC = starSRC.replace(
                    /(r\.addEventListener\("click",function\(\)\{)(if\(a\|\|i\.featured\))(.+?)(t\.closeModal\(\),t\.startModdingMode\(i\)\}\))/
                    , '$1document.querySelector("#blur").remove();$2$3$4'
                );
                modlog(`Blur Added`);
            }
            if (goodles === "true") {
                starSRC = starSRC.replace(
                    /,\s*"blank"\s*!==\s*this\.custom\.badge/
                    , ',"blank"'
                );
                starSRC = starSRC.replace(
                    /default:t.fillStyle="hsl\(200,50%,20%\)"/
                    , 'default:t.fillStyle="hsla(50, 100%, 50%, 0)"'
                );
                starSRC = starSRC.replace(
                    /default:t.fillStyle="hsl\(50,100%,70%\)"/
                    , 'case"star":t.fillStyle="hsl(50,100%,70%)",t.fillText("S",e/2,i/2);break;default:t.fillStyle="hsla(50, 100%, 70%, 0)"'
                );
            }
            var regex = /var\s+x\s*=\s*document\.querySelector\(".training"\),/;
            starSRC = starSRC.replace(regex, "");
            starSRC = starSRC.replace(
                "https://starblast.data.neuronality.com/img/starblast_io_logo.svg?3"
                , "https://raw.githubusercontent.com/immagangster2/justsomething/main/clientlolgo.png"
            );
            modlog(`Logo replaced`);
            //log(`Modified Code:\n\n${starSRC}`);
            const end_time = performance.now();
            log(`Loaded Mods successfully (${(end_time - start_time).toFixed(0)}ms)`);
            document.open();
            document.write(starSRC);
            document.close();
            //window.addEventListener("load", () => {
            log("Document loaded");
            setTimeout(() => {
                stylelog("Loading Style");
                document.getElementById("training").style.display = "none";

                function addCss(url) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.type = "text/css";
                    link.href = url;
                    document.getElementsByTagName("head")[0].appendChild(link);
                }
                addCss("https://officialtroller.github.io/css/clitentecsssv1mini.css");
                if (blurdes === "true") {
                    var overlay = document.querySelector("#overlay");
                    var div = document.createElement("div");
                    div.id = "blur";
                    div.style.position = "absolute";
                    div.style.top = "0";
                    div.style.left = "0";
                    div.style.width = "100%";
                    div.style.height = "100%";
                    div.style.background = "hsla(60, 80%, 80%, .3)";
                    div.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
                    div.style.backdropFilter = "blur(7.1px)";
                    div.style.webkitBackdropFilter = "blur(7.1px)";
                    div.style.pointerEvents = "none";
                    div.style.zIndex = "0";
                    overlay.insertBefore(div, overlay.firstChild);
                    overlay.style.zIndex = "1";
                    stylelog(`Blur added`);
                }
                if (window.location.pathname == "/") {
                    if (window.location.pathname == "/") {
                        document.getElementsByClassName(
                                `textcentered community changelog-new`
                            )[0].innerHTML =
                            `\n              <a href="https://open.spotify.com/user/gilpom/playlist/47N9rRbMXezlPXvhqVM3lJ?si=6bHzE9A9S-2TGh7C4OndkA" target="_blank" style="color: rgb(255, 255, 255);"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.56-8-8-8zm3.68 11.56c-.16.24-.44.32-.68.16-1.88-1.16-4.24-1.4-7.04-.76-.28.08-.52-.12-.6-.36-.08-.28.12-.52.36-.6 3.04-.68 5.68-.4 7.76.88.28.12.32.44.2.68zm.96-2.2c-.2.28-.56.4-.84.2-2.16-1.32-5.44-1.72-7.96-.92-.32.08-.68-.08-.76-.4-.08-.32.08-.68.4-.76 2.92-.88 6.52-.44 9 1.08.24.12.36.52.16.8zm.08-2.24C10.16 5.6 5.88 5.44 3.44 6.2c-.4.12-.8-.12-.92-.48-.12-.4.12-.8.48-.92 2.84-.84 7.52-.68 10.48 1.08.36.2.48.68.28 1.04-.2.28-.68.4-1.04.2z" fill-rule="nonzero"></path></svg><br>Spotify</a>\n              <a href="https://www.deezer.com/playlist/5343057502" target="_blank" style="color: rgb(255, 255, 255);"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M9.812 12.464h2.917v-.884H9.81v.884zm-6.54 0h2.916v-.884H3.27v.884zm-3.272 0h2.917v-.884H0v.884zm6.54 0h2.92v-.884H6.54v.884zm6.543 0H16v-.884h-2.917v.884zm0-1.15H16v-.883h-2.917v.89zm-6.542 0h2.92v-.883H6.54v.89zm-6.54 0h2.92v-.883H0v.89zm3.27 0h2.92v-.883H3.27v.89zm6.55 0h2.92v-.883H9.81v.89zm0-1.148h2.92v-.884H9.81v.884zm-6.54 0h2.91v-.884H3.27v.884zm-3.27 0h2.91v-.884H0v.884zm6.54 0h2.92v-.884H6.54v.884zm6.55 0H16v-.884h-2.917v.884zm0-1.15H16v-.883h-2.917v.884zm-6.54 0h2.91v-.883H6.54v.884zm-6.54 0h2.91v-.883H0v.884zm9.82 0h2.92v-.883H9.81v.884zm0-1.15h2.92v-.882H9.81v.883zm-9.82 0h2.91v-.88H0v.882zm6.54 0h2.92v-.88H6.54v.882zm6.54 0H16v-.882h-2.917v.884zM6.54 6.72h2.92v-.885H6.54v.884zm6.543-.002H16v-.883h-2.917v.883zM6.54 5.57h2.92v-.885H6.54v.885zm6.543 0H16v-.885h-2.917v.884zm0-1.15H16v-.884h-2.917v.884z"></path></svg><br>Deezer</a>\n            <a href="https://starblast.dankdmitron.dev/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly-full'></i><br>SL+</a>\n            <a href="https://starblast-shipyard.github.io/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly-full'></i><br>Shipyard</a>\n            <a href="https://starblast.io/modding.html" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-modding'></i><br>Modding Space</a>\n            <a href="https://starblast.io/shipeditor/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly'></i><br>Ship Editor</a>\n            <a href="https://discord.gg/QzVrTRZ6Qk" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-discord'></i><br>Client Launch</a>\n         `;
                    }
                }
                const plaything = document.querySelector("#play");
                const moddingthing = document.querySelectorAll(".mod");

                const onGameStart = () => {
                    document.getElementById("blur").style.display = "none";
                    plaything.removeEventListener("click", onGameStart);
                };

                plaything.addEventListener("click", onGameStart);

                stylelog(`Css applied`);
                stylelog(`Settings added`);
                stylelog(`Badge Manager added`);
                stylelog("Style loaded successfully");
                log(`Client loaded successfully`);
            }, 30);
            //});
        }
    };
    xhr.send();
}
setTimeout(injectLoader, 1);
(async () => {
    log("Checking for Updates...");

    let shouldReload = false;

    GM.xmlHttpRequest({
        method: "GET"
        , url: "https://officialtroller.github.io/ecp-generator/js/surv.user.js"
        , responseType: "text"
        , onload: function(response) {
            const remoteScriptText = response.responseText;
            const remoteMatch = remoteScriptText.match(/@version\s+(\S+)/i);
            if (
                remoteMatch &&
                remoteMatch[1] &&
                remoteMatch[1] !== CURRENT_RUNNING_VERSION
            ) {
                updatelog(`New version available: ${remoteMatch[1]}`);
                window.location.href =
                    "https://officialtroller.github.io/ecp-generator/js/surv.user.js";
                shouldReload = true;
            } else {
                updtaelog("Script is up to date");
            }
        }
        , onerror: function(error) {
            console.error(error);
        }
    , });

    if (shouldReload) {
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
})();
