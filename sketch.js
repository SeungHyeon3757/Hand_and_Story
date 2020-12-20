var Particles = [];
let hand_l;
let hand_r;
let musX_invert = 0;
let musY_invert = 0;

function preload(){
    hand_l = loadImage('assets/hand_l.png');
    hand_r = loadImage('assets/hand_r.png');
}

function setup(){
    createCanvas(1000, 600);
    var maxP = 150;
    for (var i = 0; i < maxP; i++) {
        var particle = {
            px : random(width),
            py : random(height),
            vx : 0,
            vy : 0,
            ax : 0,
            ay : 0,
            pc : randomColor()
        }
        Particles.push(particle);
    }
    background(0);
    stroke(255, 100);
}

function draw(){
    background(15);
    
    musX_invert = map(mouseX, 0, width, width, 0);
    musY_invert = map(mouseY, 0, height, height, 0);
    image(hand_l, -hand_l.width/3 + musX_invert + 5, -hand_l.height/3 + musY_invert + 5, hand_r.width/3, hand_r.height/3);
    image(hand_r, mouseX, mouseY, hand_r.width/3, hand_r.height/3);

    for (var i = 0; i < Particles.length; i++) {
        show(i);
        update(Particles[i]);
        checkEdges(Particles[i]);
    }
}

function show(index) {
    var p = Particles[index];
    var powerMinDist = pow(120, 2);
    ellipse(p.px, p.py, 5, 5);
    for (var j = index + 1; j < Particles.length; j++) {
        var o = Particles[j];
        var dx = o.px - p.px;
        var dy = o.py - p.py;
        var powerDist =  dx * dx + dy * dy;
        if (powerDist < powerMinDist) {
            var alpha = map(powerDist, 0, powerMinDist, 255, 0);
            stroke(p.pc.r, p.pc.g, p.pc.b, alpha);
			strokeWeight(map(powerDist, 0, powerMinDist, 2, 0));
            line(p.px, p.py, o.px, o.py);
        }
    }
}

function update(p) {
    p.ax = random(-0.1, 0.1);
    p.ay = random(-0.1, 0.1);
    p.vx += p.ax;
    p.vy += p.ay;
    limit(p, 2)
    p.px += p.vx;
    p.py += p.vy;
}

function checkEdges(p){
    if (p.px > width) {
        p.px = width;
        p.vx *= -1;
    } else if (p.px < 0) {
        p.px = 0;
        p.vx *= -1;
    }
    if (p.py > height) {
        p.py = height;
        p.vy *= -1;
    } else if (p.py < 0) {
        p.py = 0;
        p.vy *= -1;
    }
}
function limit(p, limit){
    var powerLimit = pow(limit, 2);
    var powerVel = p.vx * p.vx + p.vy * p.vy;
    if (powerVel > powerLimit){
        var vel = sqrt(powerVel);
        p.vx = (p.vx / vel) * limit;
        p.vy = (p.vy / vel) * limit;
    }
}
function randomColor() {
    return c = {
        r : random(120, 255),
        g : random(120, 255),
        b : random(120, 255)
    }
}