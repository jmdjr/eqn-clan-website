﻿
// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / targetFPS);
            };
})();

// Create an array to store our particles
var particles = [];

// The amount of particles to render
var particleCount = 200;

// The maximum velocity in each direction
var maxVelocity = 2;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

// Set the dimensions of the canvas as variables so they can be used.
var canvasWidth = 1228;
var canvasHeight = 1000;

// Create an image object (only need one instance)
var imageObj = new Image();

var mousePos = null;
var clearWidth = 900;
var clearHeight = 900;
var clearFactor = 3;

// Once the image has been downloaded then set the image on all of the particles
imageObj.onload = function () {
    particles.forEach(function (particle) {
        particle.setImage(imageObj);
    });
};

// Once the callback is arranged then set the source of the image
imageObj.src = "../../Images/Smoke10.png";

// A function to create a particle object.
function Particle(context) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    // The function to draw the particle on the canvas.
    this.draw = function () {

        // If an image is set draw it
        if (this.image) {
            this.context.drawImage(this.image, this.x - 128, this.y - 128);
            // If the image is being rendered do not draw the circle so break out of the draw function                
            return;
        }
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba(0, 255, 255, 1)";
        this.context.fill();
        this.context.closePath();
    };

    // Update the particle.
    this.update = function () {
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        var canvasHalfWidth = canvasWidth / 2;
        var canvasHalfHeight = canvasHeight / 2;
        // Check if has crossed the right edge
        if (this.x >= canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = canvasWidth;
        }
            // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        }

            // Check if has crossed the top edge
        else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }

        if (mousePos) {
            var clearHalfWidth = clearWidth / 2;
            var clearHalfHeight = clearHeight / 2;

            var bounds = {
                top: canvasHalfHeight + clearHalfHeight,
                bottom: canvasHalfHeight - clearHalfHeight,
                left: canvasHalfWidth - clearHalfWidth,
                right: canvasHalfWidth + clearHalfWidth
            }

            var isInXBounds = this.x > bounds.left && this.x < bounds.right;
            var isInYBounds = this.y < bounds.top && this.y > bounds.bottom;

            if (isInXBounds && isInYBounds) {
                if (this.x - bounds.left < clearHalfWidth) {
                    this.xVelocity = Math.abs(this.xVelocity) * -1;
                }
                else {
                    this.xVelocity = Math.abs(this.xVelocity);
                }

                if (this.y - bounds.bottom > clearHalfHeight) {
                    this.yVelocity = Math.abs(this.yVelocity);
                }
                else {
                    this.yVelocity = -1 * Math.abs(this.yVelocity);
                }

                // Update the position of the particle with the addition of the velocity.
                this.x += clearFactor * this.xVelocity;
                this.y += clearFactor * this.yVelocity;
            }
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function (x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    };

    this.setImage = function (image) {
        this.image = image;
    }
}

// A function to generate a random number between 2 values
function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// The canvas context if it is defined.
var context;

// Initialise the scene and set the context if possible
function init() {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {

        // Set the context variable so it can be re-used
        context = canvas.getContext('2d');
        $('.gridster').on("mousemove", function (event) {
            mousePos = { x: event.x - this.offsetX, y: event.y - this.offsetY };
        });

        $('.gridster').on("mouseout", function (event) {
            mousePos = null;
        });
        // Create the particles and set their initial positions and velocities
        for (var i = 0; i < particleCount; ++i) {
            var particle = new Particle(context);

            // Set the position to be inside the canvas bounds
            particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));

            // Set the initial velocity to be either random and either negative or positive
            particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
            particles.push(particle);
        }

        Run();
    }
    else {
        alert("Please use a modern browser");
    }
}

// The function to draw the scene
function draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Go through all of the particles and draw them.
    particles.forEach(function (particle) {
        particle.draw();
    });
}

// Update the scene
function update() {
    particles.forEach(function (particle) {
        particle.update();
    });
}

function Run() {
    if (context) {
        requestAnimFrame(Run);
        update();
        draw();
    }
};

// Initialize the scene
init();

