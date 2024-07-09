let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("button");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
let msg= document.querySelector("form .msg");

for(let opt of dropdowns){
    for(code in countryList){
    let newopt = document.createElement("option");
    newopt.innerText=code;
    newopt.value=code;
    opt.append(newopt);
    if(opt.name==="from" && code==="USD"){
        newopt.selected="selected"; 
     } else if(opt.name==="to" && code==="NPR"){
         newopt.selected="selected";
     } 
    }
    opt.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
    })
}
function  updateFlag(element) {
let currcode = element.value;
let councode = countryList[currcode];
newsrc=`https://flagsapi.com/${councode}/flat/64.png`;
let img =element.parentElement.querySelector("img");
img.src=newsrc;
}


btn.addEventListener( "click", async (evt)=>{
evt.preventDefault();
let amount = document.querySelector("input");
let amountval= amount.value;
if(amountval < 1|| amountval == ""){
amount.value=1;
}
let URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
let response=  await fetch(URL);
let data = await  response.json();
let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

 
let finalamount = amountval * rate;
 finalamount = finalamount.toFixed(2);
msg.innerText=`${amountval} ${fromcurr.value}= ${finalamount} ${tocurr.value}`
});
