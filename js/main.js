export let caesarCipherContent = document.getElementById("caesar-cipher-content");
export let rsaAlgorithmContent = document.getElementById("rsa-algorithm-content");

export function showWarning(warning) {
    warning.style.display = "block";
    setTimeout(() => {
        warning.style.display = "none";
    }, 2000);
}

let chooseCaesarCipherBtn = document.getElementById("choose-caesar-cipher-btn");
let chooseRsaAlgorithmBtn = document.getElementById("choose-rsa-algorithm-btn");

chooseCaesarCipherBtn.addEventListener("click", () => {
    if (chooseCaesarCipherBtn.classList.contains("btn-outline-warning")) {
        chooseCaesarCipherBtn.classList.replace("btn-outline-warning", "btn-warning");
        chooseRsaAlgorithmBtn.classList.replace("btn-warning", "btn-outline-warning");
        rsaAlgorithmContent.style.display = "none";
        caesarCipherContent.style.display = "block";
    }
});

chooseRsaAlgorithmBtn.addEventListener("click", () => {
    if (chooseRsaAlgorithmBtn.classList.contains("btn-outline-warning")) {
        chooseRsaAlgorithmBtn.classList.replace("btn-outline-warning", "btn-warning");
        chooseCaesarCipherBtn.classList.replace("btn-warning", "btn-outline-warning");
        caesarCipherContent.style.display = "none";
        rsaAlgorithmContent.style.display = "block";
    }
});