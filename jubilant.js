//jubilant.js, 2018

var replacements = document.getElementById("replacements")
var baseText = document.getElementById("base")
var encryptedText = document.getElementById("encrypted")
var presetMenu = document.getElementById("preset")
var replacementsTable = {}

var alphabet = "abcdefghijklmnopqrstuvwxyz"

var presets = {
    empty: "",
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    atbash: "zyxwvutsrqponmlkjihgfedcba",
    rot13: "nopqrstuvwxyzabcdefghijklm",
    original: "opqtivkxeygrnmabclzdwfuhjs",
    revised: "epqtavjlygxhnmubcwzdofrkis"
}

var swapButton = document.getElementById("swap")

function usePreset() {
    replacements.value = presets[presetMenu.value]
    updateReplacements()
}

function updateReplacements() {
    var replacements_ = replacements.value
    if (replacements_.length == 26) {
        var fitsCriteria = true
        for (var i = 0; i < 26; i++) {
            replacementsTable[alphabet.charAt(i)] = replacements_.charAt(i)
            if (
                alphabet.charAt(i) == replacements_.charAt(i) ||
                alphabet.indexOf(replacements_.charAt(i)) == -1 ||
                replacements_.indexOf(replacements_.charAt(i)) != i) {
                fitsCriteria = false
            }
        }
        replacements.style["background-color"] = fitsCriteria ? "#cbf2b7" : "#f2deb7"
    } else {
        replacements.style["background-color"] = "white"
    }
    //alert(replacements_.length)
    updateText()
}

function updateText() {
    baseText_ = baseText.value
    if (replacementsTable != {}) {
        encryptedText.innerHTML = ""
        for (var i = 0; i < baseText_.length; i++) {
            var modified = baseText_.charAt(i)
            var added = modified
            if (alphabet.indexOf(modified) != -1) {
                added = replacementsTable[baseText_.charAt(i)]
            } else if (alphabet.indexOf(modified.toLowerCase()) != -1) {
                added = replacementsTable[baseText_.charAt(i).toLowerCase()].toUpperCase()
            }
            encryptedText.innerHTML += added
        }
    }
}

function swapText() {
    newTable = {}
    replacements.value = ""
    for (var i = 0; i < 26; i++) {
        newTable[replacementsTable[alphabet[i]]] = alphabet[i]
    }
    for (var i = 0; i < 26; i++) {
        replacements.value += newTable[alphabet[i]]
    }
    replacementsTable = newTable

    var oldOriginal = baseText.value
    baseText.value = encryptedText.innerHTML
    encryptedText.innerHTML = oldOriginal
}

updateReplacements()
replacements.addEventListener("input", updateReplacements)
baseText.addEventListener("input", updateText)
presetMenu.addEventListener("change", usePreset)
swapButton.addEventListener("click", swapText)
