import {rsaAlgorithmContent, showWarning, getRandomNumber} from './main.js'

let generateKeysBtn = rsaAlgorithmContent.getElementsByTagName("button")[0];
let encryptBtn = rsaAlgorithmContent.getElementsByTagName("button")[1];
let decryptBtn = rsaAlgorithmContent.getElementsByTagName("button")[2];
let publicKeyInput = rsaAlgorithmContent.getElementsByTagName("input")[0];
let secretKeyInput = rsaAlgorithmContent.getElementsByTagName("input")[1];
let sourceTextTextarea = rsaAlgorithmContent.getElementsByTagName("textarea")[0];
let encryptedTextTextarea = rsaAlgorithmContent.getElementsByTagName("textarea")[1];
let keysEmptyWarning = document.getElementById("rsa-keys-empty-warning");
let sourceTextEmptyWarning = document.getElementById("rsa-source-text-empty-warning");
let encryptedTextEmptyWarning = document.getElementById("rsa-encrypted-text-empty-warning");

const p = 151, q = 179;
const n = p * q;
const phi = (p - 1) * (q - 1);
let e, d;

// возвращает наибольший общий делитель чисел a и b
function gcd(a, b) {
    if (a < b) {
        [b, a] = [a, b];
    }
    while (b !== 0) {
        [b, a] = [a % b, b];
    }
    return a;
}

// возвращает коэффициенты x и y в расширенном алгоритме евклида
function gcdExtended(a, b) {
    if (b === 0) {
        return [1, 0];
    }
    let [x, y] = gcdExtended(b, a % b);
    return [y, x - y * Math.floor(a / b)]
}

function moduloExponentiation(base, exponent, modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);

    if (modulus === BigInt(1)) return BigInt(0);

    let result = BigInt(1);
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = exponent / BigInt(2);
    }
    return Number(result);
}

function generatePublicKey(n, phi) {
    while (1) {
        e = getRandomNumber(1, n - 1);
        if (gcd(e, phi) === 1) {
            break;
        }
    }
}

function generateSecretKey(e, phi) {
    let x = gcdExtended(e, phi)[0];
    d = x < 0 ? x + phi : x;
}

function getEncryptedText(sourceText) {
    let t;
    let encryptedText = "";

    for (let i = 0; i < sourceText.length; i++) {
        t = sourceText.charCodeAt(i);
        encryptedText += moduloExponentiation(t, e, n);
        if (i < sourceText.length - 1) {
            encryptedText += " ";
        }
    }
    return encryptedText;
}

function getSourceText(encryptedText) {
    let t, c;
    let sourceText = "";

    encryptedText.split(" ").forEach(encryptedTextSymbol => {
        c = Number(encryptedTextSymbol);
        t = moduloExponentiation(c, d, n);
        sourceText += String.fromCharCode(t);
    });

    return sourceText;
}

generateKeysBtn.addEventListener("click", () => {
    generatePublicKey(n, phi);
    generateSecretKey(e, phi);
    publicKeyInput.value = `{${e}, ${n}}`;
    secretKeyInput.value = `{${d}, ${n}}`;
});

encryptBtn.addEventListener("click", () => {
    if (publicKeyInput.value.trim() === "") {
        showWarning(keysEmptyWarning);
        return;
    }

    let sourceText = sourceTextTextarea.value;
    if (sourceText.trim() === "") {
        showWarning(sourceTextEmptyWarning);
        return;
    }
    encryptedTextTextarea.value = getEncryptedText(sourceText);
});

decryptBtn.addEventListener("click", () => {
    if (publicKeyInput.value.trim() === "") {
        showWarning(keysEmptyWarning);
        return;
    }

    let encryptedText = encryptedTextTextarea.value;
    if (encryptedText.trim() === "") {
        showWarning(encryptedTextEmptyWarning);
        return;
    }
    sourceTextTextarea.value = getSourceText(encryptedText);
});





