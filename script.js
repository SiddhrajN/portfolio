// Initialize EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Create floating dots
const floatingDotsContainer = document.getElementById('floatingDots');
const dotCount = 50;

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDelay = Math.random() * 15 + 's';
    dot.style.animationDuration = (Math.random() * 10 + 10) + 's';
    const size = Math.random() * 6 + 4;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    floatingDotsContainer.appendChild(dot);
}

// Create loading particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    particlesContainer.appendChild(particle);
}

// Custom Cursor with Trail
const cursor = document.querySelector('.custom-cursor');
const trails = [];
const trailCount = 10;

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trails.push({
        element: trail,
        x: 0,
        y: 0
    });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX - 10 + 'px';
    cursor.style.top = mouseY - 10 + 'px';
});

function animateTrails() {
    trails.forEach((trail, index) => {
        const nextTrail = trails[index - 1] || { x: mouseX, y: mouseY };
        
        trail.x += (nextTrail.x - trail.x) * 0.3;
        trail.y += (nextTrail.y - trail.y) * 0.3;
        
        trail.element.style.left = trail.x - 4 + 'px';
        trail.element.style.top = trail.y - 4 + 'px';
        trail.element.style.opacity = (1 - index / trailCount) * 0.6;
    });
    
    requestAnimationFrame(animateTrails);
}
animateTrails();

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, 5000);
});

// Navigation
function toggleNav() {
    document.getElementById('navMenu').classList.toggle('active');
}

function closeNav() {
    document.getElementById('navMenu').classList.remove('active');
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? '' : 'dark');
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Gallery Carousel
let currentGalleryIndex = 0;
const galleryTrack = document.getElementById('galleryTrack');
const galleryItems = document.querySelectorAll('.gallery-item');
const totalGalleryItems = galleryItems.length;

// Create indicators
const indicatorsContainer = document.getElementById('galleryIndicators');
for (let i = 0; i < totalGalleryItems; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.onclick = () => goToGallerySlide(i);
    indicatorsContainer.appendChild(indicator);
}

function updateGallery() {
    galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        if (index === currentGalleryIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function moveGallery(direction) {
    currentGalleryIndex += direction;
    
    if (currentGalleryIndex < 0) {
        currentGalleryIndex = totalGalleryItems - 1;
    } else if (currentGalleryIndex >= totalGalleryItems) {
        currentGalleryIndex = 0;
    }
    
    updateGallery();
}

function goToGallerySlide(index) {
    currentGalleryIndex = index;
    updateGallery();
}

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveGallery(-1);
    } else if (e.key === 'ArrowRight') {
        moveGallery(1);
    }
});

// Form Submit
function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const templateParams = {
        from_name: form.name.value,
        from_email: form.email.value,
        message: form.message.value,
        to_email: 'siddhrajnimje@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again or contact me directly at siddhrajnimje@gmail.com');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Snake Game
let snakeGameActive = false;
let snakeCanvas, snakeCtx;
let snake, food, direction, nextDirection, snakeScore, snakeHighScore;
let snakeGameLoop;
const gridSize = 20;
const tileCount = 20;

// Dynamic canvas sizing
function resizeSnakeCanvas() {
    const container = document.querySelector('.snake-game-container');
    if (container && snakeCanvas) {
        const maxSize = Math.min(window.innerWidth - 60, 400);
        snakeCanvas.width = maxSize;
        snakeCanvas.height = maxSize;
    }
}

function openSnakeGame() {
    document.getElementById('snakeModal').classList.add('active');
    snakeGameActive = true;
    initSnakeGame();
    resizeSnakeCanvas();
}

function closeSnakeGame() {
    document.getElementById('snakeModal').classList.remove('active');
    snakeGameActive = false;
    if (snakeGameLoop) {
        clearInterval(snakeGameLoop);
    }
}

// Snake mobile controls
function handleSnakeControl(dir) {
    if (!snakeGameActive) return;
    
    switch(dir) {
        case 'up':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            break;
        case 'down':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            break;
        case 'left':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            break;
        case 'right':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            break;
    }
}

// Praise the Sun Easter Egg
function praiseSun() {
    document.getElementById('praiseModal').classList.add('active');
}

function closePraiseSun() {
    document.getElementById('praiseModal').classList.remove('active');
}

// Close praise modal on Escape or clicking outside
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePraiseSun();
    }
});

document.getElementById('praiseModal').addEventListener('click', (e) => {
    if (e.target.id === 'praiseModal') {
        closePraiseSun();
    }
});

function initSnakeGame() {
    snakeCanvas = document.getElementById('snake-canvas');
    snakeCtx = snakeCanvas.getContext('2d');
    
    resizeSnakeCanvas();
    
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    snakeScore = 0;
    snakeHighScore = localStorage.getItem('snakeHighScore') || 0;
    
    document.getElementById('snake-score').textContent = snakeScore;
    document.getElementById('snake-high-score').textContent = snakeHighScore;
    
    spawnFood();
    
    if (snakeGameLoop) {
        clearInterval(snakeGameLoop);
    }
    snakeGameLoop = setInterval(updateSnakeGame, 100);
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            spawnFood();
            return;
        }
    }
}

function updateSnakeGame() {
    if (!snakeGameActive) return;
    
    direction = nextDirection;
    
    // Move snake
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Wrap around walls instead of dying
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;
    
    // Check self collision only
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOverSnake();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        snakeScore++;
        document.getElementById('snake-score').textContent = snakeScore;
        
        if (snakeScore > snakeHighScore) {
            snakeHighScore = snakeScore;
            localStorage.setItem('snakeHighScore', snakeHighScore);
            document.getElementById('snake-high-score').textContent = snakeHighScore;
        }
        
        spawnFood();
    } else {
        snake.pop();
    }
    
    drawSnakeGame();
}

function drawSnakeGame() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isHacking = document.body.classList.contains('hacking-mode');
    
    // Calculate dynamic grid size
    const dynamicGridSize = snakeCanvas.width / tileCount;
    
    // Clear canvas
    snakeCtx.fillStyle = isHacking ? '#000000' : (isDark ? '#0a0a0a' : '#f0f0f0');
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    // Draw grid
    snakeCtx.strokeStyle = isHacking ? 'rgba(0, 255, 0, 0.2)' : (isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(37, 99, 235, 0.1)');
    snakeCtx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(i * dynamicGridSize, 0);
        snakeCtx.lineTo(i * dynamicGridSize, snakeCanvas.height);
        snakeCtx.stroke();
        
        snakeCtx.beginPath();
        snakeCtx.moveTo(0, i * dynamicGridSize);
        snakeCtx.lineTo(snakeCanvas.width, i * dynamicGridSize);
        snakeCtx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            snakeCtx.fillStyle = isHacking ? '#00ff00' : (isDark ? '#fbbf24' : '#2563eb');
            snakeCtx.shadowBlur = 15;
            snakeCtx.shadowColor = isHacking ? '#00ff00' : (isDark ? '#fbbf24' : '#2563eb');
        } else {
            // Body
            snakeCtx.fillStyle = isHacking ? '#00cc00' : (isDark ? '#f59e0b' : '#3b82f6');
            snakeCtx.shadowBlur = 10;
            snakeCtx.shadowColor = isHacking ? '#00cc00' : (isDark ? '#f59e0b' : '#3b82f6');
        }
        
        snakeCtx.fillRect(
            segment.x * dynamicGridSize + 1,
            segment.y * dynamicGridSize + 1,
            dynamicGridSize - 2,
            dynamicGridSize - 2
        );
        
        snakeCtx.shadowBlur = 0;
    });
    
    // Draw food
    snakeCtx.fillStyle = isHacking ? '#ff00ff' : (isDark ? '#ef4444' : '#dc2626');
    snakeCtx.shadowBlur = 20;
    snakeCtx.shadowColor = isHacking ? '#ff00ff' : (isDark ? '#ef4444' : '#dc2626');
    snakeCtx.beginPath();
    snakeCtx.arc(
        food.x * dynamicGridSize + dynamicGridSize / 2,
        food.y * dynamicGridSize + dynamicGridSize / 2,
        dynamicGridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    snakeCtx.fill();
    snakeCtx.shadowBlur = 0;
}

function gameOverSnake() {
    clearInterval(snakeGameLoop);
    
    snakeCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    snakeCtx.fillStyle = isDark ? '#fbbf24' : '#2563eb';
    snakeCtx.font = 'bold 32px Arial';
    snakeCtx.textAlign = 'center';
    snakeCtx.shadowBlur = 20;
    snakeCtx.shadowColor = isDark ? '#fbbf24' : '#2563eb';
    snakeCtx.fillText('GAME OVER', snakeCanvas.width / 2, snakeCanvas.height / 2 - 20);
    
    snakeCtx.font = '20px Arial';
    snakeCtx.fillText('Score: ' + snakeScore, snakeCanvas.width / 2, snakeCanvas.height / 2 + 20);
    snakeCtx.fillText('Click to Restart', snakeCanvas.width / 2, snakeCanvas.height / 2 + 50);
    snakeCtx.shadowBlur = 0;
    
    snakeCanvas.onclick = () => {
        snakeCanvas.onclick = null;
        initSnakeGame();
    };
}

// Snake game controls
document.addEventListener('keydown', (e) => {
    if (!snakeGameActive) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
        case 'Escape':
            closeSnakeGame();
            break;
    }
});

// Scrolling Knight Animation
const scrollKnight = document.getElementById('scrollKnight');
const knightCanvas = document.getElementById('knightCanvas');
const knightCtx = knightCanvas.getContext('2d');
const stairsContainer = document.getElementById('stairs');

// Create stairs
const stairCount = Math.ceil(window.innerHeight / 60);
for (let i = 0; i < stairCount; i++) {
    const stair = document.createElement('div');
    stair.className = 'stair';
    stair.style.top = (i * 60 + 30) + 'px';
    stairsContainer.appendChild(stair);
}

// Draw knight on canvas
function drawScrollKnight(animFrame, isStartled = false) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = {
        armor: isDark ? '#fbbf24' : '#2563eb',
        metalDark: isDark ? '#d97706' : '#1e40af',
        metalLight: isDark ? '#fde047' : '#60a5fa',
        visor: '#1a1a1a',
        cape: isDark ? '#dc2626' : '#991b1b',
        silver: '#c0c0c0',
        gold: isDark ? '#fbbf24' : '#fcd34d'
    };
    
    knightCtx.clearRect(0, 0, 80, 120);
    
    const legOffset = isStartled ? 8 : Math.sin(animFrame * 0.3) * 6;
    const capeWave = isStartled ? 8 : Math.sin(animFrame * 0.2) * 3;
    const armRaise = isStartled ? -15 : 0;
    
    // Cape (behind knight) - flares out when startled
    knightCtx.fillStyle = colors.cape;
    knightCtx.beginPath();
    knightCtx.moveTo(20 + capeWave, 45);
    knightCtx.lineTo(15 + capeWave * 2, 95);
    knightCtx.lineTo(25 + capeWave * 2, 95);
    knightCtx.lineTo(30, 45);
    knightCtx.closePath();
    knightCtx.fill();
    
    // Body armor (cuirass)
    knightCtx.fillStyle = colors.armor;
    knightCtx.shadowBlur = isStartled ? 30 : 20;
    knightCtx.shadowColor = colors.armor;
    knightCtx.fillRect(20, 48, 40, 38);
    
    // Armor plates detail
    knightCtx.strokeStyle = colors.metalDark;
    knightCtx.lineWidth = 2;
    knightCtx.strokeRect(20, 48, 40, 38);
    knightCtx.beginPath();
    knightCtx.moveTo(20, 66);
    knightCtx.lineTo(60, 66);
    knightCtx.stroke();
    
    // Shoulder pauldrons
    knightCtx.fillStyle = colors.metalLight;
    knightCtx.beginPath();
    knightCtx.ellipse(20, 48 + armRaise, 8, 12, 0, 0, Math.PI * 2);
    knightCtx.fill();
    knightCtx.beginPath();
    knightCtx.ellipse(60, 48 + armRaise, 8, 12, 0, 0, Math.PI * 2);
    knightCtx.fill();
    
    // Belt
    knightCtx.fillStyle = colors.metalDark;
    knightCtx.fillRect(20, 84, 40, 4);
    
    // Belt buckle
    knightCtx.fillStyle = colors.gold;
    knightCtx.fillRect(36, 82, 8, 8);
    
    // Left leg with armor plates (moving)
    knightCtx.fillStyle = colors.armor;
    knightCtx.fillRect(24 + legOffset, 88, 12, 28);
    
    // Leg armor segments
    knightCtx.strokeStyle = colors.metalDark;
    knightCtx.lineWidth = 1.5;
    knightCtx.beginPath();
    knightCtx.moveTo(24 + legOffset, 98);
    knightCtx.lineTo(36 + legOffset, 98);
    knightCtx.stroke();
    
    // Left foot (boot)
    knightCtx.fillStyle = colors.metalDark;
    knightCtx.fillRect(22 + legOffset, 116, 16, 4);
    
    // Right leg with armor plates (moving opposite)
    knightCtx.fillStyle = colors.armor;
    knightCtx.fillRect(44 - legOffset, 88, 12, 28);
    
    // Leg armor segments
    knightCtx.strokeStyle = colors.metalDark;
    knightCtx.beginPath();
    knightCtx.moveTo(44 - legOffset, 98);
    knightCtx.lineTo(56 - legOffset, 98);
    knightCtx.stroke();
    
    // Right foot (boot)
    knightCtx.fillStyle = colors.metalDark;
    knightCtx.fillRect(42 - legOffset, 116, 16, 4);
    
    // Shield (left side) - raised when startled
    knightCtx.fillStyle = colors.metalLight;
    knightCtx.beginPath();
    knightCtx.moveTo(8, 50 + armRaise);
    knightCtx.lineTo(4, 58 + armRaise);
    knightCtx.lineTo(4, 72 + armRaise);
    knightCtx.lineTo(8, 80 + armRaise);
    knightCtx.lineTo(16, 80 + armRaise);
    knightCtx.lineTo(16, 50 + armRaise);
    knightCtx.closePath();
    knightCtx.fill();
    
    // Shield cross emblem
    knightCtx.strokeStyle = colors.cape;
    knightCtx.lineWidth = 3;
    knightCtx.beginPath();
    knightCtx.moveTo(10, 56 + armRaise);
    knightCtx.lineTo(10, 74 + armRaise);
    knightCtx.moveTo(4, 65 + armRaise);
    knightCtx.lineTo(16, 65 + armRaise);
    knightCtx.stroke();
    
    // Shield border
    knightCtx.strokeStyle = colors.metalDark;
    knightCtx.lineWidth = 2;
    knightCtx.beginPath();
    knightCtx.moveTo(8, 50 + armRaise);
    knightCtx.lineTo(4, 58 + armRaise);
    knightCtx.lineTo(4, 72 + armRaise);
    knightCtx.lineTo(8, 80 + armRaise);
    knightCtx.lineTo(16, 80 + armRaise);
    knightCtx.lineTo(16, 50 + armRaise);
    knightCtx.closePath();
    knightCtx.stroke();
    
    // Helmet
    knightCtx.fillStyle = colors.armor;
    knightCtx.fillRect(22, 28, 36, 24);
    
    // Helmet top (rounded)
    knightCtx.beginPath();
    knightCtx.arc(40, 28, 18, Math.PI, 0);
    knightCtx.fill();
    
    // Visor (T-shaped) - eyes glow when startled
    if (isStartled) {
        knightCtx.fillStyle = '#ff0000';
        knightCtx.shadowBlur = 20;
        knightCtx.shadowColor = '#ff0000';
    } else {
        knightCtx.fillStyle = colors.visor;
        knightCtx.shadowBlur = 0;
    }
    knightCtx.fillRect(32, 36, 16, 10);
    knightCtx.fillRect(38, 32, 4, 14);
    knightCtx.shadowBlur = 0;
    
    // Helmet details
    knightCtx.strokeStyle = colors.metalDark;
    knightCtx.lineWidth = 2;
    knightCtx.strokeRect(22, 28, 36, 24);
    
    // Plume holder on top
    knightCtx.fillStyle = colors.gold;
    knightCtx.fillRect(38, 12, 4, 8);
    
    // Plume (feather) - stands up when startled
    const plumeAngle = isStartled ? -10 : 0;
    knightCtx.strokeStyle = colors.cape;
    knightCtx.lineWidth = 3;
    knightCtx.beginPath();
    knightCtx.moveTo(40, 12);
    knightCtx.quadraticCurveTo(45 + capeWave + plumeAngle, 6, 48 + capeWave + plumeAngle, 4 - (isStartled ? 5 : 0));
    knightCtx.stroke();
    
    knightCtx.lineWidth = 2;
    knightCtx.beginPath();
    knightCtx.moveTo(40, 12);
    knightCtx.quadraticCurveTo(35 + capeWave - plumeAngle, 8, 32 + capeWave - plumeAngle, 6 - (isStartled ? 5 : 0));
    knightCtx.stroke();
    
    // Sword (right side) - raised when startled
    knightCtx.fillStyle = colors.silver;
    knightCtx.fillRect(64, 42 + armRaise, 3, 30);
    
    // Sword hilt
    knightCtx.fillStyle = colors.gold;
    knightCtx.fillRect(60, 42 + armRaise, 11, 6);
    
    // Sword pommel
    knightCtx.beginPath();
    knightCtx.arc(65.5, 72 + armRaise, 4, 0, Math.PI * 2);
    knightCtx.fill();
    
    // Sword blade shine
    knightCtx.fillStyle = '#ffffff';
    knightCtx.fillRect(64, 44 + armRaise, 1, 24);
    
    knightCtx.shadowBlur = 0;
}

let animationFrame = 0;
let isKnightStartled = false;
let startledTimeout;

// Update knight position based on scroll
function updateKnightPosition() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const maxScroll = window.innerHeight - 150;
    const knightTop = scrollPercent * maxScroll + 50;
    
    scrollKnight.style.top = knightTop + 'px';
    
    // Animate knight walking
    if (!isKnightStartled) {
        animationFrame += 0.2;
        drawScrollKnight(animationFrame, false);
    }
}

// Knight startle animation
function startleKnight() {
    if (isKnightStartled) return;
    
    isKnightStartled = true;
    scrollKnight.classList.add('startled');
    
    // Draw startled state
    let startleFrame = 0;
    const startleInterval = setInterval(() => {
        drawScrollKnight(animationFrame + startleFrame, true);
        startleFrame += 0.5;
        if (startleFrame > 10) {
            clearInterval(startleInterval);
        }
    }, 50);
    
    // Reset after animation
    setTimeout(() => {
        scrollKnight.classList.remove('startled');
        isKnightStartled = false;
        drawScrollKnight(animationFrame, false);
    }, 500);
}

// Click handler for knight
scrollKnight.addEventListener('click', (e) => {
    e.stopPropagation();
    startleKnight();
});

// Initial draw
drawScrollKnight(0);
updateKnightPosition();

// Update on scroll
window.addEventListener('scroll', updateKnightPosition);

// Animate knight continuously
setInterval(() => {
    if (!snakeGameActive && !isKnightStartled) {
        animationFrame += 0.1;
        drawScrollKnight(animationFrame, false);
    }
}, 50);

// Disable right-click on entire website
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Dark Souls Endless Runner Game
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Dynamic canvas resize
function resizeGameCanvas() {
    const section = document.getElementById('game');
    const maxWidth = Math.min(section.offsetWidth - 40, 800);
    const aspectRatio = 400 / 800;
    canvas.width = maxWidth;
    canvas.height = maxWidth * aspectRatio;
}

window.addEventListener('resize', resizeGameCanvas);
resizeGameCanvas();

let player = {
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    velocityY: 0,
    jumping: false,
    color: '#fbbf24'
};

let obstacles = [];
let souls = [];
let score = 0;
let gameSpeed = 5;
let gravity = 0.6;
let jumpPower = -12;
let gameRunning = false;
let gameOver = false;
let frameCount = 0;

// Cheat code system
let cheatCodeSequence = [];
const cheatCode = ['h', 'a', 'x'];
let hackingMode = false;
let invincible = false;

// Global cheat code listener
document.addEventListener('keypress', (e) => {
    const key = e.key.toLowerCase();
    if (/[a-z]/.test(key)) {
        cheatCodeSequence.push(key);
        console.log('Cheat sequence:', cheatCodeSequence.join(''));
        
        if (cheatCodeSequence.length > 3) {
            cheatCodeSequence.shift();
        }
        
        if (cheatCodeSequence.join('') === cheatCode.join('')) {
            console.log('Cheat code activated!');
            activateHackingMode();
            cheatCodeSequence = [];
        }
    }
});

function createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    matrixContainer.innerHTML = '';
    
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = (i * 20) + 'px';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = (Math.random() * 2) + 's';
        
        let text = '';
        for (let j = 0; j < 30; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        column.textContent = text;
        
        matrixContainer.appendChild(column);
    }
}

function activateHackingMode() {
    hackingMode = true;
    invincible = true;
    document.body.classList.add('hacking-mode');
    document.getElementById('hackingIndicator').classList.add('active');
    createMatrixRain();
    
    // Auto-deactivate after 30 seconds
    setTimeout(() => {
        deactivateHackingMode();
    }, 30000);
}

function deactivateHackingMode() {
    hackingMode = false;
    invincible = false;
    document.body.classList.remove('hacking-mode');
    document.getElementById('hackingIndicator').classList.remove('active');
    document.getElementById('matrixRain').innerHTML = '';
}

// Function to get current theme colors
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isHacking = hackingMode;
    
    if (isHacking) {
        return {
            bg: '#000000',
            grid: 'rgba(0, 255, 0, 0.2)',
            ground: '#001a00',
            groundGlow: 'rgba(0, 255, 0, 0.5)',
            player: '#00ff00',
            playerBorder: '#00ff00',
            obstacle: '#ff0000',
            obstacleBorder: '#ff0000',
            soul: '#00ffff',
            soulInner: '#00ffff',
            textPrimary: '#00ff00',
            textSecondary: 'rgba(0, 255, 0, 0.8)'
        };
    }
    
    return {
        bg: isDark ? '#0a0a0a' : '#f0f0f0',
        grid: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(37, 99, 235, 0.1)',
        ground: isDark ? '#1a1a1a' : '#cbd5e1',
        groundGlow: isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(37, 99, 235, 0.3)',
        player: isDark ? '#fbbf24' : '#2563eb',
        playerBorder: isDark ? '#fff' : '#1e3a8a',
        obstacle: isDark ? '#8b0000' : '#dc2626',
        obstacleBorder: isDark ? '#ff0000' : '#991b1b',
        soul: isDark ? '#fcd34d' : '#60a5fa',
        soulInner: isDark ? '#fbbf24' : '#3b82f6',
        textPrimary: isDark ? '#fbbf24' : '#2563eb',
        textSecondary: isDark ? 'rgba(251, 191, 36, 0.8)' : 'rgba(37, 99, 235, 0.8)'
    };
}

// Draw Knight (player)
function drawKnight(x, y, width, height, colors) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = colors.player;
    
    // Body (armor)
    ctx.fillStyle = colors.player;
    ctx.fillRect(x + 8, y + 15, 24, 20);
    
    // Head (helmet)
    ctx.fillRect(x + 10, y + 5, 20, 12);
    
    // Helmet visor
    ctx.fillStyle = colors.playerBorder;
    ctx.fillRect(x + 12, y + 8, 16, 6);
    
    // Legs
    ctx.fillStyle = colors.player;
    ctx.fillRect(x + 10, y + 35, 8, 5);
    ctx.fillRect(x + 22, y + 35, 8, 5);
    
    // Shield
    ctx.fillStyle = colors.playerBorder;
    ctx.fillRect(x, y + 18, 8, 12);
    
    // Shield border
    ctx.strokeStyle = colors.player;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y + 18, 8, 12);
    
    // Sword
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(x + 32, y + 10, 3, 15);
    ctx.fillRect(x + 30, y + 10, 7, 3);
    
    ctx.shadowBlur = 0;
}

// Draw Skeleton with Sword (obstacle)
function drawSkeleton(x, y, width, height, colors) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = colors.obstacle;
    
    // Skull
    ctx.fillStyle = colors.obstacle;
    ctx.fillRect(x + 8, y, 14, 12);
    
    // Eyes (dark sockets)
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 10, y + 3, 3, 3);
    ctx.fillRect(x + 17, y + 3, 3, 3);
    
    // Jaw
    ctx.fillStyle = colors.obstacle;
    ctx.fillRect(x + 11, y + 9, 8, 3);
    
    // Ribcage
    ctx.strokeStyle = colors.obstacleBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 14);
    ctx.lineTo(x + 10, y + 25);
    ctx.moveTo(x + 20, y + 14);
    ctx.lineTo(x + 20, y + 25);
    ctx.moveTo(x + 15, y + 14);
    ctx.lineTo(x + 15, y + 25);
    ctx.stroke();
    
    // Spine
    ctx.fillStyle = colors.obstacle;
    ctx.fillRect(x + 13, y + 12, 4, 18);
    
    // Arms holding sword
    ctx.strokeStyle = colors.obstacleBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 15);
    ctx.lineTo(x, y + 20);
    ctx.stroke();
    
    // Sword blade
    ctx.fillStyle = '#808080';
    ctx.fillRect(x - 5, y + 10, 2, 20);
    
    // Sword hilt
    ctx.fillStyle = colors.obstacleBorder;
    ctx.fillRect(x - 6, y + 10, 4, 3);
    
    // Legs
    ctx.strokeStyle = colors.obstacleBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 13, y + 30);
    ctx.lineTo(x + 10, y + height);
    ctx.moveTo(x + 17, y + 30);
    ctx.lineTo(x + 20, y + height);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
}

function startGame() {
    if (!gameRunning && !gameOver) {
        gameRunning = true;
        gameLoop();
    }
    if (gameOver) {
        resetGame();
    }
}

function resetGame() {
    player.y = 300;
    player.velocityY = 0;
    player.jumping = false;
    obstacles = [];
    souls = [];
    score = 0;
    gameSpeed = 5;
    gameOver = false;
    gameRunning = true;
    frameCount = 0;
    gameLoop();
}

function jump() {
    if (!player.jumping && gameRunning && !gameOver) {
        player.velocityY = jumpPower;
        player.jumping = true;
    }
}

canvas.addEventListener('click', () => {
    if (!gameRunning || gameOver) {
        startGame();
    } else {
        jump();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameRunning || gameOver) {
            startGame();
        } else {
            jump();
        }
    }
});

function createObstacle() {
    const height = Math.random() * 60 + 40;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: 30,
        height: height,
        color: '#8b0000'
    });
}

function createSoul() {
    souls.push({
        x: canvas.width,
        y: Math.random() * 150 + 150, // Jumpable height range: 150-300px
        size: 15,
        collected: false,
        opacity: 1,
        pulsePhase: Math.random() * Math.PI * 2
    });
}

function updateGame() {
    frameCount++;

    // Update player
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y >= 300) {
        player.y = 300;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Create obstacles and souls
    if (frameCount % 100 === 0) {
        createObstacle();
    }

    if (frameCount % 150 === 0) {
        createSoul();
    }

    // Update obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed;

        // Collision detection - skip if invincible
        if (!invincible &&
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            gameOver = true;
            gameRunning = false;
        }

        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
        }
    });

    // Update souls
    souls.forEach((soul, index) => {
        soul.x -= gameSpeed;
        soul.pulsePhase += 0.1;

        // Soul collection
        if (!soul.collected &&
            player.x < soul.x + soul.size &&
            player.x + player.width > soul.x &&
            player.y < soul.y + soul.size &&
            player.y + player.height > soul.y
        ) {
            soul.collected = true;
            score++;
            document.getElementById('score').textContent = score;
            
            if (score % 5 === 0) {
                gameSpeed += 0.3;
            }
        }

        if (soul.x + soul.size < 0) {
            souls.splice(index, 1);
        }
    });
}

function drawGame() {
    const colors = getThemeColors();
    
    // Clear canvas with theme background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw ground
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, 340, canvas.width, 60);
    
    // Ground glow effect
    const groundGradient = ctx.createLinearGradient(0, 340, 0, 330);
    groundGradient.addColorStop(0, colors.groundGlow);
    groundGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, 330, canvas.width, 10);

    // Draw knight (player)
    drawKnight(player.x, player.y, player.width, player.height, colors);

    // Draw skeletons (obstacles)
    obstacles.forEach(obs => {
        drawSkeleton(obs.x, obs.y, obs.width, obs.height, colors);
    });

    // Draw souls with pulsing effect
    souls.forEach(soul => {
        if (!soul.collected) {
            const pulse = Math.sin(soul.pulsePhase) * 0.3 + 0.7;
            const size = soul.size * pulse;
            
            ctx.shadowBlur = 30;
            ctx.shadowColor = colors.soul;
            
            ctx.fillStyle = 'rgba(' + (colors.soul === '#fcd34d' ? '252, 211, 77' : '96, 165, 250') + ', ' + (soul.opacity * pulse) + ')';
            ctx.beginPath();
            ctx.arc(soul.x + soul.size/2, soul.y + soul.size/2, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner glow
            ctx.fillStyle = 'rgba(' + (colors.soulInner === '#fbbf24' ? '251, 191, 36' : '59, 130, 246') + ', ' + (soul.opacity * pulse) + ')';
            ctx.beginPath();
            ctx.arc(soul.x + soul.size/2, soul.y + soul.size/2, size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
    });

    // Draw game over with theme colors
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.shadowBlur = 30;
        ctx.shadowColor = colors.textPrimary;
        ctx.fillStyle = colors.textPrimary;
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.shadowBlur = 20;
        ctx.font = '24px Arial';
        ctx.fillStyle = colors.textSecondary;
        ctx.fillText('Souls Collected: ' + score, canvas.width / 2, canvas.height / 2 + 30);
        
        ctx.font = '20px Arial';
        ctx.fillText('Click or Press SPACE to Respawn', canvas.width / 2, canvas.height / 2 + 70);
        ctx.shadowBlur = 0;
    } else if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.shadowBlur = 30;
        ctx.shadowColor = colors.textPrimary;
        ctx.fillStyle = colors.textPrimary;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dark Souls Runner', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.shadowBlur = 20;
        ctx.font = '20px Arial';
        ctx.fillStyle = colors.textSecondary;
        ctx.fillText('Click or Press SPACE to Begin', canvas.width / 2, canvas.height / 2 + 30);
        ctx.shadowBlur = 0;
    }
}

function gameLoop() {
    if (!gameRunning && !gameOver) return;
    
    updateGame();
    drawGame();

    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

drawGame();