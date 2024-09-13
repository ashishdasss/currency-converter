const BASe_URl =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select")
const button  = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
// for(code in countryList) {
//     console.log(code, countryList[code]);
// }

for ( let select of dropdown){
    for(code in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = code
        newOption.value = code
        if(select.name === "from" && code === "USD") {
            newOption.selected = true;
        }
        if(select.name === "to" && code === "INR") {
            newOption.selected = true;
        }
        select.append(newOption) 
    }

    select.addEventListener("change", (e)=>{
        updateFlag(e.target)
    })
}

const updateFlag = (element)=> {
    let currCode = element.value;
    // console.log(currCode)
    let countryCode = countryList[currCode]
    // console.log(countryCode)
    let newsrc =`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc
}

button.addEventListener("click", async (e)=>{
    e.preventDefault();
    let ammount = document.querySelector(".amount input")
    let amntvalue = ammount.value
    console.log(amntvalue)
    if(amntvalue === "" || amntvalue<1){
        amntvalue = 1; 
        amntvalue = "1"
    }
    // console.log(fromCurr.value ,toCurr.value)
    const URL = `${BASe_URl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`
    let response = await fetch(URL);
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    // console.log(rate);

    let finalAmount = amntvalue * rate
    msg.innerText = `${amntvalue} ${fromCurr .value} = ${finalAmount} ${toCurr.value}`
})
