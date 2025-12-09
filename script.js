const canvas = document.getElementById('tracing-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const colorBtns = document.querySelectorAll('.color-btn');

let isDrawing = false;
let currentLetter = 'A';
let drawColor = '#333';

function drawLetter(letter) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "300px sans-serif";
    ctx.fillStyle = '#f0f0f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
}

function getPosition(e) {
    if (e.touches) {
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: e.touches[0].clientX - rect.left,
            offsetY: e.touches[0].clientY - rect.top
        };
    }
    return {
        offsetX: e.offsetX,
        offsetY: e.offsetY
    };
}

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    const { offsetX, offsetY } = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const { offsetX, offsetY } = getPosition(e);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawColor;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
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

function changeColor(e) {
    drawColor = e.target.dataset.color;
    colorBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
}

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

clearBtn.addEventListener('click', clearCanvas);
nextBtn.addEventListener('click', nextLetter);
prevBtn.addEventListener('click', prevLetter);
colorBtns.forEach(btn => btn.addEventListener('click', changeColor));

// Initial setup
drawLetter(currentLetter);
colorBtns[0].classList.add('active');
