// Change this to the domain name of your Heroku server
const SERVER_URL = 'wss://lit-citadel-05208.herokuapp.com'

let x, y, b;
const socket = new osc.WebSocketPort({ url: SERVER_URL });

// Keep the connection alive
socket.on('close', () => {
  socket.open();
});

socket.on('error', (e) => {
  console.error('WebSocket error', e);
});

socket.on('message', (data) => {
  console.log(data);
  if (data.address === '/3/xy') {
    x = data.args[0] * width;
    y = data.args[1] * height;
  } else if (data.address === '/3/toggle1') {
    b = data.args[0];
  }
});

socket.open();

// Simple Particle System
//Ml5.js


let ps;

//set up ml5
let video;
let poseNet;
let pose;


function setup() {
  
  createCanvas(640,520);
  colorMode(HSB);


  // initiate particle system
  ps = new ParticleSystem(createVector(width / 2, 50));

  //ml5 video
  video = createCapture(VIDEO);
  video.hide(0);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
}

function draw() {
  //background(250);
  image(video,0,0);
  //filter(INVERT);
 
  
  if (pose){
  // Option #1 (move the Particle System origin)
  ps.origin.set((width-pose.nose.x), pose.nose.y, 0);
  ps.addParticle();
  ps.run();
 
}
}
/////////// P5JS Sketch ///////////

// function setup() {
//   frameRate(60);
//   createCanvas(1024, 768);
//   // Starts in the middle
//   x = width / 2;
//   y = height / 2;
// }

// function draw() {
//   background(150);
//   textSize(32);
//   fill(50);
//   text(x, 0, 32);
//   text(y, 0, 64);

//   if (b) {
//     fill('red');
//   }

//   // Draw a circle
//   stroke(50);
//   ellipse(x, y, 50, 50);
// }

// function mouseClicked() {
//   // Do the same think whether clicked or dragged
//   mouseDragged();
// }

///////////////////////////////////////////

// Simple Particle System

//Ml5.js
let ps;

//set up ml5
let video;
let poseNet;
let pose;

function setup() {
  createCanvas(1024,768);
  colorMode(HSB);


  // initiate particle system
  ps = new ParticleSystem(createVector(width / 2, 50));

  //ml5 video
  video = createCapture(VIDEO);
  //video.hide(0);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
}

function draw() {
  background(250);
  image(video,0,0);
  //filter(INVERT);
 
  
  if (pose){
  // Option #1 (move the Particle System origin)
  ps.origin.set((width-pose.nose.x), pose.nose.y, 0);
  ps.addParticle();
  ps.run();
 
}
}



/////////// P5JS Sketch ///////////

function mouseDragged() {
  const newX = constrain(mouseX / width, 0, 1);
  const newY = constrain(mouseY / height, 0, 1);
  socket.send({ address: '/3/xy', args: [newX, newY] })
}
