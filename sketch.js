let timer = 10;
let interval;
let resubscribeButton;
let cancelButton;
let circlesToDraw = 0;
let blink = false;
let comicFont;

function preload() {
  // Load the Comic Sans font
  comicFont = 'Comic Sans MS';
}

function setup() {
  createCanvas(1920, 1080);

  // Create Resubscribe Button
  resubscribeButton = createButton('Resubscribe');
  resubscribeButton.position(width / 2 - 50, height / 2 - 25);
  resubscribeButton.size(100, 50);
  resubscribeButton.style('font-family', comicFont);  // Set font family

  // Create Cancel Subscription Button
  cancelButton = createButton('Cancel subscription');
  cancelButton.position(10, height - 40);  // Adjust position to accommodate new size
  cancelButton.size(150, 30);  // Increased size
  cancelButton.style('opacity', '0.4');
  cancelButton.style('font-family', comicFont);  // Set font family

  // Add mousePressed event to cancelButton
  cancelButton.mousePressed(() => {
    if (timer <= -10) {
      window.location.href = "https://jbaranczuk123.github.io/wielepytan/";
    }
  });

  // Start the timer
  interval = setInterval(updateTimer, 1000);
}

function draw() {
  // Blink the screen red and yellow if timer is less than or equal to -10
  if (timer <= -10) {
    if (frameCount % 30 < 15) {
      background(135, 55, 255);  // Fioletowy background
    } else {
      background(255);  // default background
    }
  } else {
    background(255);

    // Draw the circle if timer is above zero
    if (timer > 0) {
      drawOfferCircle(width / 2 + 200, height / 2 - 60, 170);
    } else {
      // Increment the number of circles to draw over time
      if (frameCount % 10 == 0) {
        circlesToDraw++;
      }

      let drawnCircles = 0;
      for (let x = 0; x < width; x += 200) {
        for (let y = 0; y < height; y += 200) {
          if (drawnCircles >= circlesToDraw) {
            break;
          }
          // Skip the area around the cancel button
          if (x > 10 && x < 160 && y > height - 80 && y < height) {
            continue;
          }
          drawOfferCircle(x, y, 170);
          drawnCircles++;
        }
        if (drawnCircles >= circlesToDraw) {
          break;
        }
      }

      // Make the cancel button more visible
      cancelButton.style('opacity', '0.4');
      cancelButton.style('background-color', 'white');
      cancelButton.style('color', 'black');
      cancelButton.style('font-weight', 'bold');
    }

    // Change button color when timer is 5 or less
    if (timer > 0 && timer <= 5) {
      if (frameCount % 30 < 15) {
        resubscribeButton.style('background-color', 'red');
      } else {
        resubscribeButton.style('background-color', '');
      }
    } else if (timer <= 0) {
      if (frameCount % 30 < 15) {
        resubscribeButton.style('background-color', 'yellow');
      } else {
        resubscribeButton.style('background-color', '');
      }
    }
  }

  // Draw the timer text last to ensure it is not covered
  textSize(32);
  textFont(comicFont)
  fill(0);
  textAlign(CENTER, CENTER);
  text(timer, width / 2, height / 2 - 60);

  // Ensure buttons are always visible
  drawButtons();
}

function updateTimer() {
  timer--;
}

function drawOfferCircle(x, y, diameter) {
  fill(135, 55, 255);  // fioletowy color with transparency
  ellipse(x, y, diameter, diameter);

  // Draw the text inside the circle
  textSize(16);
  textFont(comicFont)
  fill(255);
  textAlign(CENTER, CENTER);
  text("Limited time offer\n-50% for your plan!!!", x, y);
}

function drawButtons() {
  // Draw the Resubscribe button
  resubscribeButton.position(width / 2 - 50, height / 2 - 25);

  // Draw the Cancel Subscription button
  cancelButton.position(10, height - 40);
}
