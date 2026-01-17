const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

// Palette colori vibrante ispirata all'immagine
const colors = [
    '#FF3E3E', '#FF8E00', '#FFD700', '#A8FF00', 
    '#00FF85', '#00F0FF', '#0075FF', '#8E00FF', 
    '#FF00D6', '#FF005C'
];

const prizes = [
    "SCONTO 10%", "RIPROVA", "GIFT CARD", "NO!", 
    "PREMIO GOLD", "RIPROVA", "SCONTO 5%", "NO!",
    "SUPER WIN", "RIPROVA", "BONUS", "NO!",
    "SCONTO 20%", "RIPROVA", "FREE SPIN", "NO!",
    "PREMIO MEZZA", "RIPROVA", "X2 POINT", "NO!"
];

const numSegments = 20;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = centerX - 10;

function drawWheel() {
    const angleStep = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep;

        // Disegno spicchio
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();

        // Aggiunta testo
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px Montserrat, sans-serif";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(prizes[i], radius - 30, 5);
        ctx.restore();
    }

    // Effetto riflesso vetro (Overlay)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
}

function spin() {
    const randomRotation = Math.floor(Math.random() * 360) + 1440; // Almeno 4 giri
    canvas.style.transition = 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)';
    canvas.style.transform = `rotate(${randomRotation}deg)`;
    
    // Calcolo risultato dopo l'animazione
    setTimeout(() => {
        const actualRotation = randomRotation % 360;
        const segmentAngle = 360 / numSegments;
        const winningIndex = Math.floor((360 - actualRotation) / segmentAngle) % numSegments;
        alert("Risultato: " + prizes[winningIndex]);
    }, 4000);
}

spinButton.addEventListener('click', spin);
drawWheel();
