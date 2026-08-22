document.addEventListener("DOMContentLoaded", function() {
    // LINKS DO MENU MOBILE
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    // CONTROLES DO NOVO SIMULADOR SUSTENTÁVEL
    const sliderSol = document.getElementById("solar-intensity");
    const txtSol = document.getElementById("val-intensity");
    const seletorCor = document.getElementById("plate-color");
    const barraProgresso = document.getElementById("progress-bar");
    const txtTemperatura = document.getElementById("piscina-temp");
    const badgeStatus = document.getElementById("system-status");

    function processarSimulacao() {
        if (!sliderSol || !txtSol || !seletorCor || !barraProgresso || !txtTemperatura || !badgeStatus) {
            return;
        }

        // Pega os valores do painel
        let intensidadeSolar = parseInt(sliderSol.value);
        txtSol.textContent = intensidadeSolar + "%";

        // Aplica a física das cores (Absorção Óptica)
        let coeficienteAbsorcao = 1.0; // Preto Absoluto absorve tudo
        if (seletorCor.value === "azul") coeficienteAbsorcao = 0.60;
        if (seletorCor.value === "branco") coeficienteAbsorcao = 0.05; // Branco reflete

        // Calcula a eficiência final do coletor do CEP
        let eficienciaCalculada = Math.round(intensidadeSolar * coeficienteAbsorcao);
        
        // Atualiza o tamanho e texto da barra dinamicamente
        barraProgresso.textContent = eficienciaCalculada + "%";
        barraProgresso.style.width = eficienciaCalculada + "%";

        // Altera a cor da barra de forma inteligente baseado no rendimento
        if (eficienciaCalculada >= 60) {
            barraProgresso.style.backgroundColor = "#00e676"; // Verde (Excelente)
        } else if (eficienciaCalculada >= 20) {
            barraProgresso.style.backgroundColor = "#ff9100"; // Laranja (Médio)
        } else {
            barraProgresso.style.backgroundColor = "#ff5252"; // Vermelho (Baixo)
        }

        // Calcula o ganho térmico real da água (Temperatura base da piscina: 22°C)
        let temperaturaFinal = 22 + Math.round(eficienciaCalculada * 0.16);
        txtTemperatura.textContent = temperaturaFinal + "°C";

        // Lógica de Automação dos Atuadores (Microcontrolador Virtual)
        if (eficienciaCalculada > 15) {
            badgeStatus.textContent = "BOMBA ATIVADA (AQUECENDO PISCINA)";
            badgeStatus.className = "status-badge status-active";
        } else {
            badgeStatus.textContent = "SISTEMA EM ESPERA (SOL INSUFICIENTE)";
            badgeStatus.className = "status-badge status-idle";
        }
    }

    // Adiciona os escutadores de movimento e clique
    if (sliderSol && seletorCor) {
        sliderSol.addEventListener("input", processarSimulacao);
        seletorCor.addEventListener("change", processarSimulacao);
        
        // Força a execução inicial para o site já abrir funcionando
        processarSimulacao();
    }
});

