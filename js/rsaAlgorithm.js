import {rsaAlgorithmContent, showWarning} from './main.js'

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

// возвращает случайное целое число от min (включительно) до max (включительно)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// возвращает наибольший общий делитель чисел a и b
function gcd(a, b) {
    let buffer;
    while (b !== 0) {
        buffer = b;
        b = a % b;
        a = buffer;
    }
    return a;
}

// возвращает коэффициенты x и y в расширенном алгоритме евклида
function gcdExtended(a, b) {
    let q, r;
    let x1 = 0, x2 = 1, y1 = 1, y2 = 0;
    let x, y;
    while (b > 0) {
        q = Math.floor(a / b);
        r = a - q * b;
        x = x2 - q * x1;
        y = y2 - q * y1;
        a = b;
        b = r;
        x2 = x1;
        x1 = x;
        y2 = y1;
        y1 = y;
    }
    return [x2, y2];
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

function generatePublicKey(phi, n) {
    while (1) {
        e = getRandomNumber(1, n - 1);
        if (gcd(e, phi) == 1) {
            break;
        }
    }
}

function generateSecretKey(phi, e) {
    let [x2, y2] = gcdExtended(phi, e)
    d = phi - Math.abs(Math.min(x2, y2));
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
        console.log(t);
    });

    return sourceText;
}

generateKeysBtn.addEventListener("click", (p, q) => {
    generatePublicKey(phi, n);
    generateSecretKey(phi, e);
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





