"use strict";
console.log("js loaded");

let catList = [
    {
        name: "Thundercat",
        description: "He's so sweet he gave himself diabetes. Certified therapy animal. Purrs can be heard from across the room.",
        href: "",
        alt: ""
    },
    {
        name: "Penny",
        description: "Sassy. Named after the character in Dr. Horrible's Sing Along Blog.",
        href: "",
        alt: ""    
    },
    {
        name: "Baby",
        description: "A prince. The oldest of the cats and the most insistent when needing pets.",
        href: "",
        alt: ""
    },
    {
        name: "Taquito",
        description: "Found in a couch where the other thing found was a taquito.",
        href: "",
        alt: ""
    }
];

let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

function loadCats(){
    console.log("in Load Cats")
	// section to display menu
	let catDisplayMenu = document.getElementById("cat-selector-menu");
    // section to display cat's information
    let catInformation = document.getElementById("catInformation")
	
	// empty output string to add onto
	let output = "";
	
	// iterate through list of cats
	for(let cat in catList){
        // add each cat to the menu
		output += `<li class="cat-selector-list-item">${catList[cat].name}</li>`;
	}
	
	//add output to the list
	catDisplayMenu.innerHTML = output;

    //choose random cat in list to show information of
    let randomCat = catList[getRandomNumber(catList.length)];
    // set output to information from randomCat
    output = `<h3>${randomCat.name}</h3><img src=${randomCat.href} alt=${randomCat.alt}><p>${randomCat.description}</p>`;
    catInformation.innerHTML = output;
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
    let output = ""

    // check that an amount was entered
    if(petCount.value < 1){
        output += "Please enter a value"
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
    // empty the output string
    output = "";
}

document.getElementById("petBellyBtn").addEventListener("click", petBelly);
window.addEventListener("DOMContentLoaded", loadCats);
