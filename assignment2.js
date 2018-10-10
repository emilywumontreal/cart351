function setup() {
createCanvas(innerWidth/2, innerHeight/2);
capture = createCapture(VIDEO);
capture.size(innerWidth/2, innerHeight/2);
//capture.hide();
}

function draw() {
//background(0);
image(capture, 0,0, capture.width, capture.height);
//console.log(capture.width);
//filter('INVERT');

background(200);
stroke('red');
fill(125,0,0,20);
capture.loadPixels();
//loadPixels();

//console.log(videoPixels);

let brightRec = 0;
let redDetect = 0;
let targetX;
let targetY;
let redX = 0;
let redY= 0;
let index = 0;
//console.log(videoPixels.size);
let r;
let g;
let b;
for(let y = 0; y< capture.height; y++) {
  for (let x = 0; x< capture.width; x++) {

  index = (y*capture.width+x)*4;
   //console.log('index=' +index);

   // let pixelColor = capture.get(index);
    //console.console.log("pixelbrightness = "+pixelBrightness);
    r = capture.pixels[index+0];
    b = capture.pixels[index+1];
    g = capture.pixels[index+2];

//get the brightest pixel and its coordiate targetX, targetY
    myBrightness =constrain((r+g+b)/3,0,255);
    if (myBrightness > brightRec)
    {
      brightRec = myBrightness;
      targetX = x;
      targetY = y;
    }
//get the redest pixel and its coordiate redX, redY
    if (redDetect < r || b<50||g<50)
    {
      if (r > 200)
      {
        redDetect = r;
        redY = y;
        redX = x;
        fill(r,g,b);
        rect(redX,redY,5,5);
      }
    }

  }
}
//draw redest circle
//if !(reddetect<160)

stroke(255,255,255);
ellipse(redX,redY,10,10);

canvas.addEventListener('mousedown', (event) => {
   console.log('canvas mousedown');
  /* for (let i =0; i< myEllipses.length;i++){
     // test if is over an ellipse
     myEllipses[i].hitTestDown(event);
   }*/

});

//draw brightest rectangle
//fill(0,0,255);
//rect(targetX, targetY, 10,10);
//console.log(redX,redY);
capture.updatePixels();
//console.log("brightREC=  "+brightRec+ " x ="+targetX +" y= "+targetY);

//call function from Sanjaya to pass the location of the brightest pixel

}

function getRedest() {

}
function getBrightest() {

}
