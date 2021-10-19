let newWidth = 0;
let newHeight = 0;
let ratio = 1;
let handpose = null;
let predictions = [];
let canvas2;

function setup() {
  // pixelDensity(1);
  createCanvas(640, 480);
  canvas2 = createGraphics(640, 480);

  //createCanvas(windowWidth, windowHeight);
  //canvas2 = createGraphics(windowWidth, windowHeight);

  noStroke();
  video = createCapture(VIDEO);
  setTimeout(() => {
    console.log(video.width, video.height); // 640->480
    // Avec les vraies dimensions de la video on peut faire les calculs de redimensionnement
    // On obtiendra un ratio à appliquer à nos points de posehand, car ils sont calculés sur la video non resizée
    newWidth = windowWidth;
    ratio = newWidth / video.width;
    newHeight = video.height * ratio;
  }, 1000);

  // ml5
  handpose = ml5.handpose(video, modelLoaded.bind(this));

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    //console.log(results);
    //objects, annotations, object, thumb
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  image(video, 0, 0, width, height);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  translate(width, 0);
  scale(-1, 1);

  image(video, 0, 0, width, height);
  // background(255,0,0,30);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let thumb = hand.annotations.thumb;
    let index = hand.annotations.indexFinger;
    let middleFinger = hand.annotations.middleFinger;
    let ringFinger = hand.annotations.ringFinger;
    let pinky = hand.annotations.pinky;

    let thumbTip = thumb[3];
    let indexTip = index[3];
    let middleFingerTip = middleFinger[3];
    let ringFingerTip = ringFinger[3];
    let pinkyTip = pinky[3];

    push();
    canvas2.noStroke();
    canvas2.fill(255, 0, 0, 200);
    canvas2.ellipse(thumbTip[0], thumbTip[1], 10, 10);
    pop();

    push();
    canvas2.noStroke();
    canvas2.fill(255, 153, 0, 200);
    canvas2.ellipse(indexTip[0], indexTip[1], 10, 10);
    pop();

    push();
    canvas2.noStroke();
    canvas2.fill(255, 251, 0, 200);
    canvas2.ellipse(middleFingerTip[0], middleFingerTip[1], 10, 10);
    pop();

    push();
    canvas2.noStroke();
    canvas2.fill(60, 255, 0, 200);
    canvas2.ellipse(ringFingerTip[0], ringFingerTip[1], 10, 10);
    pop();

    push();
    canvas2.noStroke();
    canvas2.fill(0, 255, 250, 200);
    canvas2.ellipse(pinkyTip[0], pinkyTip[1], 10, 10);
    pop();
    // push();
    // stroke(255,0,0);
    // strokeWeight(3);
    // line(thumbTip[0], thumbTip[1],indexTip[0], indexTip[1]);
    // pop();
  }

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  image(canvas2, 0, 0, windowWidth/2, windowHeight/2);
}

//A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   for (let i = 0; i < predictions.length; i += 1) {
//     const prediction = predictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(keypoint[0], keypoint[1], 10, 10);
//       //draws an elllipse at each xy posiition of the landmarks
// const keypoint = prediction.landmarks[j];
//       //on dessine les points, en n'oubliant pas qu'on a aggrandit l'affichage.
//       circle(keypoint[0] * ratio, keypoint[1] * ratio, 10);
//     }
//   }
// }

function modelLoaded() {
  handpose.on("predict", (results) => {
    predictions = results;
  });
}
