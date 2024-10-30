import {caesarCipherContent, showWarning} from './main.js'

let keyInput = caesarCipherContent.getElementsByTagName("input")[0];
let keyInvalidWarning = document.getElementById("caesar-cipher-key-invalid-warning");
let keyEmptyWarning = document.getElementById("caesar-cipher-key-empty-warning");
let encryptBtn = caesarCipherContent.getElementsByTagName("button")[0];
let decryptBtn = caesarCipherContent.getElementsByTagName("button")[1];
let bruteForceDecryptBtn = caesarCipherContent.getElementsByTagName("button")[2];
let sourceTextTextarea = caesarCipherContent.getElementsByTagName("textarea")[0];
let encryptedTextTextarea = caesarCipherContent.getElementsByTagName("textarea")[1];
let sourceTextEmptyWarning = document.getElementById("caesar-cipher-source-text-empty-warning");
let encryptedTextEmptyWarning = document.getElementById("caesar-cipher-encrypted-text-empty-warning");

const keyRegex = /^(?:[1-9]|1[0-9]|2[0-9]|3[0-2])$/;
const russianUpperCaseLetterRegex = /^[А-Я]|Ё$/;
const russianLowerCaseLetterRegex = /^[а-я]|ё$/;
const russianUpperCaseAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const russianLowerCaseAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function getEncryptedText(key, sourceText) {
    let sourceTextSymbol;
    let index;
    let encryptedText = "";

    for (let i = 0; i < sourceText.length; i++) {
        sourceTextSymbol = sourceText.charAt(i);
        if (russianUpperCaseLetterRegex.test(sourceTextSymbol)) {
            index = (russianUpperCaseAlphabet.indexOf(sourceTextSymbol) + key) % 33;
            encryptedText += russianUpperCaseAlphabet.charAt(index);
        } else if (russianLowerCaseLetterRegex.test(sourceTextSymbol)) {
            index = (russianLowerCaseAlphabet.indexOf(sourceTextSymbol) + key) % 33;
            encryptedText += russianLowerCaseAlphabet.charAt(index);
        } else {
            encryptedText += sourceTextSymbol;
        }
    }

    return encryptedText;
}

function getSourceText(key, encryptedText) {
    let encryptedTextSymbol;
    let index;
    let sourceText = "";

    for (let i = 0; i < encryptedText.length; i++) {
        encryptedTextSymbol = encryptedText.charAt(i);
        if (russianUpperCaseLetterRegex.test(encryptedTextSymbol)) {
            index = (russianUpperCaseAlphabet.indexOf(encryptedTextSymbol) - key);
            if (index < 0) {
                index = 33 + index;
            }
            sourceText += russianUpperCaseAlphabet.charAt(index);
        } else if (russianLowerCaseLetterRegex.test(encryptedTextSymbol)) {
            index = (russianLowerCaseAlphabet.indexOf(encryptedTextSymbol) - key);
            if (index < 0) {
                index = 33 + index;
            }
            sourceText += russianLowerCaseAlphabet.charAt(index);
        } else {
            sourceText += encryptedTextSymbol;
        }
    }

    return sourceText;
}

encryptBtn.addEventListener("click", () => {

    let key = keyInput.value;
    if (key.trim() === "") {
        showWarning(keyEmptyWarning);
        return;
    }
    if (!keyRegex.test(key)) {
        showWarning(keyInvalidWarning);
        return;
    }

    let sourceText = sourceTextTextarea.value;
    if (sourceText.trim() === "") {
        showWarning(sourceTextEmptyWarning);
        return;
    }

    encryptedTextTextarea.value = getEncryptedText(Number(key), sourceText);
});

decryptBtn.addEventListener("click", () => {

    let key = keyInput.value;
    if (key.trim() === "") {
        showWarning(keyEmptyWarning);
        return;
    }
    if (!keyRegex.test(key)) {
        showWarning(keyInvalidWarning);
        return;
    }

    let encryptedText = encryptedTextTextarea.value;
    if (encryptedText.trim() === "") {
        showWarning(encryptedTextEmptyWarning);
        return;
    }

    sourceTextTextarea.value = getSourceText(Number(key), encryptedText);
});

bruteForceDecryptBtn.addEventListener("click", () => {

    let encryptedText = encryptedTextTextarea.value;
    if (encryptedText.trim() === "") {
        showWarning(encryptedTextEmptyWarning);
        return;
    }

    sourceTextTextarea.value = "";
    for (let key = 1; key < 33; key++) {
        sourceTextTextarea.value += `Ключ ${key}:\n` + getSourceText(key, encryptedText);
        if (key < 32) {
            sourceTextTextarea.value += "\n\n";
        }
    }
});
