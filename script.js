const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const clearBtn = document.getElementById('clear');

let isDrawing = false;
let currentLetter = 'A';
let drawColor = '#333';
let lastX = 0;
let lastY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;
    drawLetter(currentLetter);
}

function drawLetter(letter) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = Math.min(canvas.width, canvas.height) * 0.8;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = '#f0f0f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
}

function getCoords(e) {
    if (e.touches) {
        return {
            x: e.touches[0].clientX - canvas.offsetLeft,
            y: e.touches[0].clientY - canvas.offsetTop
        };
    }
    return {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };
}

function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCoords(e);
    [lastX, lastY] = [x, y];
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawColor;
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    drawLetter(currentLetter);
}

function nextLetter() {
    currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
    if (currentLetter > 'Z') {
        currentLetter = 'A';
    }
    drawLetter(currentLetter);
}

function prevLetter() {
    currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) - 1);
    if (currentLetter < 'A') {
        currentLetter = 'Z';
    }
    drawLetter(currentLetter);
}

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

prevBtn.addEventListener('click', prevLetter);
nextBtn.addEventListener('click', nextLetter);
clearBtn.addEventListener('click', clearCanvas);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
