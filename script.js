//Things to keep in mind:
// the draw function executes everything about 60 times per second, it can be helpful to think of this as like a for loop printing everything in the draw function executes 60 times per second; to stop the draw you can use noLoop(); or change the frame rate to faster or slower
//Other helpful tips:
//you can use console.log(); to check whether a function is being excecuted or reached during the process of making your game
//try to keep your draw function as simple as possible by creating a method that does or displays just one thing
im making changes hehehe

let WIDTH = window.innerWidth-25;
let HEIGHT = window.innerHeight-25;
let ww4 = WIDTH/4;
let wh = HEIGHT;
let livesNum = 100;
let levelNum = 0;
let goodColor = ('#7B9E87');
let badColor = ('#BC2C1A');
let startGame = false;
let mouseReleasedOnLast = false;

function preload() {
  //loads the sound
    soundFormats('mp3', 'ogg');
    badSound = loadSound("beep-02.mp3");
}

function setup() {
  //creates the canvas
  createCanvas(WIDTH, HEIGHT);
  background('#193E61');
  starPosLimits();
}

function draw() {
  //calls all functions relating to gameplay
  newConstellation();
  backgroundScore();
  displayLivesAndLevels();
  restartButton();
  mainMenuButton();
  start();
  play();
}

function start() {
  //indicates the first star has been pressed
  if((mouseX > rx-10 && mouseX < rx+10) && (mouseIsPressed)){
    startGame = true;
  }
}

function play() {
  //checks each segement after the game has been started
    if (startGame){
    checkMouseSegmentOne();
    checkMouseSegmentTwo();
    checkMouseSegmentThree();
  }
}

function checkMouseSegmentOne() {
  //checks if the mouse is clicked in a valid position for the first line segement
  let mouseLocation = ((ry1-ry)/(rx1-rx))*(mouseX-rx1)+ry1;
  let Ymin = mouseLocation-10;
  let Ymax = mouseLocation+10;
  frameRate(100);
  noStroke();
  circle(mouseX, mouseY, 20);
  if ((mouseX > rx) && (mouseX < rx1)) {
    if ((mouseY > Ymin) && (mouseY < Ymax)) {
      fill(goodColor);
      noStroke();
      circle(mouseX, mouseY, 20);
    } else {
      if (badSound.isLoaded()){
          //badSound.setVolume(0.2);
          //badSound.play();
      }
      livesNum--;
      fill(badColor);
      noStroke();
      circle(mouseX, mouseY, 20);
      if (livesNum == 0) {
        lose();
      }
    }
  } 
}

function checkMouseSegmentTwo() {
  //checks if the mouse is clicked in a valid position for the second line segment
  mouseLocation2 = ((ry2-ry1)/(rx2-rx1))*(mouseX-rx2)+ry2;
  let Y1min = mouseLocation2-10;
  let Y1max = mouseLocation2+10;
  if ((mouseX > rx1) && (mouseX < rx2)) {
    if ((mouseY > Y1min) && (mouseY < Y1max)) {
      fill(goodColor);
      noStroke();
      circle(mouseX, mouseY, 20);
      } else {
        if (badSound.isLoaded()){
          //badSound.setVolume(0.2);
          //badSound.play();
        }
        livesNum--;
        fill(badColor);
        noStroke();
        circle(mouseX, mouseY, 20);
        if (livesNum == 0) {
          lose();
        }
      }
  }
}

function checkMouseSegmentThree() {
  //checks if the mouse is in a valid position for the thid line segement
  let mouseLocation3 = ((ry3-ry2)/(rx3-rx2))*(mouseX-rx3)+ry3;
  let Y3min = mouseLocation3-10;
  let Y3max = mouseLocation3+10;
    if ((mouseX > rx2) && (mouseX < rx3)) {
    if ((mouseY > Y3min) && (mouseY < Y3max)) {
      fill(goodColor);
      noStroke();
      circle(mouseX, mouseY, 20);
      } else {
        if (badSound.isLoaded()){
          //badSound.setVolume(0.2);
          //badSound.play();
        }
        livesNum--;
        fill(badColor);
        noStroke();
        circle(mouseX, mouseY, 20);
        if (livesNum == 0) {
          lose();
        }
      }
    }
  nextLevel();
}

function nextLevel() {
  //if the last star is reached it will create a new constellation and increase the level
  X3min = rx3-10;
  X3max = rx3+10;
  Y3min = rx3-10;
  Y3max = rx3+10;
  if ((mouseX > X3min) && (mouseX < X3max) && (mouseIsPressed == false)) {
  startGame = false;
  background('#193E61');
  starPosLimits();
  newConstellation();
  frameRate(1);
  levelNum++;
  frameRate(60);
  }
}

function lose() {
  //displays the losing screen
  fill('#CDE6F5');
  stroke('#D295BF');
  startGame = false;
  textSize(30);
  text("you lose", (WIDTH/2)-50, HEIGHT/2);
}


function starPosLimits() {
  //creates the random(ish) coordinates (rx, ry) for each star position; the stars will     not appear over the buttons, lives, or level text
  rx = 50;
  ry = random(75, wh-50);
  rx1 = random(ww4, ww4+ww4);
  ry1 = random(75, wh-50);
  rx2 = random(ww4+ww4, ww4+ww4+ww4);
  ry2 = random(75, wh-50);
  rx3 = WIDTH-70;
  ry3 = random(75, wh-150);
}

function star(x, y, radius1, radius2, npoints) {
  //specifications of the star shape, from https://p5js.org/examples/form-star.html?msclkid=3b8e0c30b07711eca714c2e183bbec36  
 let angle = TWO_PI / npoints;
 let halfAngle = angle / 2.0;
 beginShape();
 for (let a = 0; a < TWO_PI; a += angle) {
   let sx = x + cos(a) * radius2;
   let sy = y + sin(a) * radius2;
   vertex(sx, sy);
   sx = (x + cos(a + halfAngle) * radius1);
   sy = y + sin(a + halfAngle) * radius1;
   vertex(sx, sy);
 }
 fill('#CDE6F5');
 endShape(CLOSE);
}

function createStars() {
  //creates the stars at specific coordinates on the screen
  stroke('#D295BF');
  star(rx, ry, 30, 20, 5);
  star(rx1, ry1, 30, 20, 5);
  star(rx2, ry2, 30, 20, 5);
  star(rx3, ry3, 30, 20, 5);
}

function lines() {
  //creates the lines that connect the stars 
  stroke('#FFBA08');
  strokeWeight(5);
  line(rx, ry, rx1, ry1);
  line(rx1, ry1, rx2, ry2);
  line(rx2, ry2, rx3, ry3);
}

function newConstellation() {
  //creates a new constellation
  lines();
  createStars();
}

function displayLivesAndLevels() {
  //displays the text that shows number of lives and levels
  textSize(30);
  fill('#CDE6F5');
  stroke('#D295BF');
  strokeWeight(5);
  text('LIVES: '+ livesNum + ' LEVEL: ' + levelNum, 10, 30);
}

function restartButton() {
  //creates the main menu button and checks if the button is pressed
  //note: I created a transparent button over the restart 'rectangle' and text box to       make the button more aesthetically pleasing
  let rbColor = color(255, 255, 255);
  noStroke();
  rbColor.setAlpha(0); //used to make the button transparent
  rb = createButton('');
  rb.position(WIDTH-125, HEIGHT-115);
  rb.mousePressed(restart);
  rb.style('background-color', rbColor);
  rb.size(130, 60);
  //the rectangle and textbox for restart
  stroke('#FFBA08'); 
  fill('#CDE6F5');
  strokeWeight(4);
  rect(WIDTH-130, HEIGHT-120, 120, 50);
  fill('#CDE6F5');
  stroke('#D295BF');
  textSize(20);
  text('restart', WIDTH-100, HEIGHT-90);
}

function restart() {
  //creates a new background and constellation
  //resets the lives, levels, and sets startGame to false
  livesNum = 100;
  levelNum = 0;
  startGame = false;
  console.log('hi');
  background('#193E61');
  starPosLimits();
  newConstellation();
}

function mainMenuButton() {
  //creates the main menu button and checks if the button is pressed
  stroke('#FFBA08'); 
  strokeWeight(4);
  rect(WIDTH-130, HEIGHT-60, 120, 50);
  fill('#CDE6F5');
  stroke('#D295BF');
  textSize(20);
  text('main menu', WIDTH-120, HEIGHT-30);  
}

function backgroundScore() {
  //a box behind the score box so that each score does not display over itself
   noStroke();
   beginShape();
    vertex(5, 5);
    vertex(330, 5);
    vertex(330, 35);
    vertex(5, 35);
   fill('#193e61');
   endShape(CLOSE);
}