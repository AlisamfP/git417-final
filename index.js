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
        belly: "images/penybelly.png",
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

let iconList = [
    {
        darkMode: "images/blackCat.svg",
        lightMode: "images.skellyCat.svg"
    }
]
let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

// function to load the cats onto the page after DOM is loaded in
function loadCats(){
	// grab the section to display menu
	let catDisplayMenu = document.getElementById("catSelectorMenu");
    // grab the section to display cat's information
    let catInformation = document.getElementById("catInformation");
    // grab the section to add the dark mode cat to.
    let darkModeToggle = document.getElementById("darkModeToggle");
	
    //choose random cat in list to show information of
    let randomCat = catList[getRandomNumber(catList.length)];

    // call function to display the information from the chosen randomCat
    displayCurrentCatInfo(randomCat);
    
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
    // check to see if the dark mode variable is in local storage
    if (localStorage.getItem("darkMode")){
        toggleDarkMode();
    }
    else {
        localStorage.setItem("darkMode", false);
    }

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
            output += `Ooops. The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you only gave them ${amountOfPets} ${checkforOnePet(amountOfPets)}.<br>
            That's ${randomNum - amountOfPets} fewer ${checkforOnePet(randomNum - amountOfPets)} than what they wanted<br>
            Better luck next time buddy!`;
        }
        // if the user enters more pets than the cat wants
        else {
            output += `Ooops. The cat wanted ${randomNum} ${checkforOnePet(randomNum)} and you gave them ${amountOfPets} ${checkforOnePet(amountOfPets)}.<br>
            That's ${amountOfPets - randomNum} more ${checkforOnePet(amountOfPets - randomNum)} than what they wanted.<br>
            Better luck next time champ!`;
        }
        // output the results
        gameResults.innerHTML = output;
    }
};

// takes in a cat obj and sets the cat information area of the page to the appropriate values
function displayCurrentCatInfo(cat){
    // grab the section that display's the cat's information
    let catInformation = document.getElementById("catInformation")
    // empty output string to build onto
    let output = "";
    // clear out previous information
    catInformation.innerHTML = "";
    // build the output string
    output += `<h3 id="catName">${cat.name}</h3><img src=${cat.href} alt=${cat.alt}><p id="catDescription">${cat.description}</p>`;
    // set the innerHTML to the output string
    catInformation.innerHTML = output;
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

    displayCurrentCatInfo(catList.find(cat => cat.name === selectedCat));

}

function toggleDarkMode(e){
    if (e) e.preventDefault();
    console.log("toggling dark mode")
    let iconSpan = document.getElementById("darkModeToggle");

    // grab the dark mode variable from local storage
    let darkModeState = localStorage.getItem("darkMode")
    console.log(darkModeState)


    
}

// event listener for the game
document.getElementById("petBellyBtn").addEventListener("click", petBelly);
// wait until the dom is loaded before adding js elements
window.addEventListener("DOMContentLoaded", loadCats);
