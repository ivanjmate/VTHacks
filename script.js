const pictureLinks = [
    "images/JoeBiden_hidden.png",
    "images/ChrisHibble_hidden.png",
    "images/Dominos_hidden.png",
    "images/astronaut_hidden.png",
    "images/Avocado_hidden.png",
    "images/CIA_hidden.png",
    "images/crab_hidden.png",
    "images/RyanReynolds_hidden.png"
]
const targetWords = ["america",
                     "google",
                     "bread",
                     "earth",
                     "rotted",
                     "first",
                     "eaten",
                     "hair"
]

const dictionary_array = 
[[], [], [], [], 
[
    "abuse",
    "adult",
    "agent",
    "anger",
    "apple",
    "award",
    "basis",
    "beach",
    "birth",
    "block",
    "blood",
    "board",
    "brain",
    "bread",
    "break",
    "brown",
    "buyer",
    "cause",
    "chain",
    "chair",
    "chest",
    "chief",
    "child",
    "bread"
], 
[
"better",
"beyond",
"bishop",
"border",
"bottle",
"bottom",
"bought",
"branch",
"breath",
"bridge",
"bright",
"broken",
"budget",
"burden",
"bureau",
"button",
"camera",
"cancer",
"cannot",
"carbon",
"career",
"castle",
"casual",
"caught",
"center",
"centre",
"chance",
"change",
"charge",
"choice",
"choose",
"chosen",
"google"
], 
["ability",
"absence",
"academy",
"account",
"accused",
"achieve",
"acquire",
"address",
"advance",
"adverse",
"advised",
"adviser",
"against",
"airline",
"airport",
"alcohol",
"alleged",
"already",
"analyst",
"ancient",
"another",
"america"]
]

const rand = Math.floor(Math.random() * pictureLinks.length)
console.log("" + rand)
const img = document.createElement("img")
img.src = pictureLinks[rand]
img.classList.add("tweet-pic")
var block = document.getElementById("pic")
block.appendChild(img)

window.addEventListener("load", go);

const targetWord = targetWords[rand]
const WORD_LENGTH = targetWords[rand].length
const dictionary = dictionary_array[WORD_LENGTH - 1]

const guessGrid = document.querySelector("[data-guess-grid")
const keyboard = document.querySelector("[data-keyboard")
const alertContainer = document.querySelector("[data-alert-container")
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500

startInteraction();

function startInteraction() {
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction()
{
    document.removeEventListener("click", handleMouseClick)
    document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
    if (e.target.matches("[data-key]")) 
    {
        pressKey(e.target.dataset.key)
        return
    }

    if (e.target.matches("[data-enter]"))
    {
        submitGuess()
        return
    }

    if (e.target.matches("[data-delete]"))
    {
        deleteKey()
        return
    }
}

function handleKeyPress(e)
{
    if (e.key === "Enter")
    {
        submitGuess()
        return
    }

    if (e.key === "Backspace" || e.key === "Delete")
    {
        deleteKey()
        return
    }

    if (e.key.match(/^[a-z]$/))
    {
        pressKey(e.key)
        return
    }
}

function deleteKey()
{
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null)
    return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
}

function submitGuess()
{
    const activeTiles = [...getActiveTiles()]
    if (activeTiles.length !== WORD_LENGTH)
    {
        showAlert("Not enough letters")
        shakeTiles(activeTiles)
        return
    }
    
    const guess = activeTiles.reduce((word, tile) => {
        return word + tile.dataset.letter
    }, "")

    if (!dictionary.includes(guess)){
        showAlert("Not in word list")
        shakeTiles(activeTiles)
        return
    }

    stopInteraction()

    activeTiles.forEach((...params) => flipTiles(...params, guess))
}

function flipTiles(tile, index, array, guess){
    const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * FLIP_ANIMATION_DURATION) / 2)

    tile.addEventListener("transitionend", () => {
        tile.classList.remove("flip")
        if (targetWord[index] === letter) {
          tile.dataset.state = "correct"
          key.classList.add("correct")
        } else if (targetWord.includes(letter)) {
          tile.dataset.state = "wrong-location"
          key.classList.add("wrong-location")
        } else {
          tile.dataset.state = "wrong"
          key.classList.add("wrong")
        }

        if (index === array.length -1){
            tile.addEventListener("transitionend", () =>{
                startInteraction()
                checkWinLose(guess, array)
            }, {once: true})
        }
    }, {once: true})
}

function showAlert(message, duration = 1000){
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null)return
    
    setTimeout(() =>{
        alert.classList.add("hide")
        alert.addEventListener("transitionend", () =>{
            alert.remove() 
        })
    }, duration)
}

function shakeTiles(tiles){
    tiles.forEach(tile => {
        tile.classList.add("shake")
        tile.addEventListener("animation", () => {
            tile.classList.remove("shake")
        }, {once: true})
    })
}

function pressKey(key)
{
    const activeTiles = getActiveTiles()
    if (activeTiles.length >= WORD_LENGTH) return
    const nextTile = guessGrid.querySelector(":not([data-letter])")
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
}

function getActiveTiles()
{
    return guessGrid.querySelectorAll('[data-state="active"]')
}

function checkWinLose(guess, tiles){
    if (guess == targetWord) {
        showAlert("You Win", 5000)
        danceTiles(tiles)
        stopInteraction
        return        
    }
    else
    {
        stopInteraction()        
        resetGrid()
        return    
    }
}

function resetGrid()
{
    const tiles = guessGrid.querySelectorAll('[class="tile"]')
    tiles.forEach((tile) => {
        tile.textContent = ""
        delete tile.dataset.state
        delete tile.dataset.letter
    });
    startInteraction()
}

function danceTiles(tiles){
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("dance")
            tile.addEventListener("animation", () => {
                tile.classList.remove("dance")
            }, {once: true})
        }, index * DANCE_ANIMATION_DURATION / 5)
    })
}

function removeBox(input)
{
    var el = document.getElementById('tile'+input)
    el.remove()
}

function go()
{
    const tiles = guessGrid.querySelectorAll('[class="tile"]')
    console.log(tiles.length)
    const boxesToRemove = tiles.length - WORD_LENGTH
    console.log(boxesToRemove)
    var count = 0
    while (count != boxesToRemove)
    {
        removeBox(count)
        count++
    }
    let myElement = document.querySelector("#guess-grid");
    document.getElementById("myDIV").style.gridTemplateColumns = "repeat(" + WORD_LENGTH + ", 4em)"
}