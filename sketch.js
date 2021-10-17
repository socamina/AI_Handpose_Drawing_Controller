let handpose;
let video;
let predictions = [];

function setup() {
  pixelDensity(1);
  createCanvas(640, 480);
  //background(255,100);
  // createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
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

  if(predictions.length > 0){
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
    noStroke();
    fill(255, 0, 0,200);
    //ellipse(x, y, w, [h])
    ellipse(thumbTip[0], thumbTip[1],10,10);
    pop();

    push();
    noStroke();
    fill(255, 153, 0,200);
    ellipse(indexTip[0], indexTip[1],10,10);
    // line(pindexTip[0], pindexTip[1],indexTip[0], indexTip[1]);
    pop();

    push();
    noStroke();
    fill(255, 251, 0,200);
    ellipse(middleFingerTip[0], middleFingerTip[1],10,10);
    pop();
    
    push();
    noStroke();
    fill(60, 255, 0,200);
    ellipse(ringFingerTip[0], ringFingerTip[1],10,10);
    pop();

    push();
    noStroke();
    fill(0, 255, 250,200);
    ellipse(pinkyTip[0], pinkyTip[1],10,10);
    pop();
    

    // push();
    // stroke(255,0,0);
    // strokeWeight(3);
    // line(thumbTip[0], thumbTip[1],indexTip[0], indexTip[1]);
    // pop();
  }


  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   for (let i = 0; i < predictions.length; i += 1) {
//     const prediction = predictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(keypoint[0], keypoint[1], 10, 10);
//       //draws an elllipse at each xy posiition of the landmarks
//     }
//   }
// }
