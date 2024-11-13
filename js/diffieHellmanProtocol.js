import {diffieHellmanProtocolContent, getRandomNumber} from './main.js'

const generateKeyBtn = diffieHellmanProtocolContent.getElementsByTagName("button")[0];
const spanW = diffieHellmanProtocolContent.getElementsByTagName("span")[0];
const spanN = diffieHellmanProtocolContent.getElementsByTagName("span")[1];
const spanXA = diffieHellmanProtocolContent.getElementsByTagName("span")[2];
const spanYA = diffieHellmanProtocolContent.getElementsByTagName("span")[3];
const spanXB = diffieHellmanProtocolContent.getElementsByTagName("span")[4];
const spanYB = diffieHellmanProtocolContent.getElementsByTagName("span")[5];
const spanKAB1 = diffieHellmanProtocolContent.getElementsByTagName("span")[6];
const spanKAB2 = diffieHellmanProtocolContent.getElementsByTagName("span")[7];

const lowerBound = 100;
const upperBound = 200;

let t1, t2, t3, t4, t5, t6, t7, t8;

function isPrimeNumber(n) {
    if (n % 2 === 0) {
        return n === 2;
    }

    let d = 3;
    while (d * d <= n && n % d !== 0) {
        d += 2;
    }
    return d * d > n;
}

function generatePrimeNumberBetween(a, b) {
    let n;
    while (1) {
        n = getRandomNumber(a + 1, b - 1);
        if (isPrimeNumber(n)) {
            break;
        }
    }
    return n;
}

function modularExponentiation(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function clearTimeouts() {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    clearTimeout(t4);
    clearTimeout(t5);
    clearTimeout(t6);
    clearTimeout(t7);
    clearTimeout(t8);
}

function clearNumbers() {
    spanW.textContent = "";
    spanN.textContent = "";
    spanXA.textContent = "";
    spanYA.textContent = "";
    spanXB.textContent = "";
    spanYB.textContent = "";
    spanKAB1.textContent = "";
    spanKAB2.textContent = "";
}

generateKeyBtn.addEventListener("click", () => {
    clearTimeouts();
    clearNumbers();

    const w = generatePrimeNumberBetween(lowerBound, upperBound);
    let n;
    while (1) {
        n = generatePrimeNumberBetween(lowerBound, upperBound);
        if (w !== n) {
            break;
        }
    }
    const xa = generatePrimeNumberBetween(lowerBound, upperBound);
    const ya = modularExponentiation(w, xa, n);
    const xb = generatePrimeNumberBetween(lowerBound, upperBound);
    const yb = modularExponentiation(w, xb, n);
    const kab1 = modularExponentiation(yb, xa, n);
    const kab2 = modularExponentiation(ya, xb, n);

    t1 = setTimeout(() => {
        spanW.textContent = String(w);
    }, 500);
    t2 = setTimeout(() => {
        spanN.textContent = String(n);
    }, 1500);
    t3 = setTimeout(() => {
        spanXA.textContent = String(xa);
    }, 2500);
    t4 = setTimeout(() => {
        spanYA.textContent = String(ya);
    }, 3500);
    t5 = setTimeout(() => {
        spanXB.textContent = String(xb);
    }, 4500);
    t6 = setTimeout(() => {
        spanYB.textContent = String(yb);
    }, 5500);
    t7 = setTimeout(() => {
        spanKAB1.textContent = String(kab1);
    }, 6500);
    t8 = setTimeout(() => {
        spanKAB2.textContent = String(kab2);
    }, 7500);
});
