const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
 
const generateBtn = document.querySelector(".generateBtn");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbols = "~!@#$%^&*()}{[]|-=+_\;'/.,:?><`";

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();
// ste strength circle color to grey
// set passwordlength
function handleSlider(){
    // password length ko UI pr reflect karwana hai 
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    console.log(lengthDisplay);
} 

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // Shadow
} 
function getRndInteger(min, max){
   return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;
    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)  {
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    for(let i=array.length-1; i>=0; i-- ){
        const j = Math.floor(Math.random() * (i+1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
 
    let str = "";
    array.forEach((el) => (
        str += el 
    ));

    // console.log(str);
    return str;
}

    function handleCheckBoxChange(checkbox){
    checkCount = 0 ;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener( 'click', ()=> {
    if(passwordDisplay.value){
        copycontent();
    }
})

generateBtn.addEventListener('click', () => {
     //none of the checkbox are selected
     if(checkCount == 0) return ;

     if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
     }
     
     console.log("starging the journey: ");
     password = "";

    let funcArr = []; 
    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    // console.log(password);
    console.log("compulsory done");
    
    for(let i=0; i<passwordLength - funcArr.length; i++){
        // console.log(i);
        let randindex = getRndInteger(0, funcArr.length);
        console.log(randindex);
        password += funcArr[randindex]();
    }
    console.log("remaining done");
     console.log(password);
    password = shufflePassword(Array.from(password));

    console.log("shuffle done");

    passwordDisplay.value= password;
    console.log("UI done");

    calcStrength();
});

    // if(uppercaseCheck.checked ){
    //     password += generateUppercase();
    // }
    // if(LowercaseCheck.checked ){
    //     password += generateLowercase();
    // }
    // if(numbersCheck.checked ){
    //    password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked ){
    //     password += generateSymbol();
    // }