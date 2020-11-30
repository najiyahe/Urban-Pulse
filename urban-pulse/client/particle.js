//Particle Class
class Particle {

  constructor(x, y) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = createVector(x, y);
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.diameter = random(1, 10);
    this.lifespan -= 1.5;
  }

  // Method to display
  display() {
    //color interpolate
    colorMode(HSB);
var colorFrom = color(255,10,10);
var colorTo = color(random(5, 255), 255, 255);
  var interpValue = map(mouseX, 0, mouseY, 0.0, 10);
  var colorHue = lerpColor(colorFrom, colorTo, interpValue*100);
    stroke(0, this.lifespan);
    strokeWeight(0);
    fill(colorHue, this.lifespan);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }

    
  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

//PARTICLE SYSTEM

class ParticleSystem {

  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Particle(x, y));
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}