const dices = document.getElementsByClassName('dice');
const p1Dice = document.getElementById('p1-dice');
const redsMoveToken = document.getElementById('redPlayerToken');
const bluesMoveToken = document.getElementById('bluePlayerToken');
const greensMoveToken = document.getElementById('greenPlayerToken');
const yellowsMoveToken = document.getElementById('yellowPlayerToken');
const home = document.getElementById('home');
const diceValue = document.getElementsByClassName('roll-value');
const redToken = document.querySelectorAll('.redToken');
const blueToken = document.querySelectorAll('.blueToken');
const greenToken = document.querySelectorAll('.greenToken');
const yellowToken = document.querySelectorAll('.yellowToken');
const redHome = document.getElementById('redHome');
const greenHome = document.getElementById('greenHome');
const blueHome = document.getElementById('blueHome');
const yellowHome = document.getElementById('yellowHome');
const cubePath = document.querySelectorAll('.cube-move-spot');
const redStartSpot = document.querySelectorAll('.redPath0');
const blueStartSpot = document.querySelectorAll('.bluePath0');
const greenStartSpot = document.querySelectorAll('.greenPath0');
const yellowStartSpot = document.querySelectorAll('.yellowPath0');

//audios ..
const roll = new Audio('Rolling Dice - Sound ! Notification Tone.mp3');
const move = new Audio('Untitled_Project_V1.mp3');
const won = new Audio('won.mp3');
const kill = new Audio('open-hat-snake-100639.mp3');

let playerWons = 0;
let redWon = false;
let greenWon = false;
let blueWon = false;
let yellowWon = false;

let won1st = false;
let won2nd = false;
let won3rd = false;

let playerCount;
let redPlaying;
let greenPlaying;
let yellowPlaying;
let bluePlaying;

let floatToken = 0;
let playersMove = 0;

let nCanWon;
let theEnd = false;
let homeChance = false;
  function gettingData() {
    // Retrieve the number of players from local storage
    playerCount = parseInt(localStorage.getItem('nPlaying')); // Get the number of players

    // Retrieve the playing status of each color from local storage
    redPlaying = localStorage.getItem('redPlaying') === "true";
    greenPlaying = localStorage.getItem('greenPlaying') === "true";
    yellowPlaying = localStorage.getItem('yellowPlaying') === "true";
    bluePlaying = localStorage.getItem('bluePlaying') === "true";

    // Retrieve player names from local storage
    const redPlayerName = localStorage.getItem('redPlayer');
    const greenPlayerName = localStorage.getItem('greenPlayer');
    const yellowPlayerName = localStorage.getItem('yellowPlayer');
    const bluePlayerName = localStorage.getItem('bluePlayer');

    // Display player names in the specified order
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = ''; // Clear any existing content

    // Append player names in the order: red, green, blue, yellow with unique IDs
    if (redPlaying) {
        playerNamesDiv.innerHTML += `<div id="player-red"><b>Red Player:</b> ${redPlayerName}</div>`;
        // Set the red player name in the corner box
        document.getElementById('corner-red').innerHTML = `<b>Red Player:</b> ${redPlayerName}`;
    }
    if (greenPlaying) {
        playerNamesDiv.innerHTML += `<div id="player-green"><b>Green Player:</b> ${greenPlayerName}</div>`;
    }
    if (bluePlaying) {
        playerNamesDiv.innerHTML += `<div id="player-blue"><b>Blue Player:</b> ${bluePlayerName}</div>`;
    }
    if (yellowPlaying) {
         playerNamesDiv.innerHTML += `<div id="player-yellow"><b>Yellow Player:</b> ${yellowPlayerName}</div>`;
    }

    // Calculate the number of players that can potentially win
    nCanWon= playerCount - 1;

    // Call the gameloop function to start the game logic
    gameloop();

    // Optionally, you can log the player names for debugging
    console.log("Player Names:", {
        red: redPlayerName,
        green: greenPlayerName,
        yellow: yellowPlayerName,
        blue: bluePlayerName
    });
}
gettingData();
showingTokens();//this is responsible for displaying game tokens 
//below line uses document.querySelectorAll to select all <img>  elements that are children  of any element with the class player-container 

let icons = document.querySelectorAll(`.player-container img`);

let diceOutcome;//declared but not initialized
//this following  line converts iterable object into an array and assigns it to the variable 'Ndice'
let Ndice = Array.from(dices);
[Ndice[1], Ndice[2]] = [Ndice[2], Ndice[1]];//this line swaps the element  at index 1 and index 2 of  the Ndice array
[Ndice[2], Ndice[3]] = [Ndice[3], Ndice[2]];


let tokens = [redToken, greenToken, yellowToken, blueToken];

// to start the game
/* home.addEventListener('click',()=>{ playersMove++; gameloop(); }); */

//to show token on starting game and remove notPlaying tokens 
function showingTokens() {
    if (!redPlaying) {
        redStartSpot.forEach(spot => {
            spot.innerHTML = "";
        })
    }//example if the red is not playing it iterates  over each spot in redstartSpot and set its innerHTML to an empty string
    if (!greenPlaying) {
        greenStartSpot.forEach(spot => {
            spot.innerHTML = "";
        })
    }
    if (!yellowPlaying) {
        yellowStartSpot.forEach(spot => {
            spot.innerHTML = "";
        })
    }
    if (!bluePlaying) {
        blueStartSpot.forEach(spot => {
            spot.innerHTML = "";
        })
    }
}

//to switch  between  players (js promises are used here to handle asynchronous behaviour)
function switchPlayer(playersMove) {//this parameter indicates which player's turn it is (1 red, 2 green, 3 for yellow and 4 for blue)
    return new Promise((resolve, reject) => {//promise creation
        //two arguments are used resolve or reject
        /* console.log('SWITCH-PLAYER : CALLED :',playersMove); */
        icons.forEach(e => {
            if (e.classList.contains('floating')) {
                e.classList.remove('floating');//it removes the floating from any icon that currently has it

            }

        });
        //the switchPlayer function using a switch case  to determine which player's  turn it is
        switch (playersMove) {
            case 1://If 'redPlaying' is true and 'redWon' is false,it adds the 'floating
                if (redPlaying && !redWon) {
                    redsMoveToken.classList.add('floating');
                    resolve(playersMove);
                } else {
                    reject();
                }
                break;
            case 2:
                if (greenPlaying && !greenWon) {
                    /*  console.log("green playing : ",greenPlaying); */
                    greensMoveToken.classList.add('floating');
                    resolve(playersMove);
                } else {
                    /* console.log("green playing :  rejected"); */
                    reject();
                }

                break;
            case 3:
                if (yellowPlaying && !yellowWon) {
                    /*  console.log("blue playing : ",yellowPlaying); */
                    yellowsMoveToken.classList.add('floating');
                    resolve(playersMove);
                } else {
                    /*   console.log("yellow playing :  rejected"); */
                    reject();
                }

                break;
            case 4:
                if (bluePlaying && !blueWon) {
                    /*  console.log(bluePlaying); */
                    bluesMoveToken.classList.add('floating');
                    resolve(playersMove);
                } else {
                    /* console.log("bluePlaying rejected"); */
                    reject();
                }
                break;


        }

    })


}

//gameLoop to loop infiniterly untill someone won 
function gameloop() {

    switchPlayer(playersMove)//if this promise resolves  successfully then '.then()' is executed

        .then((playersMove) => {
            return rolling(playersMove);//it is called by the logic for currentplayer's action
        })
        .catch(() => {//if switchplayer rejects then .catch() method is executed


            try {
                update();
            } catch (error) {
                if (error instanceof TypeError && error.message === "token is not iterable") {
                    //the token is not iterable


                    playersMove++;
                    /* console.log("gameloop called : ",playersMove); */
                    gameloop();

                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }

        });

}

//to add rolling class and click event listners (used to reset the state of the dice before a new roll)
function rolling(playersMove) {//playersmove represents the index of the players move or the specific die that the player wants to roll
    return new Promise((resolve) => {//returns a promise 

        Ndice.forEach(dice => {//this function iterates over each dice in the Ndice collection
            if (dice.classList.contains('rolling')) {
                dice.classList.remove('rolling');
            }

        });


        // to roll the dice on click 
        Ndice[playersMove - 1].addEventListener('click', clickRoll);

        resolve();

    })



}

//to click and roll the dice and show dice output from 1 to 6
function clickRoll() {
    roll.play();//sound effect is added
    //adding and removing rolling and click event
    Ndice[playersMove - 1].classList.add('rolling');
    Ndice[playersMove - 1].removeEventListener('click', clickRoll);
    //removing dice value
    for (let i = 0; i < dices.length; i++)//this for loops is used to iterate through all the dice elements
    {
        for (let j = 1; j < 7; j++) {
            if (dices[i].querySelector(`#D${j}`).classList.contains('visible-dice')) {
                dices[i].querySelector(`#D${j}`).classList.remove('visible-dice')
            }
        }
    }
    switch (playersMove) {//this switch statments is used to  handle the players token based one their move
        case 1:
            redsMoveToken.classList.remove('floating');
            break;
        case 2:
            greensMoveToken.classList.remove('floating');
            break;
        case 3:
            yellowsMoveToken.classList.remove('floating');
            break;
        case 4:
            bluesMoveToken.classList.remove('floating');
            break;
    }



    setTimeout(() => {//this is used to  introduce a delay before determining the outcome of the roll and updating the  visual representation
        const randomInt = Math.floor(Math.random() * (6 - 1 + 1)) + 1;//gives a random no for 0 to 6 then adding shifts it becomes 1 to 6
        diceOutcome = randomInt;//it will store the result of die roll 
        /* console.log("RANDOM : DICE-VALUE :",randomInt); */
        switch (randomInt) {
            case 1:
                Ndice[playersMove - 1].querySelector('#D1').classList.add('visible-dice');//-1 is added to avoid zero based indexing
                break;
            case 2:
                Ndice[playersMove - 1].querySelector('#D2').classList.add('visible-dice');
                break;
            case 3:
                Ndice[playersMove - 1].querySelector('#D3').classList.add('visible-dice');
                break;
            case 4:
                Ndice[playersMove - 1].querySelector('#D4').classList.add('visible-dice');
                break;
            case 5:
                Ndice[playersMove - 1].querySelector('#D5').classList.add('visible-dice');
                break;
            case 6:
                Ndice[playersMove - 1].querySelector('#D6').classList.add('visible-dice');
                break;
        }

        Ndice[playersMove - 1].classList.remove('rolling');//removing  the rolling function

        tokenFloat(playersMove);


    }, 500);


}

//to add floating class to tokens
let token;
function tokenFloat(playersMove) { //this line takes one parameter `playersMove` which indicates which player's turn it is(1-4)
    /* return new Promise((resolve) => { */
    /* console.log('TOKEN : FLOAT : CALLED'); */
    token = tokens[playersMove - 1];//This line assigns tokens asssigned with the current player
    let skipMove = true;//This variable is used to determine if the player's move should be skipped based on certain conditions
    token.forEach(t => {


        if (t.parentElement.classList.contains("disks") || t.parentElement.classList.contains("tokenHome")) {//this checks if the token's parent element  has the class `disks` or `tokenHome`.This indicates whether the token in a position where it can be moved
            if (t.parentElement.classList.contains("disks")) {//this checks if the token is specifically in the `disks` area
                if (diceOutcome == 6) {
                    skipMove = false;//6 aane par ghar se niklega
                    t.classList.add('floating');//animation add karega getiyan nikalne par
                    t.addEventListener('click', openToken);//iske baad getiyan chalengi

                }
            }
        } else {
            //to check and skip move if dice value is greater then the remainig spots
            switch (playersMove) {//for determining the current position
                case 1:
                    var matchingClass = [...t.parentNode.classList].find(className => className.startsWith("redPath"));
                    var cureentSpot = parseInt(matchingClass.substring(7));
                    break;
                case 2:
                    var matchingClass = [...t.parentNode.classList].find(className => className.startsWith("greenPath"));
                    var cureentSpot = parseInt(matchingClass.substring(9));
                    break;
                case 3:
                    var matchingClass = [...t.parentNode.classList].find(className => className.startsWith("yellowPath"));
                    var cureentSpot = parseInt(matchingClass.substring(10));
                    break;
                case 4:
                    var matchingClass = [...t.parentNode.classList].find(className => className.startsWith("bluePath"));
                    var cureentSpot = parseInt(matchingClass.substring(8));
                    break;
            }

            let canMove = cureentSpot + diceOutcome + 1;
            //above line calculates the potential new position of the token after rolling dice 
            if (canMove <= 58) {//This conditional statement checks if the calculated position (canMove) is less than or equal to 58
                skipMove = false;
                t.classList.add('floating');//animation added here
                t.addEventListener('click', moveToken);//this will help u to move token on clicking
            }
         }
    });
    canAutoPlay(token);
    //to skip move if no token is able to move
    if (skipMove) {
        update();
    }
    /* resolve(); */

    /* }) */
}
//to check if the token can automatically move
function canAutoPlay(token) {
    token.forEach(t => {
        if (t.classList.contains('floating')) {//checks whether it is in a ready to move state
            floatToken++;
        }
    })
    console.log("float token value ", floatToken);
    if (floatToken == 1) {//checks if only one token is ready to move(in the floating state)
        autoPlay(token);
    }
    floatToken = 0;
}

//automatically moving the token 
function autoPlay(token) {
    token.forEach(t => {
        if (t.classList.contains('floating')) {
            t.click();
        }
    })
}

//to get extra chances if get 6
function extraChance() {
    /*  console.log("dice value : ",diceOutcome); */
    for (const t of token) {
        if (diceOutcome === 6 && t.classList.contains('floating')) {
            /*   console.log("Extra chance true ", t); */
            return true;
        }
    }
    /* console.log("Extra chance false ", token); */
    return false;
}
//to open new token 
function openToken() {

    let path;
    let Token = document.getElementById(this.id);

    tokens[playersMove - 1].forEach(t => {
        t.removeEventListener('click', openToken);
    });
    //for more than one token on spot
    cubePath.forEach(path => {
        let images = path.querySelectorAll('img');
        if (images.length > 4) {
            path.classList.add("makeGrid2");
        } else if (images.length > 1) {
            path.classList.add("makeGrid");
        }
    }); 

// statement that handles the movement of a game token based on the player's move
    switch (playersMove) {
        case 1:
            path = document.querySelector(`.redPath1`);
            path.appendChild(Token);
            break;
        case 2:
            path = document.querySelector(`.greenPath1`);
            path.appendChild(Token);
            break;
        case 3:
            path = document.querySelector(`.yellowPath1`);
            path.appendChild(Token);
            break;
        case 4:
            path = document.querySelector(`.bluePath1`);
            path.appendChild(Token);
            break;
    }
    move.play();
    update();//which presumably updates the game state or UI to reflect the new position of the token
}
//to move token w.r.t dice value
function moveToken() {
    let tokenId = this.id;
    let i;
    switch (playersMove) {
        case 1:
            var matchingClass = [...this.parentNode.classList].find(className => className.startsWith("redPath"));
            i = parseInt(matchingClass.substring(7));
            break;
        case 2:
            var matchingClass = [...this.parentNode.classList].find(className => className.startsWith("greenPath"));
            i = parseInt(matchingClass.substring(9));
            break;
        case 3:
            var matchingClass = [...this.parentNode.classList].find(className => className.startsWith("yellowPath"));
            i = parseInt(matchingClass.substring(10));
            break;
        case 4:
            var matchingClass = [...this.parentNode.classList].find(className => className.startsWith("bluePath"));
            i = parseInt(matchingClass.substring(8));
            break;
    }

    //to get the next path and move the token to that path 
    function movingToken(diceOutcome) {

        i++;
        diceOutcome--;

        let path;
        switch (playersMove) {
            case 1:
                path = document.querySelector(`.redPath${i}`);
                break;
            case 2:
                path = document.querySelector(`.greenPath${i}`);
                break;
            case 3:
                path = document.querySelector(`.yellowPath${i}`);
                break;
            case 4:
                path = document.querySelector(`.bluePath${i}`);
                break;
        }

        //selecting token and moving it to next path 
        let Token = document.getElementById(tokenId);
        //to remove grid class for multiple tokens 
        cubePath.forEach(path => {
            let images = path.querySelectorAll('img');
            if (images.length > 4) {
                path.classList.remove("makeGrid2");
            } else if (images.length > 1) {
                path.classList.remove("makeGrid");
            }
        });
        console.log('sound activatd', move);
        move.play();
        path.appendChild(Token);

        //to add grid class for multiple tokens 
        cubePath.forEach(path => {
            let images = path.querySelectorAll('img');
            if (images.length > 4) {
                path.classList.add("makeGrid2");
            } else if (images.length > 1) {
                path.classList.add("makeGrid");
            }
        });

        //to exit the recursive function by calling next function update to update the player move .
        if (diceOutcome == 0) {
            //to check if the dice is homed if so then grant him extra chance 
            if (path.classList.contains("tokenHome") && path.querySelectorAll('img').length < 4) {
                homeChance = true;
                update();
            } else {
                console.log(path.classList);
                // If no, then check to kill 
                killToken(Token, path);
            }
        } else {
            setTimeout(() => {

                movingToken(diceOutcome);
            }, 300);
        }


    }
    //to recursively call till dice value is not zero 
    movingToken(diceOutcome);

}
let killed = false;
// to kill the tokens 
function killToken(Token, path) {

    if (!(path.classList.contains('star-place') || path.classList.contains("tokenStart"))) {

        var tokenName = Token.name;
        var tokensInPath = path.querySelectorAll('img');

        //to traverse through all the tokens on specific spot
        tokensInPath.forEach(t => {
            var otherTokenName = t.name;
            var homeSpot;
            // to kill unlike tokens only not same token 
            if (tokenName != otherTokenName) {
                /*  console.log("killing : ",otherTokenName); */
                killed = true;
                // getting home spot for the token which is going to killed
                switch (otherTokenName) {
                    case "redToken":
                        homeSpot = document.getElementsByClassName("redPath0");

                        /*  console.log("iside case : ",otherTokenName); */
                        break;
                    case "greenToken":
                        homeSpot = document.getElementsByClassName("greenPath0");
                        break;
                    case "yellowToken":
                        homeSpot = document.getElementsByClassName("yellowPath0");
                        break;
                    case "blueToken":
                        homeSpot = document.getElementsByClassName("bluePath0");
                        break;

                }
                //converting to arrya to traverse easily 
                var homeSpotCollection = [...homeSpot];

                //to select all the other tokens only inside the spot 
                var elementsToCheck = path.querySelectorAll(`[name ="${otherTokenName}"]`);
                if (elementsToCheck.length > 0) {
                    killedToken = elementsToCheck[0];
                }
                //checking and appending the otherToken in the empty home 
                homeSpotCollection.forEach(s => {
                    var hasToken = s.querySelector('img') !== null;
                    if (!hasToken) {
                        kill.play();
                        s.appendChild(killedToken);
                    }
                });
            }
            else {



            }
        });
    }


    update();


}
//to check if a player won or not 
function isWon() {

    if (redHome.querySelectorAll('img').length == 4) {
        if (!redWon) {
            redWon = true;
            playerWons++;
            return ".p1";
        }
    }

    if (greenHome.querySelectorAll('img').length == 4) {
        if (!greenWon) {
            greenWon = true;
            playerWons++;
            return ".p2";
        }
    }
    if (blueHome.querySelectorAll('img').length == 4) {
        if (!blueWon) {
            blueWon = true;
            playerWons++;
            return ".p3";
        }

    }

    if (yellowHome.querySelectorAll('img').length == 4) {
        if (!yellowWon) {
            yellowWon = true;
            playerWons++;
            return ".p4";
        }
    }

}
// to show won crown with respect to position 
function showWon(wonPlayerClass) {

    var showSpot = document.querySelector(wonPlayerClass);
    // check player won at which position 
    switch (playerWons) {
        case 1:
            if (!won1st) {
                showSpot.style.display = "flex";
                showSpot.innerHTML = '<img src="Won1st.png" alt="1st won" width="100%" >';
                won.play();
                won1st = true;
            }


            break;
        case 2:
            if (!won2nd) {
                showSpot.style.display = "flex";
                showSpot.innerHTML = '<img src="Won2nd.png" alt="1st won" width="100%" >';
                won2nd = true;
                won.play();
            }
            break;
        case 3:
            if (!won3rd) {
                showSpot.style.display = "flex";
                showSpot.innerHTML = '<img src="Won3rd.png" alt="1st won" width="100%" >';
                won3rd = true;
                won.play();
            }
            break;
    }

}
//to end the game and stamp looser to losed player
function gameEnds() {
    console.log("game ends");
    theEnd = true;

    if (redPlaying && !redWon) {

        let looser = document.querySelector('.p1');
        looser.style.display = "flex";
        looser.innerHTML = '<img src="looser.png" alt="1st won" width="100%" >';
    }
    if (greenPlaying && !greenWon) {
        let looser = document.querySelector('.p2');
        looser.style.display = "flex";
        looser.innerHTML = '<img src="looser.png" alt="1st won" width="100%" >';
    }
    if (yellowPlaying && !yellowWon) {
        let looser = document.querySelector('.p4');
        looser.style.display = "flex";
        looser.innerHTML = '<img src="looser.png" alt="1st won" width="100%" >';
    }
    if (bluePlaying && !blueWon) {
        let looser = document.querySelector('.p3');
        looser.style.display = "flex";
        looser.innerHTML = '<img src="looser.png" alt="1st won" width="100%" >';
    }

}

//to update player move 
function update() {
    if (playerWons == nCanWon) {
        gameEnds();
    }
    if (extraChance() || killed || homeChance) {
        if (playerWons == nCanWon) {
            gameEnds();
        }
        killed = false;
        homeChance = false;
        playersMove = playersMove;
    } else {

        //increamenting and reseting the playersMove to loop between 4 players 
        if (playersMove === 4) {
            playersMove = 1;

        } else {
            playersMove++;

        }
    }

    //getting class of its start spot and checking if won
    let wonPlayerClass = isWon();
    // if a player won then to show the crown 
    if (redWon || blueWon || greenWon || yellowWon) {
        showWon(wonPlayerClass);
    }

    //to make grid to append more then one token at a place 
    cubePath.forEach(path => {
        let images = path.querySelectorAll('img');
        if (images.length > 4) {
            path.classList.add("makeGrid2");
        } else if (images.length > 1) {
            path.classList.add("makeGrid");
        }
        else {
            path.classList.remove("makeGrid");
            path.classList.remove("makeGrid2");
        }
    });



    /*  console.log("removing token "); */
    // removing floating class and its click event
    token.forEach(t => {
        t.classList.remove('floating');
        t.removeEventListener('click', moveToken);
        t.removeEventListener('click', openToken);

    });
    if (!theEnd) {
        gameloop();
    }
    // game loop to recursevly call another player '

}
