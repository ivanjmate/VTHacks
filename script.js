const targetWords = ["america", "google", "bread"]

const targetWord = ""
const guessGrid = document.querySelector("[data-guess-grid")
const WORD_LENGTH = 7
const targetWord = targetWords[0]

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

    if (e.target.matches("[data-delete"))
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
        return
    }
    
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