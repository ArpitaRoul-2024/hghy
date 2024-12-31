 // DOM elements 
const redPlayer = document.querySelector(".redPlayer");
const greenPlayer = document.querySelector(".greenPlayer");
const yellowPlayer = document.querySelector(".yellowPlayer");
const bluePlayer = document.querySelector(".bluePlayer");
const play = document.querySelector("#play");
const menu = document.querySelector(".startMenu");
 

// Audios ..
const click = new Audio('mixkit-classic-click-1117.wav');
// Others
let redPlaying = false;
let greenPlaying = false;
let yellowPlaying = false;
let bluePlaying = false;
let nPlaying = 0;

// Selecting click events
redPlayer.addEventListener('click', selected);
greenPlayer.addEventListener('click',selected);
yellowPlayer.addEventListener('click',selected);
bluePlayer.addEventListener('click', selected);

document.addEventListener("DOMContentLoaded", function () {
    const players = document.querySelectorAll('.players');
    const playerNameInput = document.getElementById('playerNameInput');
    const playerNameField = document.getElementById('playerName');
    const saveNameButton = document.getElementById('saveName');
    const playerDetails = document.getElementById('playerDetails');
    let selectedPlayer = null;

    // Add click event to each player
    players.forEach(player => {
        player.addEventListener('click', function () {
            selectedPlayer = this.id; // Get the ID of the selected player
            playerNameField.value = ''; // Clear input field
            playerNameInput.style.display = 'block'; // Show input field
            playerNameField.placeholder = `Enter name for ${selectedPlayer}`;
        });
    });

// Handle Save button click
    saveNameButton.addEventListener('click', function () {
        const playerName = playerNameField.value.trim();
        
        if (playerName) {
            // Display the selected player's name
            const playerNameDiv = document.createElement('div');
            playerNameDiv.innerHTML = `<b>${selectedPlayer.toUpperCase()}:</b> ${playerName}`;
            playerDetails.appendChild(playerNameDiv);

            // Save player name in local storage
            localStorage.setItem(selectedPlayer, playerName);

            // Hide the input field after saving
            playerNameInput.style.display = 'none';
        } else {
            alert('Please enter a valid name!');
        }
    });
});

// To start playing game 
play.addEventListener('click', startGame);

// To check if number of players is more than 2 
function canPlay() {
    return nPlaying >= 2;
}

// Toggle if already selected then deselected and vice versa
function selected() {
    click.play();
    let playerId = this.id;
    console.log(playerId);
    let player = document.querySelector(`#${playerId}`);
    if (player.classList.contains("selected")) {
        nPlaying--;
        switch (playerId) {
            case "redPlayer":
                redPlaying = false;
                break;
            case "bluePlayer":
                bluePlaying = false;
                break;
            case "greenPlayer":
                greenPlaying = false;
                break;
            case "yellowPlayer":
                yellowPlaying = false;
                break;
        }
        player.classList.remove("selected");
        console.log("player deselected", player);
    } else {
        nPlaying++;
        switch (playerId) {
            case "redPlayer":
                redPlaying = true;
                break;
            case "bluePlayer":
                bluePlaying = true;
                break;
            case "greenPlayer":
                greenPlaying = true;
                break;
            case "yellowPlayer":
                yellowPlaying = true;
                break;
        }
        player.classList.add("selected");
        console.log("player selected", player);
    }
    console.log("n playing ", nPlaying);
}

// Start the game
function startGame() {
    if (canPlay()) {
        click.play();
        menu.style.animation = "closing 0.5s linear ";
        setTimeout(() => {
            console.log("playing game");
            // Store game settings in local storage
            localStorage.setItem('nPlaying', nPlaying);
            localStorage.setItem('redPlaying', redPlaying);
            localStorage.setItem('greenPlaying', greenPlaying);
            localStorage.setItem('yellowPlaying', yellowPlaying);
            localStorage.setItem('blue Playing', bluePlaying);
            // Redirect to the game board
            window.location.href = 'ludo.html';
        }, 500);
    } else {
        console.log("select more than 1 player");
    }
}