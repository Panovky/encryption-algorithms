export let caesarCipherContent = document.getElementById("caesar-cipher-content");
export let rsaAlgorithmContent = document.getElementById("rsa-algorithm-content");
export let diffieHellmanProtocolContent = document.getElementById("diffie-hellman-protocol-content");

export function showWarning(warning) {
    warning.style.display = "block";
    setTimeout(() => {
        warning.style.display = "none";
    }, 2000);
}

// возвращает случайное целое число от min (включительно) до max (включительно)
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let chooseCaesarCipherBtn = document.getElementById("choose-caesar-cipher-btn");
let chooseRsaAlgorithmBtn = document.getElementById("choose-rsa-algorithm-btn");
let chooseDiffieHellmanProtocolBtn = document.getElementById("choose-diffie-hellman-protocol-btn");

chooseCaesarCipherBtn.addEventListener("click", () => {
    if (chooseCaesarCipherBtn.classList.contains("btn-outline-warning")) {
        chooseDiffieHellmanProtocolBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseRsaAlgorithmBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseCaesarCipherBtn.classList.replace("btn-outline-warning", "btn-warning");
        diffieHellmanProtocolContent.style.display = "none";
        rsaAlgorithmContent.style.display = "none";
        caesarCipherContent.style.display = "block";
    }
});

chooseRsaAlgorithmBtn.addEventListener("click", () => {
    if (chooseRsaAlgorithmBtn.classList.contains("btn-outline-warning")) {
        chooseCaesarCipherBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseDiffieHellmanProtocolBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseRsaAlgorithmBtn.classList.replace("btn-outline-warning", "btn-warning");
        caesarCipherContent.style.display = "none";
        diffieHellmanProtocolContent.style.display = "none";
        rsaAlgorithmContent.style.display = "block";
    }
});

chooseDiffieHellmanProtocolBtn.addEventListener("click", () => {
    if (chooseDiffieHellmanProtocolBtn.classList.contains("btn-outline-warning")) {
        chooseCaesarCipherBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseRsaAlgorithmBtn.classList.replace("btn-warning", "btn-outline-warning");
        chooseDiffieHellmanProtocolBtn.classList.replace("btn-outline-warning", "btn-warning");
        caesarCipherContent.style.display = "none";
        rsaAlgorithmContent.style.display = "none";
        diffieHellmanProtocolContent.style.display = "block";
    }
});