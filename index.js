"use strict";

// array to hold all the cats and their information
let catList = [
    {
        name: "Thundercat",
        // description: "He's so sweet he gave himself diabetes. Certified therapy animal. Purrs can be heard from across the room.",
        description: ["He's so sweet he gave himself diabetes.", "Certified therapy animal.", "Namesake comes from the fact that his purrs can be heard from across the room.", "My dad likes him and he doesn't like cats."],
        href: "images/thunder.jpg",
        alt: "white and brown cat laying inside of a paper bag looking at the camera",
        belly: "images/thunderbelly.png",
        bellyAlt: "white cat with brown spots laying stretched out with belly facing and looking prime for pets"
    },
    {
        name: "Penny",
        description: ["Sassy.", "Named after the character in Dr. Horrible's Sing Along Blog.", "Plays fetch and loves hairties.", "Sings to her toys when no one is around"],
        href: "images/penny.jpg",
        alt: "brown and white tabby cat with a chubbby belly walking outside in the sun",
        belly: "images/pennybelly.png",
        bellyAlt: "brown and white striped tabby cat sleeping on its side with belly exposed"
    },
    {
        name: "Baby",
        description: ["A prince.", "The oldest of the cats and the most insistent when needing pets.", "Originally named falafel waffle.", "It is difficult to find a picture of him by himself because he's always cuddling with another cat."],
        href: "images/baby.jpg",
        alt: "long hair black and white cat with crossed front paws sitting on a grey couch looking very regal",
        belly: "images/babybelly.png",
        bellyAlt: "fluffly white and black cat sleeping peacefully"
    },
    {
        name: "Taquito",
        description: ["She got her name because she was found in a couch, and a taquito was also found in that couch.", "Basically a garbage disposal who will eat everything and anything", "Not the biggest fan of others"],
        href: "images/taquito.jpg",
        alt: "close up of a short hair brown and white tabby cat laying op a carpet protecting shoes with bright green eyes",
        belly: "images/tacobelly.png",
        bellyAlt: "brown and white tabby with belly exposed looking up at the camera like 'I dare you to pet me'"
    }
];

// obj containing all of the dark and light mode information
let colorPallete = {
    "light": {
        "textColor": "#333",
        "backgroundColor": "#e29587",
        "sectionColor": "#dedede",
        "altTextColor": "#125464",
        "catSrc": "images/blackCat.svg",
        "catAlt": "cute drawing of simple black cat",
        "lbSrc": "images/lbOn.svg",
        "lbAlt": "line drawing of a light bulb lit up and hanging down"
    },
    "dark": {
        "textColor": "#D1B39F",
        "backgroundColor": "#333",
        "sectionColor": "#636363",
        "altTextColor": "#b6c7cb",
        "catSrc": "images/skellyCat.svg",
        "catAlt": "cute drawing of a skeleton cat",
        "lbSrc": "images/lbOff.svg",
        "lbAlt": "line drawing of a light bulb not lit up, hanging down"
    }
};

// create an empty array to hold the contact form submissions in
let contacts = [];


// INITIAL LOADING FUNCTION
// function that is called once the DOM is loaded
function loadCats(){
	// grab the menu element to display the selection of cats there are to choose from
	let catDisplayMenu = document.getElementById("catSelectorMenu");
    // grab the section to display all of the current cat's information
    let catInformation = document.getElementById("catInformation");
    // grab the span that holds the cat that changes on dark mode toggle
    let darkModeToggle = document.getElementById("darkModeToggle");
	
    //choose random cat from the catList array and set the current cat to it
    let randomCat = catList[getRandomNumber(catList.length)];
    setCurrentCat(randomCat);
    
	// iterate through the array of cats to populate the menu element's list items
	for(let cat in catList){
        // create a new li element
        let menuItem = document.createElement("li");

        // check if the cat from the catList is the same as the randomCat, apply class to that cat. 
        // subsequent changes to the selected cat class happen insetCurrentCatInList
        if(catList[cat] === randomCat){
            menuItem.classList.add('selected-cat');
        }
        // add styling class to the new element
        menuItem.classList.add('cat-selector-list-item')
        
        // set cat name as the menu item's inner html
        menuItem.innerHTML = catList[cat].name;
        
        //add event listener to change to a different cat on click
        menuItem.addEventListener("click", setCurrentCatInList);
        
        // append the created menu item to the menu
        catDisplayMenu.appendChild(menuItem);
    }



    // if local storage variable is not set, set it to false and call dark mode function
    if (!window.localStorage.getItem("darkMode")){
        window.localStorage.setItem("darkMode", false);
    }
    toggleDarkMode();

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
    
    // generate a random number from one to ten. inc by 1 to offset from 0.
    let randomNum = parseInt(getRandomNumber(10) + 1);
    // check and show an error if number not entered
    if(petCount.value === ''){
        output += "Please enter a value";
    }
    else if(petCount.value > 10 || petCount.value < 1){
        output += `Please enter a value from 1 to 10`;
    }
    else{   
        let amountOfPets = parseInt(petCount.value);
        let currentCat = document.getElementById("catName").getHTML();
        
        // change pets to pet if the number is 1
        let checkforOnePet = (num) =>
            num !== 1 ? "pets": "pet";

        let checkforOneTime = (num) =>
            num !== 1 ? "times": "time";

        // check to see if the random number and entered value are the same
        if(amountOfPets === randomNum){
            output += `Purrfect Job!<br>${currentCat} wanted ${randomNum} ${checkforOnePet(randomNum)} and you gave them exactly ${amountOfPets} ${checkforOnePet(amountOfPets)}!<br>${currentCat} has climbed into your lap to cuddle.`;
        }
        // if the user enters fewer pets than the cat wants
        else if(amountOfPets < randomNum){
            output += `You gave ${currentCat} ${amountOfPets} ${checkforOnePet(amountOfPets)}, but they wanted ${randomNum} ${checkforOnePet(randomNum)}<br>${currentCat} walks away dreaming of ${randomNum - amountOfPets} more ${checkforOnePet(randomNum - amountOfPets)}`;
            // output += `Dang.<br>The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you only gave them ${amountOfPets} ${checkforOnePet(amountOfPets)}.<br>
            // That's ${randomNum - amountOfPets} fewer ${checkforOnePet(randomNum - amountOfPets)} than what they wanted<br>
            // Better luck next time buddy!`;
        }
        // if the user enters more pets than the cat wants
        else {
            output += `You tried to give ${currentCat} ${amountOfPets} ${checkforOnePet(amountOfPets)}, but they only wanted ${randomNum} ${checkforOnePet(randomNum)}<br>
            Your hand got attacked ${amountOfPets - randomNum} ${checkforOneTime(amountOfPets - randomNum)}.`;
        }
    }
    // output the results 
    gameResults.innerHTML = output;
    // removing hidden class from the game results
    gameResults.classList.remove("hidden");
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
    catInformation.lastElementChild.innerHTML = "";

    document.getElementById("catName").innerHTML = `${cat.name}`

    // build out the list of cat facts with an empty string and each fact in the array added onto it
    let description = "";
    for(let fact in cat.description){
        description += `<li>${cat.description[fact]}</li>`
    }

    
    // build the output string with the cat information
    output += `<img src=${cat.href} alt=${cat.alt}><ul>${description}</ul>`;
    // set the innerHTML to the output string
    catInformation.lastElementChild.innerHTML = output;
    
    // SET CAT BELLY AREA
    // empty out the output string and previous image if any

    output = "";
    catBellyArea.innerHTML = ""
    // also going to empty out the game area results as it could be displaying the previous cat's name
    let gameResults = document.getElementById("gameResults");
    gameResults.innerHTML = "";
    gameResults.classList.add("hidden");

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


// DARK MODE AREA
// this function is called when the dark mode toggle button is clicked.
// it toggles the setting in localStorage and then calls the toggleDarkMode function
function handleDarkModeClick(e){
    e.preventDefault();
    let currentDarkModeState = JSON.parse(localStorage.getItem("darkMode"))
    localStorage.setItem("darkMode", !currentDarkModeState);
    toggleDarkMode();
}

// function that grabs the value from local storage and updates the root element variables to those in the colorPallete object 
function toggleDarkMode(){
    // grab the current dark mode state from local storage
    let darkModeState = JSON.parse(localStorage.getItem("darkMode"))
    
    // grab the root element to change the values on
    let root = document.documentElement;

    // grab the span to put the icon into
    let darkModeCatIcon = document.getElementById("darkModeToggle");

    if(darkModeState){ // switching to dark mode
        // SET ALL THE PROPERTIES
        root.style.setProperty('--background-color', colorPallete["dark"].backgroundColor);
        root.style.setProperty('--text-color', colorPallete["dark"].textColor);
        root.style.setProperty('--section-color', colorPallete["dark"].sectionColor);
        root.style.setProperty('--alt-text', colorPallete["dark"].altTextColor);
        // change the icon in the top right
        darkModeCatIcon.innerHTML = `<img class="lightbulb" src=${colorPallete["dark"].lbSrc}>
                                    <small class="toggle-text">Click me to toggle dark mode</small>
                                    <img class="cat-dark-mode" src=${colorPallete["dark"].catSrc}>`;
    }
    else{ // switching to light mode
        // SET ALL THE PROPERTIES
        root.style.setProperty('--background-color', colorPallete["light"].backgroundColor);
        root.style.setProperty('--text-color', colorPallete["light"].textColor);
        root.style.setProperty('--section-color', colorPallete["light"].sectionColor);
        root.style.setProperty('--alt-text', colorPallete["light"].altTextColor);
        // change the icon in the top right
        darkModeCatIcon.innerHTML = `<img class="lightbulb" src=${colorPallete["light"].lbSrc}>
                                    <small class="toggle-text">Click me to toggle dark mode</small>
                                    <img class="cat-dark-mode" src=${colorPallete["light"].catSrc}>`;
    }
}





// FORM VALIDATION FUNCTIONS
// this function validates the form and updates the form
function validateForm(e){
    e.preventDefault();

    // grab form and save to variable
    let contactForm = document.querySelector("#contactForm");

    // grab all the error message spans
    let errorMessages = document.querySelectorAll(".error-message");

    // grab the selected radio buttons to save the preferred means of contact to the contact object if forms passes validation
    // because the html has one of the radio buttons selected by default there should not be a case where there is not a value here
    let contactPref = document.querySelector('input[name=contactPref]:checked').value;
    
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
    
    // if all form elements pass validation, add the information to the contacts array and display to the screen
    if(nameValid && emailValid && phoneValid && commentValid){
        // create contact object to add into the array
        let contact = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: formatPhoneNumber(contactForm.phone.value),
            contactPref: formatContactPref(contactPref),
            comment: contactForm.comments.value
        };
        contacts.push(contact);

        // empty object to build output onto
        let output = "";

        // add the section and h3 to the output
        output += `<section id="commentList"><h3 class="comment-list-title">List of Comments</h3>`

        // grab the span the for output will go to if it's valid
        for(let contact of contacts){
            output += `<p><strong>Full Name: </strong>${contact.name}<br>`;
            if(contact.email !== ""){ //output the email only if they provided one
                output += `<strong>Email: </strong>${contact.email}<br>`;
            }
            if(JSON.parse(contact.phone) !== ""){ //output the phone only if they provided one
                output += `<strong>Phone Number: </strong>${JSON.parse(contact.phone)}<br>`;
            }
            // finally add the preferred means and comment to the output
            output += `<strong>Preferred Means of contact: </strong>${contact.contactPref}<br>
            <strong>Comment: </strong>${contact.comment}<br></p>`;
        }

        // close out the section tag on the output string
        output += `</section>`;

        // grab the form output span and display the list of comments
        document.getElementById("formOutput").innerHTML = output;

        // reset the form values
        contactForm.name.value = "";
        contactForm.email.value = "";
        contactForm.phone.value = "";
        contactForm.comments.value = "";

        contactForm.name.classList = "";
        contactForm.email.classList = "";
        contactForm.phone.classList = "";
        contactForm.comments.classList = "";
    }
}

// These functions return true/false if the input is invalid
// sets the error message to display on the screen if there are any
// adds the correct classes to indicate success/failure

// name validation function
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

// email validation function
function handleValidateEmail(){
    let emailInput = document.getElementById("email");
    let errorSpan = emailInput.previousElementSibling;
    
    let emailRegex = /.+@\w+.\w+/;

    // clear everything out
    errorSpan.innerHTML = "";
    emailInput.classList.remove("input-validated");
    emailInput.classList.remove("input-error");

    try {
        // if email is empty and not required, return early with true
        if(emailInput.value === "" && !(emailInput.required)){
            return true;
        }
        if(emailInput.value === "" && emailInput.required){
            throw new Error("Email is required");
        }
        if(!emailRegex.test(emailInput.value)){
            throw new Error("Please enter a valid email address");
        }
        else{
            emailInput.classList.add("input-validated");
            return true;
        }
    } catch (error) {
        emailInput.classList.add("input-error");
        errorSpan.innerHTML = error.message;
        return false;
    }
}

// phone number validation function
function validatePhoneNum(){
    // regex checks for a phone number consisting of 10 digits and nothing else
    let phoneRegex = /^\d{10}$/;

    // grab the phone input from the html and the error span
    let phoneInput = document.getElementById("phone");
    let errorSpan = phoneInput.previousElementSibling;

    // empty out any previous errors
    errorSpan.innerHTML = "";
    try {
        // if there is no number inputed but the input is required
        if(phoneInput.value === "" && phoneInput.required){
            throw new Error("Phone number is required");
        }
        // checks if there is input but it's not valid
        if(!(phoneRegex.test(phoneInput.value)) && phoneInput.value !== ""){
            throw new Error("Please enter a valid phone number");
        }
        // if there's no input but it's not required, don't set any classes, but return true
        if(phoneInput.value === "" && !(phoneInput.required)){
            return true;    
        }
        else{
            // if the phone number passes validation then the class is added and true is returned
            phoneInput.classList.add("input-validated");
            return true;
        }
        
    } catch (error) {
        // if there are any errors
        // add the error class to input, display errors on screen, and return false
        phoneInput.classList.add("input-error");
        errorSpan.innerHTML = error.message;
        return false;
    }
}

// comment area validation function
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

// handles the change in required inputs when the preferred contact method option is changed
function handleRadios(e){
    e.preventDefault();

    // grab the current preferred contact method
    let prefContactMethod = document.querySelector('input[name=contactPref]:checked').value;

    // get the phone and email inputs as well as the span containing the required styles and adds the *
    let phoneInput = document.getElementById('phone');
    let phoneReqStar = document.querySelector('#phoneInput .required');  
    let emailInput = document.getElementById('email');
    let emailReqStar = document.querySelector('#emailInput .required');

    // reset required states
    phoneInput.required = false;
    emailInput.required = false;

    // update required on input depending on preferred contact method
    if(prefContactMethod === 'phone-pref'){
        phoneInput.required = true;
        phoneReqStar.classList.remove('hidden')
        emailReqStar.classList.add('hidden');
    }
    else{
        emailInput.required = true;
        emailReqStar.classList.remove('hidden')
        phoneReqStar.classList.add('hidden');

    }
}

// FORMATTING FUNCTIONS
// these are here to sanitize the inputed information to make it better to display

// formats phone number as (xxx) - xxx-xxxx
function formatPhoneNumber(number){
    return JSON.stringify(number).replace(/(\d{3})(\d{3})(\d+)/g, "($1) $2-$3");
}

// returns phone or email as a standalone string depending on the contact pref
function formatContactPref(contactPref){
    if(contactPref === "phone-pref"){
        return "Phone";
    }else{
        return "Email";
    }
}


// takes in a max value and returns a random number up to that value
function getRandomNumber(maxValue){
    return Math.floor(Math.random() * maxValue);
}

// wait until the dom is loaded before adding js elements
window.addEventListener("DOMContentLoaded", loadCats);

// event listener for dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", handleDarkModeClick);

// event listener for the game
document.getElementById("petBellyBtn").addEventListener("click", petBelly);

// event listener for contact form validation
document.getElementById("contactSubmitBtn").addEventListener("click", validateForm)

// add event listener to the form to update required fields on either email or phone depending on the selection since the rest of the form is updated on submit
document.getElementById("contactForm").addEventListener("change", handleRadios);