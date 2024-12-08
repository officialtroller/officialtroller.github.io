(function () {
    // Initialize variables
    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main initialization
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // Create points
        points = [];
        for (let x = 0; x < width; x = x + width / 20) {
            for (let y = 0; y < height; y = y + height / 20) {
                let px = x + Math.random() * width / 20;
                let py = y + Math.random() * height / 20;
                points.push({
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                });
            }
        }

        // Add closest points for each point
        for (let i = 0; i < points.length; i++) {
            let closest = [];
            let p1 = points[i];
            for (let j = 0; j < points.length; j++) {
                let p2 = points[j];
                if (p1 !== p2) {
                    let placed = false;
                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] === undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // Assign a circle to each point
        for (let i in points) {
            let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        let posx = 0, posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        animateHeader = (document.body.scrollTop <= height);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function initAnimation() {
        animate();
        points.forEach(point => {
            shiftPoint(point);
        });
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            points.forEach(point => {
                // detect points in range
                if (Math.abs(getDistance(target, point)) < 4000) {
                    point.active = 0.3;
                    point.circle.active = 0.6;
                } else if (Math.abs(getDistance(target, point)) < 20000) {
                    point.active = 0.1;
                    point.circle.active = 0.3;
                } else if (Math.abs(getDistance(target, point)) < 40000) {
                    point.active = 0.02;
                    point.circle.active = 0.1;
                } else {
                    point.active = 0;
                    point.circle.active = 0;
                }

                drawLines(point);
                point.circle.draw();
            });
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        gsap.to(p, {
            duration: 1 + Math.random(),
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: "circ.inOut",
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }

    function drawLines(p) {
        if (!p.active) return;
        p.closest.forEach(closest => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(closest.x, closest.y);
            ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
            ctx.stroke();
        });
    }

    function Circle(pos, rad, color) {
        this.pos = pos || null;
        this.radius = rad || null;
        this.color = color || null;

        this.draw = function () {
            if (!this.active) return;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
            ctx.fill();
        };
    }

    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    
    if (/(ipad|iphone|ipod|android)/gi.test(navigator.userAgent)) {
        window.location.href = "/phone.html";
    }

})();
