// Elemento de audio
const audio = document.getElementById('birthdayAudio');

// Cargar música automáticamente
window.addEventListener('load', function() {
    // Intenta cargar un archivo llamado "cancion.mp3" en la misma carpeta
    audio.src = "cancion.mp3";
    audio.load();
    
    // Configura el volumen inicial
    audio.volume = 0.7;
    
    // Calcula el tiempo juntos
    calculateTimeTogether();
    
    // Iniciar animación de los animalitos
    startDancingAnimals();
    
    // Efecto de escritura automática en el título
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(function() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 100);
});

// Reproducir audio
function playAudio() {
    audio.play().catch(error => {
        console.log("Error al reproducir audio:", error);
        showMessage("Para agregar música, guarda un archivo MP3 llamado 'cancion.mp3' en la misma carpeta que esta página");
    });
    
    // Acelerar el baile de los animalitos con la música
    speedUpDancing();
}

// Pausar audio
function pauseAudio() {
    audio.pause();
    
    // Restaurar velocidad normal de baile
    slowDownDancing();
}

// Detener audio y reiniciar
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    
    // Restaurar velocidad normal de baile
    slowDownDancing();
}

// Ajustar volumen
function setVolume() {
    const volumeSlider = document.getElementById('volumeSlider');
    audio.volume = volumeSlider.value;
}

// Revelar sorpresa
function revealSurprise() {
    const surprise = document.getElementById('surprise');
    const button = document.querySelector('.surprise-btn');
    
    if (surprise.style.display === 'block') {
        surprise.style.display = 'none';
        button.textContent = '¡Haz clic para una sorpresa!';
    } else {
        surprise.style.display = 'block';
        button.textContent = '¡Qué sorpresa tan bonita!';
        
        // Efectos adicionales
        surprise.style.animation = 'fadeIn 1.5s';
        
        // Confeti
        createConfetti();
        
        // Los animalitos bailan más rápido
        speedUpDancing();
        setTimeout(slowDownDancing, 3000);
    }
}

// Mostrar mensaje
function showMessage(msg) {
    alert(msg);
}

// Calcular tiempo juntos (desde el nacimiento)
function calculateTimeTogether() {
    // Cambia esta fecha por tu fecha de nacimiento
    const birthDate = new Date('2008-06-20'); // Ejemplo: 1 de enero de 2000
    const today = new Date();
    
    // Calcular diferencia en milisegundos
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    document.getElementById('time-together').textContent = diffDays + " días";
}

// Crear efecto de confeti
function createConfetti() {
    const confettiCount = 100;
    const container = document.querySelector('body');
    const colors = ['#ff6b6b', '#ffce5c', '#7ed321', '#4a90e2', '#bd10e0'];
    const emojis = ['🎉', '🎊', '🎁', '🎈', '💖', '🌸', '✨', '🥳'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Alternar entre colores y emojis
        if (Math.random() > 0.5) {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (10 + Math.random() * 10) + 'px';
            confetti.style.height = (10 + Math.random() * 10) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        } else {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.fontSize = (15 + Math.random() * 15) + 'px';
            confetti.style.backgroundColor = 'transparent';
        }
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
        
        container.appendChild(confetti);
        
        // Eliminar el confeti después de que termine la animación
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Iniciar animación de los animalitos
function startDancingAnimals() {
    const animals = document.querySelectorAll('.dancing-bear, .bunny, .panda');
    animals.forEach(animal => {
        animal.style.visibility = 'visible';
    });
}

// Acelerar el baile
function speedUpDancing() {
    const animals = document.querySelectorAll('.dancing-bear, .bunny, .panda');
    animals.forEach(animal => {
        animal.style.animationDuration = '0.6s';
    });
}

// Restaurar velocidad normal de baile
function slowDownDancing() {
    const animals = document.querySelectorAll('.dancing-bear, .bunny, .panda');
    animals.forEach(animal => {
        if (animal.classList.contains('bunny')) {
            animal.style.animationDuration = '1.2s';
        } else if (animal.classList.contains('panda')) {
            animal.style.animationDuration = '1.7s';
        } else {
            animal.style.animationDuration = '1.5s';
        }
    });
}