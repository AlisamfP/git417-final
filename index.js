"use strict";
console.log("js loaded");

let catList = [
    {
        name: "Thundercat",
        description: "He's so sweet he gave himself diabetes. Certified therapy animal. Purrs can be heard from across the room.",
        href: "images/thunder.jpg",
        alt: ""
    },
    {
        name: "Penny",
        description: "Sassy. Named after the character in Dr. Horrible's Sing Along Blog.",
        href: "images/penny.jpg",
        alt: ""    
    },
    {
        name: "Baby",
        description: "A prince. The oldest of the cats and the most insistent when needing pets.",
        href: "images/baby.jpg",
        alt: ""
    },
    {
        name: "Taquito",
        description: "Found in a couch where the other thing found was a taquito.",
        href: "images/taquito.jpg",
        alt: ""
    }
];

let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

function loadCats(){
    console.log("in Load Cats")
	// section to display menu
	let catDisplayMenu = document.getElementById("catSelectorMenu");
    // section to display cat's information
    let catInformation = document.getElementById("catInformation")
	
    //choose random cat in list to show information of
    let randomCat = catList[getRandomNumber(catList.length)];
    // set output to information from randomCat
    setCurrentCatInfo(randomCat);
    
	// iterate through array of cats
	for(let cat in catList){
        // create new li element
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
}
	

function getRandomNumber(maxValue){
    return Math.floor(Math.random() * maxValue);
}

function petBelly(e){
    e.preventDefault();
    // get the amount entered by the user
    let petCount = document.getElementById("scritchCount");

    // get gameResults element and clear it out
    let gameResults = document.getElementById("gameResults");
    gameResults.innerHTML = "";

    // set output to empty string
    let output = "";

    // check that an amount was entered
    if(petCount.value < 1){
        output += "Please enter a value";
        gameResults.innerHTML = output;
    }
    else{   
        // generate a random number from one to ten. inc by 1 to offset from 0.
        let randomNum = getRandomNumber(10) + 1;
        
        // check to see if the random number and entered value are the same
        if(parseInt(petCount.value) === parseInt(randomNum)){
            output += "You've won!";
        }
        else{
            output += `Ooops. The cat wanted ${randomNum} pets. TRY AGAIN!`;
        }
        gameResults.innerHTML = output;
    }
};

function setCurrentCatInfo(cat){
    console.log("setting current cat info" + cat)
    // section to display cat's information
    let catInformation = document.getElementById("catInformation")
    // empty output string to build onto
    let output = "";
    // clear out previous information
    catInformation.innerHTML = "";

    output += `<h3 id="catName">${cat.name}</h3><img src=${cat.href} alt=${cat.alt}><p id="catDescription">${cat.description}</p>`;
    catInformation.innerHTML = output;
}

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

    setCurrentCatInfo(catList.find(cat => cat.name === selectedCat));

}

document.getElementById("petBellyBtn").addEventListener("click", petBelly);
window.addEventListener("DOMContentLoaded", loadCats);
