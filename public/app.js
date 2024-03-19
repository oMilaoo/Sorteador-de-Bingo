var numeros = [];
            var ultimos = [];
            
            var letr = document.getElementById('letr');
            var nume = document.getElementById('nume');
            var modal_letra = document.getElementById('modal_letra');
            var modal_numero = document.getElementById('modal_numero');
            var faltam = document.getElementById('faltam');
            var foram = document.getElementById('foram');
            var modal = document.getElementById('modal');

            var btn_sortear = document.getElementById('btn_sortear');
            
            var som = true;
            var sortear_frase = false;
            var pode_sortear = true;
            var automatico = true;
            var animation = true;
            var fullscreen = false;

            let utter = new SpeechSynthesisUtterance()
            

            
            utter.onend = function() {
                if(sortear_frase && Math.random() < 0.3){
                    utter.text = frasesAleatorias[Math.floor(Math.random() * (frasesAleatorias.length - 1))]
                    window.speechSynthesis.speak(utter)
                    // btn_sortear.disabled = false
                    // pode_sortear = true
                } else {
                    btn_sortear.disabled = false
                    pode_sortear = true
                }
                sortear_frase = false
            }

            // speak
            window.speechSynthesis.speak(utter)
            
            for(let i = 1; i <= 75; i++){
                numeros.push(i);
            }
                            
            document.addEventListener('contextmenu', event => event.preventDefault());
            
            var deg = 0;
            
            document.body.onkeyup = function(e){
                if(e.keyCode == 32){
                    if(pode_sortear){
                        sortear()
                    }
                }
            }

            function render() {
//                background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
//                background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
                // document.body.style.background = 'linear-gradient(' + deg + 'deg, #89f7fe, #66a6ff)';
                // deg++;
                // requestAnimationFrame(render);
                updateIcons()
            }
            
            render();
//            function contextMenu(data){
//                sortear();
//                let bola = document.getElementById(data);
//                if(bola.classList.contains('saiu')){
//                    bola.classList.remove('saiu');
//                    let pos = ultimos.indexOf(data);
//                    ultimos.splice(pos, 1);
//                } else {
//                    bola.classList.add('saiu');
//                    ultimos.push(data);
//                }
//                atualizarUltimas();
//            }
            
            function marcarNumero(id){
                if(!automatico){
                    if(ultimos.indexOf(id) == -1){
                        var num = id.slice(1, id.length);

                        let bola = document.getElementById(id);
                        bola.classList.add('saiu');

                        // utter.text = numerosEscrito[parseInt(num) - 1]
                        
                        // btn_sortear.disabled = true
                        // window.speechSynthesis.speak(utter)
                        // console.log('Vou falar o número ', num)

                        ultimos.push(id);
                        console.log('ID: ' + id + ' | num: ' + num + ' | index: ' + numeros.indexOf(parseInt(num)));
                        numeros.splice(numeros.indexOf(parseInt(num)), 1);
                        atualizarUltimas();

                        ativarModal(id);
                    }
                }
            }
            
            function atualizarUltimas(){
                let ultimasBolas = document.getElementById('ultimas');
                
                var content = '';
                
                for(let i = (ultimos.length-1); i >= 0; i--){
                    content += "<div class='numero saiu' id='" + ultimos[i] + "'><p class='letra'>" + ultimos[i].substring(0,1) + "</p><p class='nul'>" + ultimos[i].substring(1, ultimos[i].length) + "</p></div>";
                }
                
                ultimasBolas.innerHTML = content;
                faltam.innerHTML = 'Faltam: ' + numeros.length;
                foram.innerHTML = 'Foram: ' + ultimos.length;
                
                if(ultimos.length == 0){
                    document.getElementById('icoQuestion').classList.remove('oculto');
                } else {
                    document.getElementById('icoQuestion').classList.add('oculto');
                }
            }
            
            function voltar(){
                if(ultimos.length > 0){
                    let data = ultimos[ultimos.length - 1];
                    let bola = document.getElementById(data);
                    if(bola.classList.contains('saiu')){
                        bola.classList.remove('saiu');
                        let pos = ultimos.indexOf(data);
                        let n = parseInt(data.slice(1,ultimos[ultimos.length - 1].length));
                        numeros.push(n);
                        ultimos.splice(pos, 1);
                    }
                    if(ultimos.length == 0){
                        letr.innerHTML = '';
                        nume.innerHTML = '';
                    } else {
                        letr.innerHTML = ultimos[ultimos.length - 1].slice(0,1);
                        nume.innerHTML = ultimos[ultimos.length - 1].slice(1,ultimos[ultimos.length - 1].length);
                    }
                    numeros.sort(function(a, b){return a - b});

                    atualizarUltimas();
                }
            }
            
            function limpar(){
                utter.text = 'Pronto! Vamos começar'
                window.speechSynthesis.speak(utter)
                sortear_frase = false
                numeros = [];
                for(let i = 1; i <= 75; i++){
                    document.getElementById(concatLetter(i)).classList.remove('saiu');
                    numeros.push(i);
                }
                ultimos = [];
                atualizarUltimas();
                letr.innerHTML = '';
                nume.innerHTML = '';
            }
            
            function sortear(){
                var aleatorio = Math.floor(Math.random() * numeros.length);
                var nel = concatLetter(numeros[aleatorio]);
                let bola = document.getElementById(nel);
                bola.classList.add('saiu');
                
                ultimos.push(nel);
                numeros.splice(aleatorio, 1);
                atualizarUltimas();
                
                ativarModal(nel);
            }
            
            function concatLetter(number){
                var result;
                if(number <= 15){
                    result = 'B';
                } else if(number > 15 && number <= 30){
                    result = 'I';
                } else if(number > 30 && number <= 45){
                    result = 'N';
                } else if(number > 45 && number <= 60){
                    result = 'G';
                } else if(number > 60 && number <= 75){
                    result = 'O';
                }
                return result + number;
            }
            
            function ativarModal(nel){
                if(animation){
                    modal_letra.innerHTML = nel.substring(0,1);
                    modal_numero.innerHTML = nel.substring(1, nel.length);

                    modal.style.display = 'block';
                    setTimeout(function(){
                        letr.innerHTML = nel.substring(0,1);
                        nume.innerHTML = nel.substring(1, nel.length);
                        modal.style.display = 'none';
                    }, 4200);
                } else {
                    letr.innerHTML = nel.substring(0,1);
                    nume.innerHTML = nel.substring(1, nel.length);
                    modal.style.display = 'none';
                }
                if(som){
                    // som = new sound("sorteio.mp3");
                    // som.play();
                    
                    utter.text = numerosEscrito[parseInt(nel.substring(1, nel.length)) - 1]

                    sortear_frase = true
                    pode_sortear = false
                    btn_sortear.disabled = true
                    window.speechSynthesis.speak(utter)
                    console.log('Vou falar o número ', nel.substring(1, nel.length))
                }
//                setTimeout(function(){
//                    letr.innerHTML = nel.substring(0,1);
//                    nume.innerHTML = nel.substring(1, nel.length);
//                    modal.style.display = 'none';
//                }, 2000);
            }
            
            function sound(src){
                this.sound = document.createElement("audio");
                this.sound.src = src;
                this.sound.setAttribute("preload", "auto");
                this.sound.setAttribute("controls", "none");
                this.sound.style.display = "none";
                document.body.appendChild(this.sound);
                this.play = function(){
                    this.sound.play();
                }
                this.stop = function(){
                    this.sound.pause();
                }
            }
            
            function switchSound(){
                som = !som;
                updateIcons();
            }
            
            function switchAuto(){
                automatico = !automatico;
                updateIcons();
            }
            
            function switchAnimation(){
                animation = !animation;
                updateIcons();
            }
            
            function switchFullscreen(){
                fullscreen = !fullscreen;
                updateIcons();
                var elem = document.documentElement;

                if(fullscreen){
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) { /* Firefox */
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) { /* IE/Edge */
                        document.msExitFullscreen();
                    }
                }

            }
            
            function updateIcons(){
                if(som){
                    document.getElementById("icoSoundUp").classList.remove('oculto');
                    document.getElementById("icoSoundMute").classList.add('oculto');
                } else {
                    document.getElementById("icoSoundUp").classList.add('oculto');
                    document.getElementById("icoSoundMute").classList.remove('oculto');
                }
                if(automatico){
                    document.getElementById("icoShuffle").classList.remove('oculto');
                    document.getElementById("icoNotShuffle").classList.add('oculto');
                    document.getElementById("btn_sortear").classList.remove('oculto');
                    document.getElementById("btn_voltar").classList.add('oculto');
                } else {
                    document.getElementById("icoShuffle").classList.add('oculto');
                    document.getElementById("icoNotShuffle").classList.remove('oculto');
                    document.getElementById("btn_sortear").classList.add('oculto');
                    document.getElementById("btn_voltar").classList.remove('oculto');
                }
                if(animation){
                    document.getElementById("icoAnimation").classList.add('oculto');
                    document.getElementById("icoNoAnimation").classList.remove('oculto');
                } else {
                    document.getElementById("icoAnimation").classList.remove('oculto');
                    document.getElementById("icoNoAnimation").classList.add('oculto');
                }
                if(fullscreen){
                    document.getElementById("icoFullscreen").classList.add('oculto');
                    document.getElementById("icoNoFullscreen").classList.remove('oculto');
                } else {
                    document.getElementById("icoFullscreen").classList.remove('oculto');
                    document.getElementById("icoNoFullscreen").classList.add('oculto');
                }
            }