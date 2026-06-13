"use strict";


const CONFIG = {

    EMAIL:"developeralireza.sh@gmail.com",

    TELEGRAM:"https://t.me/AlirezaApex",

    BALE:"https://ble.ir/alireza_apex",

    SHARE:"https://wzxqrmt-code.github.io/"

};



const $ = id => document.getElementById(id);





/* ================= THEME ================= */


function toggleTheme(){

    document.body.classList.toggle("light-theme");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light-theme")
        ?"light"
        :"dark"
    );

}




if(localStorage.getItem("theme")==="light"){

    document.body.classList.add("light-theme");

}






/* ================= LANGUAGE ================= */


let language =
localStorage.getItem("lang") || "fa";



function toggleLang(){

    language = language==="fa" ? "en":"fa";

    localStorage.setItem("lang",language);


    if(language==="en"){

        document.documentElement.lang="en";

        $("aboutText").innerText =
        "Android Developer with published applications.";

    }

    else{

        document.documentElement.lang="fa";

        $("aboutText").innerText =
        "توسعه دهنده اندروید با اپلیکیشن های منتشر شده.";

    }

}







/* ================= TOAST ================= */


function toast(text){

    const box=$("toast");

    box.innerText=text;

    box.classList.add("show");


    setTimeout(()=>{

        box.classList.remove("show");

    },2500);

}






/* ================= COPY ================= */


function copyText(text){

    navigator.clipboard.writeText(text)

    .then(()=>toast("Copied ✅"))

    .catch(()=>toast(text));

}




$("copyIdBtn")?.addEventListener(
"click",
()=>copyText("@WZXQRMT")
);



$("copyEmailBtn")?.addEventListener(
"click",
()=>copyText(CONFIG.EMAIL)
);







/* ================= LINKS ================= */


$("telegramBtn")?.addEventListener(
"click",
()=>window.open(CONFIG.TELEGRAM,"_blank")
);



$("bleBtn")?.addEventListener(
"click",
()=>window.open(CONFIG.BALE,"_blank")
);








/* ================= FORM ================= */


$("contactForm")?.addEventListener(
"submit",

e=>{

e.preventDefault();


let name=$("nameInput").value.trim();

let email=$("emailInput").value.trim();

let msg=$("messageInput").value.trim();



if(!name || !email || !msg){

toast("Please complete form");

return;

}



let body =
`
Name: ${name}

Email: ${email}

Message:
${msg}
`;



window.location.href =
`mailto:${CONFIG.EMAIL}?subject=Website Message&body=${encodeURIComponent(body)}`;



}

);








/* ================= CLOCK ================= */


function clock(){

let d=new Date();


$("liveClock").innerText =
[
d.getHours(),
d.getMinutes(),
d.getSeconds()

]
.map(x=>String(x).padStart(2,"0"))
.join(":");


}



setInterval(clock,1000);

clock();









/* ================= MENU ================= */


$("hamburgerBtn")
?.addEventListener(
"click",
()=>{

$("mobileMenu").classList.add("active");

}

);



$("mobileCloseBtn")
?.addEventListener(
"click",
()=>{

$("mobileMenu").classList.remove("active");

}

);






/* ================= LOADING ================= */


window.addEventListener(
"load",
()=>{


let loader=$("loadingScreen");


if(loader){

loader.style.opacity="0";


setTimeout(()=>{

loader.remove();

},500);


}


}

);








/* ================= REVEAL ================= */


const observer =
new IntersectionObserver(

entries=>{


entries.forEach(e=>{


if(e.isIntersecting){


e.target.classList.add("visible");


}


});


}

);



document
.querySelectorAll(".reveal")
.forEach(
el=>observer.observe(el)
);







/* ================= PARTICLES ================= */


const canvas=$("particles");


if(canvas){


const ctx=canvas.getContext("2d");


let particles=[];



function resize(){

canvas.width=innerWidth;

canvas.height=innerHeight;

}


resize();


window.onresize=resize;




for(let i=0;i<40;i++){


particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

dx:(Math.random()-.5),

dy:(Math.random()-.5)

});


}




function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



ctx.fillStyle="#9d4dff";



particles.forEach(p=>{


ctx.beginPath();


ctx.arc(
p.x,
p.y,
p.r,
0,
Math.PI*2
);


ctx.fill();



p.x+=p.dx;

p.y+=p.dy;



if(p.x<0||p.x>canvas.width)
p.dx*=-1;


if(p.y<0||p.y>canvas.height)
p.dy*=-1;



});



requestAnimationFrame(animate);


}


animate();


}







/* ================= SHARE ================= */


$("shareBtn")
?.addEventListener(
"click",
()=>{


if(navigator.share){

navigator.share({

title:"Alireza Apex",

url:CONFIG.SHARE

});


}

else{

copyText(CONFIG.SHARE);

}


}

);