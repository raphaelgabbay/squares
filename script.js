let time = 0;
var i
  , j
  , squaresArray = [];
let paused = false;
let nbSquares = 20;
let prevMouseY = 0;
let spinCount = 0;
let constantSpeed = 0;
let moreRotation = 0;
let halfTurn = false;
let lockedMovement = false;
let anglePoint = 0;
let pointerX = 0;
let pointerY = 0;


//TODO Add dat.gui interface

function setup() {
    //frameRate(10);
    //fullscreen();
    createCanvas(windowWidth, windowHeight);
    // noFill();
    stroke(255);
    // fill(255);
    fill(0,0);
    angleMode(DEGREES);
    rectMode('center');

    let pointerX = windowWidth / 2;
    let pointerY = windowHeight / 2;

    //Initialize squaresArray
    for(let i = 0; i * 100 <= width + 100; i++) {
        for(let j = 0; j * 100 <= height + 100; j++) {
            if (!squaresArray[i]) squaresArray[i] = [];
            squaresArray[i][j] = new MySquare(0, 0, i * 120 , j * 120);
        }    
    }    
}

function draw() {    
    if(!paused) {
        time++;
        background(0,40);

        pointerX = lerp(pointerX, mouseX, 0.05);
        pointerY = lerp(pointerY, mouseY, 0.05);
        // squaresArray.forEach(MySquare => {
        //     MySquare.display();
        // });
        
        for (let i = squaresArray.length - 1; i >= 0; i--) {
            for (let j = 0; j < squaresArray[0].length; j++) {
                squaresArray[i][j].display();
                squaresArray[i][j].update();
            }
            // squaresArray[i].display();
            
        }
        
  
        // if(lockedMovement) {

        //     //Update first square angle
        //     squaresArray[0].angle = lerp(squaresArray[0].angle, anglePoint, 0.25);
        //     //Update other squares angle  
        //     for(let i = 1; i < nbSquares; i++) {            
        //         squaresArray[i].angle = lerp(squaresArray[i].angle, squaresArray[i-1].angle, 0.25);        
        //     }
            
            
        //     // Check if mouse makes more than a full turn around center of 1st square
        //     if(mouseX < squaresArray[0].x) {
        //         if (prevMouseY < squaresArray[0].y && mouseY > squaresArray[0].y) {
        //             spinCount--;
        //         } else if (prevMouseY > squaresArray[0].y && mouseY < squaresArray[0].y) {
        //             spinCount++;
        //         }
        //     }
        //     anglePoint = 360*spinCount + atan2(mouseY - squaresArray[0].y, mouseX - squaresArray[0].x)+90;

        // } else { //If !lockedMovement

        //     //Update first square angle && position
        //     squaresArray[0].angle = lerp(squaresArray[0].angle, anglePoint, 0.25);
        //     squaresArray[0].x = lerp(squaresArray[0].x, mouseX, 0.25);
        //     squaresArray[0].y = lerp(squaresArray[0].y, mouseY, 0.25);

        //     //Update other squares angle && position
        //     for(let i = 1; i < nbSquares; i++) {            
        //         squaresArray[i].angle = lerp(squaresArray[i].angle, squaresArray[i-1].angle, 0.25);
        //         squaresArray[i].x = lerp(squaresArray[i].x, squaresArray[i-1].x, 0.15);
        //         squaresArray[i].y = lerp(squaresArray[i].y, squaresArray[i-1].y, 0.15);            
        //     }

        //     // Check if mouse makes more than a full turn around center of window
        //     if(mouseX < windowWidth/2) {
        //         if (prevMouseY < windowHeight/2 && mouseY > windowHeight/2) {
        //             spinCount--;
        //         } else if (prevMouseY > windowHeight/2 && mouseY < windowHeight/2) {
        //             spinCount++;
        //         }
        //     }
        //     anglePoint = 360*spinCount + atan2(mouseY - height / 2, mouseX - width / 2)+90;
        // }

        // prevMouseY = mouseY;
        // moreRotation += constantSpeed;
        // anglePoint += moreRotation;
        
        // if(halfTurn) {
        //     halfTurn = false;
        //     spinCount = random(-2, 2);
        // }
    }
}

class MySquare {
    constructor(size, angle, x, y) {
        this.size = size;
        this.angle = angle;
        this.x = x;
        this.y = y;
    }

    display() {
        this.angle += time * (80 - (dist(pointerX, pointerY, this.x, this.y)) * (100 / sqrt(width ** 2 + (length ** 2)))) * 0.01;
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        // If mouse is over, white fill
        rect(0, 0, this.size, this.size);
        // if (dist(mouseX, mouseY, this.x, this.y) < this.size) {
        //     fill(255);
        //     ellipse(0, 0, this.size);
        //     fill(0)
        // }
        pop();
            
    }

    update() {
        // this.size = (1/dist(mouseX, mouseY, this.x, this.y)) * 100;
        // this.size = 100 - (dist(mouseX, mouseY, this.x, this.y));
        
        // this.angle = 80 - (dist(pointerX, pointerY, this.x, this.y)) * (100 / sqrt(width ** 2 + (length ** 2)));
        this.angle = 80 - (dist(pointerX, pointerY, this.x, this.y));
        this.size = 80 - (dist(pointerX, pointerY, this.x, this.y)) * (100 / sqrt(width ** 2 + (length ** 2)));
        // this.size = lerp(this.size, this.size += random(-10, 10), 0.2);
        // this.size += random(0, 10);
        if (this.size <= 0) this.size = 1;
    }
}

// function keyPressed() {
//     if (key === 'r') {
//         setup();
//     } else if (key === 'p') {
//         paused = !paused;
//     } else if (keyCode === UP_ARROW) {
//         halfTurn = true;        
//         arrowMode = false;
//         //constantSpeed = 0;
//     } else if (keyCode === LEFT_ARROW) {
//         constantSpeed -= 0.5;
//         // arrowMode = true;
//     } else if (keyCode === RIGHT_ARROW) {
//         constantSpeed += 0.5;
//         // arrowMode = true;
//     } else if (key === '0') {
//         constantSpeed = 0;
//         moreRotation = 0;
//     }
// }

// function mouseMoved() {
//     arrowMode = false;
//     constantSpeed = 0;
// }
// function mouseClicked() {
//     lockedMovement = !lockedMovement;
// }
