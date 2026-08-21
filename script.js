document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DO MENU HAMBÚRGUER RESPONSIVO ---
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // --- 2. ACESSIBILIDADE: CONTRASTE E ALTERNADOR DE FONTE ---
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    
    let rootHtml = document.documentElement;
    let currentFontSize = 100; // Representa 100% ou 1rem (16px)

    btnContrast.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
    });

    btnFontIncrease.addEventListener("click", () => {
        if(currentFontSize < 140) { // Limite máximo seguro
            currentFontSize += 10;
            rootHtml.style.setProperty("--font-scale", `${currentFontSize}%`);
        }
    });

    btnFontDecrease.addEventListener("click", () => {
        if(currentFontSize > 90) { // Limite mínimo seguro
            currentFontSize -= 10;
            rootHtml.style.setProperty("--font-scale", `${currentFontSize}%`);
        }
    });

    // --- 3. LÓGICA INTERATIVA DO SIMULADOR TÉRMICO ---
    const inputIntensity = document.getElementById("solar-intensity");
    const valIntensity = document.getElementById("val-intensity");
    const selectColor = document.getElementById("plate-color");
    const progressBar = document.getElementById("progress-bar");
    const piscinaTemp = document.getElementById("piscina-temp");

    function calcularEficiencia() {
        let intensidade = parseInt(inputIntensity.value);
        valIntensity.textContent = intensidade;

        let multiplicadorCor = 1.0; // Preto Absoluto
        if (selectColor.value === "azul") multiplicadorCor = 0.65;
        if (selectColor.value === "branco") multiplicadorCor = 0.10;

        // Cálculo dinâmico simplificado da eficiência
        let eficienciaFinal = Math.round(intensidade * multiplicadorCor);
        
        // Atualiza a barra de interface visualmente com animação fluida CSS
        progressBar.style.width = eficienciaFinal + "%";
        progressBar.textContent = eficienciaFinal + "%";

        // Cálculo hipotético de aquecimento da piscina (Base: 22°C padrão mais ganho de eficiência)
        let temperaturaCalculada = 22 + Math.round(eficienciaFinal * 0.12);
        piscinaTemp.textContent = temperaturaCalculada;
    }

    // Escuta eventos de movimentação dos sliders e caixas de seleção
    inputIntensity.addEventListener("input", calcularEficiencia);
    selectColor.addEventListener("change", calcularEficiencia);

    // Inicializa a simulação no primeiro carregamento
    calcularEficiencia();
});

