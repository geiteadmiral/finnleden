let kodeEL = document.getElementById("kode");
kodeEL.addEventListener("input",sjekkKode);
let nesteEL = document.getElementById("neste side");
let bildeEL = document.getElementById("kodebilde");
let tidEL = document.getElementById("tid");
let tid = 60;
let kakaopauseEL = document.getElementById("kakaopause");
let kakaoEL = document.getElementById("kakao");
let arbeidEL = document.getElementById("arbeid");
arbeidEL.addEventListener("click",tilbakeTilArbeidet);
let restartEL = document.getElementById("restart");
restartEL.addEventListener("click",restart);
let hovedEL = document.getElementById("hoved");
let sluttEl = document.getElementById("slutt");
let mislykketEL = document.getElementById("mislykket");
kakaopauseEL.addEventListener("click",kakaopause);
setTimeout(gi_svaret,5000);
let nedtelling = setInterval(tell_ned, 1000);


function sjekkKode(){
    if (kodeEL.value=="623125"){
        sluttEl.style.display = "flex";
        hovedEL.style.display = "none";
        clearInterval(nedtelling);
    }
}
/*putter løsningen på gåten i den alternative teksten */
function gi_svaret(){
    bildeEL.alt += "623125";
}
function tell_ned(){
    tid = tid-1;
    tidEL.innerText="Julenissen også sier til deg at han har glemt å bytte batteriene å låsen så den går tom for støm om "+ tid +" sekunder"
    if (tid <1){
        mislykketEL.style.display = "flex";
        hovedEL.style.display = "none";
        kakaoEL.style.display = "none";
    }
}
function kakaopause(){
    kakaoEL.style.display = "flex";
    hovedEL.style.display = "none";
}
function tilbakeTilArbeidet(){
    kakaoEL.style.display = "none";
    hovedEL.style.display = "flex";
}
function restart(){
    setInterval(nedtelling);
    tid = 60;
    tidEL.innerText="Julenissen også sier til deg at han har glemt å bytte batteriene å låsen så den gå tom for strøm om "+ tid +" sekunder";
    mislykketEL.style.display = "none";
    hovedEL.style.display = "flex";
    kakaoEL.style.display = "none";
}