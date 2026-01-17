const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultMessage = document.getElementById('resultMessage');

// Palette colori vibrante e moderna
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

let currentRotation = 0; // Memorizza la posizione attuale della ruota
let isSpinning = false;

// Funzione per disegnare la ruota (rimane simile, con rifiniture grafiche)
function drawWheel() {
    const angleStep = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Bordo sottile tra spicchi per pulizia visiva
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px 'Montserrat', sans-serif";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(prizes[i], radius - 30, 5);
        ctx.restore();
    }

    // Overlay lucido per effetto vetro
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255,255,255,0.15)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
}

// ... (mantenere variabili iniziali colors e prizes)

function spin() {
    if (isSpinning) return;

    isSpinning = true;
    spinButton.disabled = true;
    resultMessage.textContent = "Vediamo cosa esce...";

    // 1. Calcolo del vincitore
    const winningIndex = Math.floor(Math.random() * numSegments);
    const degreesPerSegment = 360 / numSegments;

    // 2. Rotazione Continua Allineata
    const extraDegrees = 1800; // 5 giri completi
    
    /* SPIEGAZIONE CALCOLO:
       - Il canvas parte da destra (0°). Il puntatore è in alto (-90°).
       - Dobbiamo sottrarre la posizione dello spicchio dalla rotazione totale.
    */
    const offsetIniziale = 90; // Sposta lo zero da ore 3 a ore 12
    const targetSegmentDegrees = (360 - (winningIndex * degreesPerSegment)) - offsetIniziale - (degreesPerSegment / 2);

    const currentModulo = currentRotation % 360;
    const additionalRotation = extraDegrees + (targetSegmentDegrees - currentModulo + 360) % 360;
    
    currentRotation += additionalRotation;

    canvas.style.transition = 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)';
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
        
        // Il risultato ora corrisponderà esattamente allo spicchio sotto il puntatore giallo
        const finalPrize = prizes[winningIndex];
        resultMessage.textContent = `Risultato: ${finalPrize}`;
    }, 4000);
}

spinButton.addEventListener('click', spin);
drawWheel();
