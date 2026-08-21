document.addEventListener("DOMContentLoaded", function() {
    // MENU MOBILE RESPONSIVO
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    // ACESSIBILIDADE E REGRAS DE TELA
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    let rootHtml = document.documentElement;
    let currentFontSize = 100;

    if (btnContrast) {
        btnContrast.addEventListener("click", function() {
            document.body.classList.toggle("high-contrast");
        });
    }

    if (btnFontIncrease) {
        btnFontIncrease.addEventListener("click", function() {
            if (currentFontSize < 130) {
                currentFontSize += 10;
                rootHtml.style.setProperty("--font-scale", currentFontSize + "%");
            }
        });
    }

    if (btnFontDecrease) {
        btnFontDecrease.addEventListener("click", function() {
            if (currentFontSize > 90) {
                currentFontSize -= 10;
                rootHtml.style.setProperty("--font-scale", currentFontSize + "%");
            }
        });
    }

    // CÁLCULOS LÓGICOS DO SIMULADOR FÍSICO
    const inputIntensity = document.getElementById("solar-intensity");
    const valIntensity = document.getElementById("val-intensity");
    const selectColor = document.getElementById("plate-color");
    const progressBar = document.getElementById("progress-bar");
    const piscinaTemp = document.getElementById("piscina-temp");
    const systemStatus = document.getElementById("system-status");

    function atualizarSimulador() {
        if (!inputIntensity || !valIntensity || !selectColor || !progressBar || !piscinaTemp || !systemStatus) {
            return;
        }

        let intensidade = parseInt(inputIntensity.value) || 0;
        valIntensity.textContent = intensidade + "%";

        let fatorAbsorcao = 1.0;
        if (selectColor.value === "azul") fatorAbsorcao = 0.6;
        if (selectColor.value === "branco") fatorAbsorcao = 0.05;

        let eficiencia = Math.round(intensidade * fatorAbsorcao);
        progressBar.textContent = eficiencia + "%";
        progressBar.style.background = `linear-gradient(90deg, #00f2fe ${eficiencia}%, rgba(255,255,255,0.05) ${eficiencia}%)`;

        let tempFinal = 22 + Math.round(eficiencia * 0.14);
        piscinaTemp.textContent = tempFinal;

        if (eficiencia > 25) {
            systemStatus.textContent = "BOMBA ATIVADA (AQUECENDO)";
            systemStatus.className = "status-badge status-active";
        } else {
            systemStatus.textContent = "SISTEMA EM ESPERA (SOL INSUFICIENTE)";
            systemStatus.className = "status-badge status-idle";
        }
    }

    if (inputIntensity && selectColor) {
        inputIntensity.addEventListener("input", atualizarSimulador);
        selectColor.addEventListener("change", atualizarSimulador);
        atualizarSimulador();
    }
});

