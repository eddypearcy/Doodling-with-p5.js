///////////////////////////////////////////////////
// Author : Eddy Pearcy                          //
// Date   : 03-05-2020                           //
//                                               //
// Fire-like animation using p5.js and particles //
//                                               //
// Follow me:                                    //
//     - Twitter  : @eddy_pearcy                 //
//     - Facebook : @EddyPearcy42                // 
///////////////////////////////////////////////////



let n_particles = 400;
let particles = Array(n_particles);
let ax_range = [0.01, 0.1];
let ay_range = [-0.01, -0.08];
let max_age_range = [20, 200];
let xpos_noise = 50;
let ypos_noise = 20;
let wind_slider;


function setup() {
    // Setting the color mode to HSB, using values from 0 to 100 (HSB is easier for fire colors)
    colorMode(HSB, 100);

    createCanvas(windowWidth, windowHeight);
    background(0);

    // Slider only takes integers!
    wind_slider = createSlider(-15, 15, 0);
    wind_slider.position(windowWidth - 858, windowHeight - 100);
    wind_slider.style("width", "200px");

    // Write text
    stroke(255);
    fill(255);
    strokeWeight(1);
    textSize(35);
    text("Wind", windowWidth - 807, windowHeight - 50);

    for(let i = 0; i < n_particles; i++) {
        let x_noise = random(-xpos_noise, xpos_noise);
        let y_noise = random(-ypos_noise, ypos_noise);
        // let ax = random(ax_range[0], ax_range[1]);
        let ax = wind_slider.value() / 100;
        let ay = random(ay_range[0], ay_range[1]);
        let max_age = random(max_age_range[0], max_age_range[1]);
        particles[i] = new Particle(width * 0.5 + x_noise, height * 0.8 + y_noise, 0, 0, ax, ay, 8, 0.995, max_age, 5, 100, 100, 17, 100, 100, 0.999);
    }
}

function draw() {
    background(0);
    for(let i = 0; i < n_particles; i++) {
        if(particles[i].age > particles[i].max_age || particles[i].y < 0) {
            let x_noise = random(-xpos_noise, xpos_noise);
            let y_noise = random(-ypos_noise, ypos_noise);
            // let ax = random(ax_range[0], ax_range[1]);
            let ax = wind_slider.value() / 100;
            let ay = random(ay_range[0], ay_range[1]);
            let max_age = random(max_age_range[0], max_age_range[1]);
            particles[i] = new Particle(width * 0.5 + x_noise, height * 0.8 + y_noise, 0, 0, ax, ay, 8, 0.995, max_age, 5, 100, 100, 17, 100, 100, 0.999);
        }
        particles[i].update();
        particles[i].draw();
    }

    stroke(255);
    fill(255);
    strokeWeight(1);
    textSize(35);
    text("Wind", windowWidth - 807, windowHeight - 50);
}


class Particle {
    constructor(x, y, vx, vy, ax, ay, radius, radius_decay, max_age,
                init_h, init_s, init_b, final_h, final_s, final_b) {
        // Position, speed, acceleration and radius
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.radius = radius;

        // HSB color () and alpha (0 to 100 values)
        this.init_h = init_h;
        this.init_s = init_s;
        this.init_b = init_b;
        this.final_h = final_h;
        this.final_s = final_s;
        this.final_b = final_b;
        this.h = init_h;
        this.s = init_s;
        this.b = init_b;
        this.alpha = 100;

        // Coefficient of decay
        this.radius_decay = radius_decay;

        // Age of the particle
        this.age = 0;
        this.max_age = max_age;
    }

    update() {
        // Updating age and colors
        this.h = map(this.age, 0, this.max_age, this.init_h, this.final_h);
        this.s = map(this.age, 0, this.max_age, this.init_s, this.final_s);
        this.b = map(this.age, 0, this.max_age, this.init_b, this.final_b);
        this.alpha = map(this.age, 0, this.max_age, 80, 0);
        this.age += 1;

        // Updating speed and position
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        // Applying decays
        this.radius *= this.radius_decay;
    }

    draw() {
        if(this.age <= this.max_age) {
            noStroke();
            fill(this.h, this.s, this.b, this.alpha);
            ellipse(this.x, this.y, 2 * this.radius);
        }
    }
}
