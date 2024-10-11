"use strict";
console.log("js loaded");

// array to hold all the cats
let catList = [
    {
        name: "Thundercat",
        description: "He's so sweet he gave himself diabetes. Certified therapy animal. Purrs can be heard from across the room.",
        href: "images/thunder.jpg",
        alt: "",
        belly: "images/thunderbelly.png",
        bellyAlt: ""
    },
    {
        name: "Penny",
        description: "Sassy. Named after the character in Dr. Horrible's Sing Along Blog.",
        href: "images/penny.jpg",
        alt: "",
        belly: "images/pennybelly.png",
        bellyAlt: ""
    },
    {
        name: "Baby",
        description: "A prince. The oldest of the cats and the most insistent when needing pets.",
        href: "images/baby.jpg",
        alt: "",
        belly: "images/babybelly.png",
        bellyAlt: ""
    },
    {
        name: "Taquito",
        description: "Found in a couch where the other thing found was a taquito.",
        href: "images/taquito.jpg",
        alt: "",
        belly: "images/tacobelly.png",
        bellyAlt: ""
    }
];


let colorPallete = {
    "light": {
        "textColor": "#333",
        "backgroundColor": "#e29587",
        "sectionColor": "#d3d3d3",
        "catSrc": "images/blackCat.svg"
    },
    "dark": {
        "textColor": "#D1B39F",
        "backgroundColor": "#333",
        "sectionColor": "#636363",
        "catSrc": "images/skellyCat.svg"
    }
}
let isFormValid = true;

// function to load the cats onto the page after DOM is loaded in
function loadCats(){
    console.log("loading cats...")
	// grab the section to display menu
	let catDisplayMenu = document.getElementById("catSelectorMenu");
    // grab the section to display cat's information
    let catInformation = document.getElementById("catInformation");
    // grab the section to add the dark mode cat to.
    let darkModeToggle = document.getElementById("darkModeToggle");
	
    //choose random cat in list to show information of
    let randomCat = catList[getRandomNumber(catList.length)];

    // call function to display the information from the chosen randomCat
    setCurrentCat(randomCat);
    
	// iterate through array of cats to populate the menu items
	for(let cat in catList){
        // create a new li element
        let menuItem = document.createElement("li");
        // check if cat is chosen random cat
        if(catList[cat] === randomCat){
            // if current cat, add relevant class
            menuItem.classList.add('selected-cat');
        }
        // add li class for styling to new element
        menuItem.classList.add('cat-selector-list-item')

        // set cat name the menu items inner html
        menuItem.innerHTML = catList[cat].name;
        //add event listener to change to a different cat on click
        menuItem.addEventListener("click", setCurrentCatInList);
        // append the menu item to the menu
        catDisplayMenu.appendChild(menuItem);
    }

    // HANDLING DARK MODE
    // check to see if the dark mode variable is already set in local storage and if so toggle dark mode function
    if (window.localStorage.getItem("darkMode")){
    }
    else {
        // if local storage variable is not set, set it to false and call dark mode function
        window.localStorage.setItem("darkMode", false);
    }
    toggleDarkMode();

}

// takes in a max value and returns a random number up to that value
function getRandomNumber(maxValue){
    return Math.floor(Math.random() * maxValue);
}

// called when game submit button is pressed
function petBelly(e){
    e.preventDefault();
    // get the amount entered by the user
    let petCount = document.getElementById("petCount");

    // get gameResults element and clear it out
    let gameResults = document.getElementById("gameResults");
    gameResults.innerHTML = "";

    // set output to empty string
    let output = "";

    // check and show an error if number not entered
    if(petCount.value < 1){
        output += "Please enter a value";
        gameResults.innerHTML = output;
    }
    else{   
        // generate a random number from one to ten. inc by 1 to offset from 0.
        let randomNum = parseInt(getRandomNumber(10) + 1);
        let amountOfPets = parseInt(petCount.value);
        
        // change pets to pet if the number is 1
        let checkforOnePet = (num) =>
            num !== 1 ? "pets": "pet";

        // check to see if the random number and entered value are the same
        if(amountOfPets === randomNum){
            output += `Purrfect! The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you gave them exactly ${amountOfPets} ${checkforOnePet(amountOfPets)}!<br>
            You've won!`;
        }
        // if the user enters fewer pets than the cat wants
        else if(amountOfPets < randomNum){
            output += `Dang.<br>The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you only gave them ${amountOfPets} ${checkforOnePet(amountOfPets)}.<br>
            That's ${randomNum - amountOfPets} fewer ${checkforOnePet(randomNum - amountOfPets)} than what they wanted<br>
            Better luck next time buddy!`;
        }
        // if the user enters more pets than the cat wants
        else {
            output += `Ooops<br>The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you gave them ${amountOfPets} ${checkforOnePet(amountOfPets)}.<br>
            That's ${amountOfPets - randomNum} more ${checkforOnePet(amountOfPets - randomNum)} than what they wanted.<br>
            Better luck next time champ!`;
        }
        // output the results
        gameResults.innerHTML = output;
        // adding the border to the results after the game results display so the padding
        // gameResults.style.setProperty("border", ("2px double var(--dark-coral)"))
        gameResults.style.setProperty("padding", ("10px"))
    }
};

// takes in a cat obj and sets the cat information area of the page to the appropriate values
function setCurrentCat(cat){
    // grab the section that display's the cat's information in the "product display" area
    let catInformation = document.getElementById("catInformation");
    // grab the section to place the cat's belly image
    let catBellyArea = document.getElementById("catBelly");

    // SET CAT INFORMATION
    // create an empty output string to build onto and empty out previous info
    let output = "";
    catInformation.innerHTML = "";

    // build the output string with the cat information
    output += `<h3 id="catName">${cat.name}</h3><img src=${cat.href} alt=${cat.alt}><p id="catDescription">${cat.description}</p>`;
    // set the innerHTML to the output string
    catInformation.innerHTML = output;

    // SET CAT BELLY
    // empty out the output string and previous image if any
    output = "";
    catBellyArea.innerHTML = ""
    // build the output string with the image
    output += `<img src=${cat.belly} alt=${cat.bellyAlt}>`
    catBellyArea.innerHTML = output;
}

// function that adds selected class to current selected cat
function setCurrentCatInList(e){
    e.preventDefault();
    // get the current cat
    let currentCat = document.getElementById("catName").getHTML();
    // get the selected cat
    let selectedCat = e.target.getHTML();

    // return early if selected cat is same as current cat
    if(selectedCat === currentCat) return; 
    
    // grab the menu list of cats
    let catMenuList = document.querySelectorAll(".cat-selector-list-item");
    // iterate through to check for selected cat
    for(let i=0; i < catMenuList.length; i++){
        if(catMenuList[i].innerHTML === selectedCat){
            // add selected class to selected cat
            catMenuList[i].classList.add('selected-cat')
        }else {
            // remove selected class from all other cats
            catMenuList[i].classList.remove('selected-cat')
        }
    }
    setCurrentCat(catList.find(cat => cat.name === selectedCat));
}

function handleDarkModeClick(e){
    console.log("in handle dark mode click")
    e.preventDefault();
    let currentDarkModeState = JSON.parse(localStorage.getItem("darkMode"))
    localStorage.setItem("darkMode", !currentDarkModeState);
    toggleDarkMode();
}

// function to toggle dark mode based on the local storage variable
function toggleDarkMode(){
    // grab the current dark mode state from local storage
    let darkModeState = JSON.parse(localStorage.getItem("darkMode"))
    
    // grab the root element to change the values on
    let root = document.documentElement;

    // grab the span to put the icon into
    let darkModeCatIcon = document.getElementById("darkModeToggle");

    if(darkModeState){
        root.style.setProperty('--background-color', colorPallete["dark"].backgroundColor);
        root.style.setProperty('--text-color', colorPallete["dark"].textColor);
        root.style.setProperty('--section-color', colorPallete["dark"].sectionColor);
        darkModeCatIcon.innerHTML = `<img src=${colorPallete["dark"].catSrc}>`;
    }
    else{
        root.style.setProperty('--background-color', colorPallete["light"].backgroundColor);
        root.style.setProperty('--text-color', colorPallete["light"].textColor);
        root.style.setProperty('--section-color', colorPallete["light"].sectionColor);
        darkModeCatIcon.innerHTML = `<img src=${colorPallete["light"].catSrc}>`;
    }
}

function validateForm(e){
    e.preventDefault();

    // grab form and save to variable
    let contactForm = document.querySelector("#contactForm");

    // grab all the error message spans
    let errorMessages = document.querySelectorAll(".error-message");

    // grab the spans with the validation checkmark or x
    let validationSpans = document.querySelectorAll(".validation");
    
    // set isValid to be true by default
    let isFormValid = true;
    
    // clear out error class from inputs
    contactForm.name.classList.remove("input-error");
    contactForm.phone.classList.remove("input-error");
    contactForm.email.classList.remove("input-error");
    contactForm.comments.classList.remove("input-error");

    // check if the form elements are valid
    let nameValid = validateName();
    let emailValid = handleValidateEmail();
    let phoneValid = validatePhoneNum();
    let commentValid = validateComments();

    // if all form elements pass validation, set isFormValid to true
    if(nameValid && emailValid && phoneValid && commentValid){
        console.log("FORM IS VALID")
        isFormValid = true;
    }

    
}

function validateName(name){
    let nameRegex = /\w+\s\w+/;

    let nameInput = document.getElementById("name");
    let errorSpan = nameInput.previousElementSibling;

    errorSpan.innerHTML = "";

    try {
        if(nameInput.value === "" && nameInput.required){
            throw new Error("name is required")
        }
        if(!nameRegex.test(nameInput.value)){
            throw new Error("Please enter your first and last name")
        }
        else{
            return true;

        }
        
    } catch (error) {
        nameInput.classList.add("input-error");
        // set isFormValid to false
        errorSpan.innerHTML = error.message;
        return false
    }
}

function handleValidateEmail(){
    let emailInput = document.getElementById("email");
    let errorSpan = emailInput.previousElementSibling;
    
    let emailRegex = /.+@\w+.\w+/;

    errorSpan.innerHTML = "";

    try {
        // if email is empty and not required, return early with true
        if(emailInput.value === "" && !(emailInput.required)){
            emailInput.classList.add("input-validated");
            return true;
        }
        if(emailInput.value === "" && emailInput.required){
            throw new Error("Email is required")
        }
        if(!emailRegex.test(emailInput.value)){
            throw new Error("Please enter a valid email address")
        }
        else{
            emailInput.classList.add("input-validated");
            return true;
        }
    } catch (error) {
        emailInput.classList.add("input-error");
        errorSpan.innerHTML = error.message;
        return false
    }
}

function validatePhoneNum(){
    let phoneRegex = /^\d{10}$/;

    let phoneInput = document.getElementById("phone");
    let errorSpan = phoneInput.previousElementSibling;

    errorSpan.innerHTML = "";
    try {
        if(phoneInput.value === "" && phoneInput.required){
            throw new Error("Phone number is required")
        }
        if(!(phoneRegex.test(phoneInput.value)) && phoneInput.value !== ""){
            throw new Error("Please enter a valid phone number")
        }
        else{
            phoneInput.classList.add("input-validated");
            return true;
        }
        
    } catch (error) {
        phoneInput.classList.add("input-error");
        errorSpan.innerHTML = error.message;
        return false
    }
}

function validateComments(message){
    let commentsInput = document.getElementById("comments");
    let errorSpan = commentsInput.previousElementSibling;

    errorSpan.innerHTML = "";
    try {
        if(commentsInput.value === "" && commentsInput.required){
            throw new Error("comments are required")
        }
        else{
            commentsInput.classList.add("input-validated");
            return true;
        }
    } catch (error) {
        commentsInput.classList.add("input-error");
        errorSpan.innerHTML = error.message;
        return false
    }

}


function handleRadios(e){
    e.preventDefault();

    // grab the current preferred contact method
    let prefContactMethod = document.querySelector('input[name=contactPref]:checked').value;
    let phoneRadio = document.getElementById('phone');
    let phoneReqStar = document.querySelector('#phoneInput .required');  
    let emailRadio = document.getElementById('email');
    let emailReqStar = document.querySelector('#emailInput .required');
    // reset required states
    phoneRadio.required = false;
    emailRadio.required = false;

    // update required on input depending on preferred contact method
    if(prefContactMethod === 'phone-pref'){
        phoneRadio.required = true;
        phoneReqStar.classList.remove('hidden')
        emailReqStar.classList.add('hidden');
    }
    else{
        emailRadio.required = true;
        emailReqStar.classList.remove('hidden')
        phoneReqStar.classList.add('hidden');

    }
}



// wait until the dom is loaded before adding js elements
window.addEventListener("DOMContentLoaded", loadCats);
// event listener for dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", handleDarkModeClick);
// event listener for the game
document.getElementById("petBellyBtn").addEventListener("click", petBelly);
// event listener for contact form validation
document.getElementById("contactSubmitBtn").addEventListener("click", validateForm)

// add event listeners for the radio buttons to update required fields
document.getElementById("contactForm").addEventListener("change", handleRadios);