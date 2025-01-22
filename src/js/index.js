function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBoxShadows(n) {
    let boxShadows = [];
    for (let i = 0; i < n; i++) {
        boxShadows.push(`${random(0, 2000)}px ${random(0, 2000)}px #FFF`);
    }
    return boxShadows.join(', ');
}

window.onload = function () {
    document.getElementById('stars').style.boxShadow = generateBoxShadows(700);
    document.getElementById('stars2').style.boxShadow = generateBoxShadows(200);
    document.getElementById('stars3').style.boxShadow = generateBoxShadows(100);

    const style = document.createElement('style');
    style.textContent = `
        #stars:after { box-shadow: ${document.getElementById('stars').style.boxShadow}; }
        #stars2:after { box-shadow: ${document.getElementById('stars2').style.boxShadow}; }
        #stars3:after { box-shadow: ${document.getElementById('stars3').style.boxShadow}; }
    `;
    document.head.appendChild(style);
    const imgs = document.querySelectorAll('.back img');

    imgs.forEach(img => {
        img.addEventListener('mousemove', e => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - 0.5) * 60;
            const rotateX = (y / rect.height - 0.5) * -60;

            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(2)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};
