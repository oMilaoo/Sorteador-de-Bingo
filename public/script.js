const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slide');
        const radioButtons = document.querySelectorAll('[name="slider"]');
        let currentIndex = 0;
        const slideWidth = slides[0].offsetWidth;
        let intervalId;

        // Função para ir para um slide específico
        function goToSlide(index) {
            if (index < 0 || index >= slides.length) return;
            sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
        }

        // Associando a mudança de slide aos botões de rádio
        radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                clearInterval(intervalId); // Limpa o intervalo atual
                goToSlide(index);
                setTimeout(() => {
                    startInterval(); // Reinicia o intervalo após um curto período de tempo
                }, 1000); // Tempo de pausa em milissegundos (aqui definido como 1 segundo)
            });
        });

        // Função para iniciar o intervalo de troca automática de slides
        function startInterval() {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                goToSlide(currentIndex);
                radioButtons[currentIndex].checked = true; // Marca o botão de rádio correspondente
            }, 3000); // Troca de slide a cada 3 segundos
        }

        // Inicia o intervalo pela primeira vez
        startInterval()