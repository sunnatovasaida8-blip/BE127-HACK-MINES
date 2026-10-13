// Sahifa ochilganda oldin kiritilganligini tekshirish
window.onload = function() {
    if(localStorage.getItem('be127_vip_active') === 'true') {
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
    }
}

// VIP kodni tekshirish funksiyasi (Siz beradigan maxfiy kod: BE127VIP)
function verifyCode() {
    const inputCode = document.getElementById('vipCodeInput').value.trim();
    const validCodes = ['BE127VIP', 'THEEAGLE25', 'VIP127']; // O'zingiz xohlagan kodlarni qo'shishingiz mumkin

    if(validCodes.includes(inputCode)) {
        localStorage.setItem('be127_vip_active', 'true');
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
    } else {
        document.getElementById('errorMsg').innerText = "Noto'g'ri kod! Admin bilan bog'laning.";
    }
}

let selectedMines = 1;
function setMines(count) {
    selectedMines = count;
    document.querySelectorAll('.mine-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

const gridContainer = document.getElementById('minesGrid');
function createGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        gridContainer.appendChild(cell);
    }
}
createGrid();

function getSignal() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(c => {
        c.classList.remove('gem');
        c.innerHTML = '';
    });

    let gemCount = selectedMines <= 3 ? 5 : 4;
    let selectedIndices = [];
    while(selectedIndices.length < gemCount) {
        let randomIndex = Math.floor(Math.random() * 25);
        if(!selectedIndices.includes(randomIndex)) selectedIndices.push(randomIndex);
    }

    selectedIndices.forEach((index, i) => {
        setTimeout(() => {
            let cell = cells[index];
            cell.classList.add('gem');
            cell.innerHTML = '💎';
        }, i * 150);
    });

    let randomAcc = (98 + Math.random() * 1.8).toFixed(1);
    document.getElementById('accuracy').innerText = randomAcc + '%';
}
