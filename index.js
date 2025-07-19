const characters = ["A","B","C","D","E","F","G","H","I","J","K","L",
    "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b",
    "c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r",
    "s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5",
     "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*",
     "(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",
     ".","?",
    "/"];
// 1. 把characters分成字母、數字和符號三個陣列
const upperCaseLetters = characters.slice(0, 26);
const lowerCaseLetters = characters.slice(26, 52);
const numbers = characters.slice(52, 62);
const symbols = characters.slice(62);

document.getElementById("symbols").checked = false;
document.getElementById("numbers").checked = false;

function validateLength() {
    let passwordLength = parseInt(document.getElementById("length").value);

    if (isNaN(passwordLength)) {
        document.getElementById("length").value = 15; // Default to 15 if input is not a number
        alert("Please enter a valid number for password length.");
    }
    else if (passwordLength < 8 || passwordLength > 20) {
        passwordLength = Math.max(8, Math.min(20, passwordLength)); // Ensure length is between 8 and 20
        document.getElementById("length").value = passwordLength;
        alert("Password length must be between 8 and 20 characters.");
    }
}

function generatePasswords() {
    const options = checkSelectedOptions();
    const passWordOne = generateSinglePassword(options);
    const passWordTwo = generateSinglePassword(options);

    document.getElementById("password-one").textContent = passWordOne;
    document.getElementById("password-two").textContent = passWordTwo;

    document.querySelectorAll(".password").forEach(passwordElement => {
        passwordElement.classList.add("hovereffect");
    });
    document.getElementById("note").style.visibility = "visible";
}

function generateSinglePassword(options) {
    const { passwordLength, caseOption, includeSymbols, includeNumbers } = options;
    let password = "";
    let availableCharacters = [];
    if (caseOption === "mixed") {
        availableCharacters = availableCharacters.concat(upperCaseLetters, lowerCaseLetters);
    } 
    else if (caseOption === "upper") {
        availableCharacters = availableCharacters.concat(upperCaseLetters);
    }
    else if (caseOption === "lower") {
        availableCharacters = availableCharacters.concat(lowerCaseLetters);
    }

    (includeSymbols) ? availableCharacters = availableCharacters.concat(symbols) : null;
    (includeNumbers) ? availableCharacters = availableCharacters.concat(numbers) : null;

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        password += availableCharacters[randomIndex];
    }

    // Ensure at least one character from each selected category is included
    password = ensureCharacterInclusion(password, options);
    
    return password;
}

function ensureCharacterInclusion(password, options) {
    const { passwordLength, caseOption, includeSymbols, includeNumbers } = options;

    let replaced = [];
    // Check whether symbols are included
    if (includeSymbols && !symbols.some(char => password.includes(char))) {
        console.log("Symbols not included, replacing a character with a symbol.");
        password = exchangeLetter(symbols, passwordLength, password, replaced);
    }
    // Check whether numbers are included
    if (includeNumbers && !numbers.some(char => password.includes(char))) {
        console.log("Numbers not included, replacing a character with a number.");
        password = exchangeLetter(numbers, passwordLength, password, replaced);
    }
    // Check case options
    // uppercase
    if ((caseOption === "mixed" || caseOption === "upper") && !upperCaseLetters.some(char => password.includes(char))) {
        console.log("Uppercase letters not included, replacing a character with an uppercase letter.");
        password = exchangeLetter(upperCaseLetters, passwordLength, password, replaced);
    }
    // lowercase
    if ((caseOption === "mixed" || caseOption === "lower") && !lowerCaseLetters.some(char => password.includes(char))) {
        console.log("Lowercase letters not included, replacing a character with a lowercase letter.");
        password = exchangeLetter(lowerCaseLetters, passwordLength, password, replaced);
    }

    return password;
}

function exchangeLetter(letterList, passwordLength, password, replaced) {
    let replaceIndex = Math.floor(Math.random() * passwordLength);
    let randomLetter = letterList[Math.floor(Math.random() * letterList.length)];
    while (replaced.includes(replaceIndex)) {
        console.log(`Index ${replaceIndex} has already been replaced, choosing another index.`);
        replaceIndex = Math.floor(Math.random() * passwordLength);
    }
    replaced.push(replaceIndex);
    password = password.substring(0, replaceIndex) + randomLetter + password.substring(replaceIndex + 1);
    console.log(`Replaced character at index ${replaceIndex} with ${randomLetter}.`);
    return password;
}

function checkSelectedOptions() {
    const passwordLength = parseInt(document.getElementById("length").value);
    const caseOption = document.getElementById("case").value;
    const includeSymbols = document.getElementById("symbols").checked;
    const includeNumbers = document.getElementById("numbers").checked;

    return {
        passwordLength: passwordLength,
        caseOption: caseOption,
        includeSymbols: includeSymbols,
        includeNumbers: includeNumbers
    };
}


document.querySelectorAll(".copy-target").forEach(target => {
    target.addEventListener("click", function(event) {
        if(!event.target.classList.contains("password")) {
            return; // Only copy if the password itself is clicked
        }
        const passwordElement = this.querySelector(".password");
        const passwordText = passwordElement.textContent;

        if (passwordText) {
            const tooltip = this.querySelector(".tooltip");
            tooltip.style.visibility = "visible";
            navigator.clipboard.writeText(passwordText)
                .then(() => {         
                    tooltip.classList.add("show");
                    setTimeout(() => {
                        tooltip.classList.remove("show");
                    }, 1500);
                })
                .catch(err => {
                    alert("Failed to copy, please try again.", err);
                });
        }
    });
});

// Toggle dark mode
function toggleTheme() {
    const body = document.body;
    if(body.classList.contains("dark")) {
        body.classList.remove("dark");
    }
    else {
        body.classList.add("dark");
    }
}