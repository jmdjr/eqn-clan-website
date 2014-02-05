// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / targetFPS);
            };
})();

var globals = {
    particles: []
}

var defaults = {
    particleCount: 250,
    maxVelocity: 2
}

/*--- 0.3. initial Cache                                  ----------------------*/
// enables access to these properties through the data of the context.
var access = new function () {
    this.getContexts
    this.defaults = function (context, defaults) {
        if (defaults !== undefined) { $(context).data("defaults", defaults); }
        return $(context).data("defaults");
    };

    this.cache = function (context, cache) {
        if (cache !== undefined) { $(context).data("cache", cache); }
        return $(context).data("cache");
    };

    this.SectionId = function (context, SectionId) {
        if (SectionId !== undefined) { $(context).data("SectionId", SectionId); }
        return $(context).data("SectionId");
    };

    this.defaultPosition = function (context, dPosition) {
        if (dPosition !== undefined) { $(context).data("dPosition", dPosition); }
        return $(context).data("dPosition");
    };
};

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 33;

// Create an image object (only need one instance)
var imageObj = new Image();

var mousePos = null;
var clearWidth = 900;
var clearHeight = 900;
var clearFactor = 3;

// Once the image has been downloaded then set the image on all of the particles
imageObj.onload = function () {
    globals.particles.forEach(function (particle) {
        particle.setImage(imageObj);
    });
};

// Once the callback is arranged then set the source of the image
imageObj.src = "http://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png";

// A function to create a particle object.
function Particle(context) {

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 2;

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
        //// Draw the circle as before, with the addition of using the position and the radius from this object.
        //this.context.beginPath();
        //this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        //this.context.fillStyle = "rgba(0, 255, 255, 1)";
        //this.context.fill();
        //this.context.closePath();
    };

    // Update the particle.
    this.update = function () {
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        var canvasHalfWidth = window.innerWidth / 2;
        var canvasHalfHeight = window.innerHeight / 2;
        // Check if has crossed the right edge
        if (this.x >= window.innerWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = window.innerWidth;
        }
            // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= window.innerHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = window.innerHeight;
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

// The function to draw the scene
function draw() {
    // Clear the drawing surface and fill it with a black background
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Go through all of the particles and draw them.
    globals.particles.forEach(function (particle) {
        particle.draw();
    });
}

// Update the scene
function update() {
    globals.particles.forEach(function (particle) {
        particle.update();
    });
}

/********************************************************************************/
/*****    7. Standard jQuery Extension function definition                 ******/
/********************************************************************************/

(function ($) {
    var methods = {
        init: function (options) {
            var $this = $(this);
            var $parent = $this.parent();
            if (this[0].getContext) {

                var definedDefaults = $.extend(true, {}, defaults, options);
                access.defaults(context, definedDefaults);

                // Set the context variable so it can be re-used
                context = this[0].getContext('2d');
                $parent.on("mousemove", function (event) {
                    mousePos = { x: event.x - this.offsetX, y: event.y - this.offsetY };
                });

                $parent.on("mouseout", function (event) {
                    mousePos = null;
                });

                var heightDiff = parseInt($parent.css('padding-top').replace('px', '')) + parseInt($parent.css('padding-bottom').replace('px', ''));
                var widthDiff = parseInt($parent.css('padding-left').replace('px', '')) + parseInt($parent.css('padding-right').replace('px', ''));
                $this.attr('height', $parent.innerHeight() - heightDiff);
                $this.attr('width', $parent.innerWidth() - widthDiff);

                $(window).resize(function () {
                    var heightDiff = parseInt($parent.css('padding-top').replace('px', '')) + parseInt($parent.css('padding-bottom').replace('px', ''));
                    var widthDiff = parseInt($parent.css('padding-left').replace('px', '')) + parseInt($parent.css('padding-right').replace('px', ''));
                    $this.attr('height', $parent.innerHeight() - heightDiff);
                    $this.attr('width', $parent.innerWidth() - widthDiff);
                });

                var maxVelocity = definedDefaults.maxVelocity;

                // Create the particles and set their initial positions and velocities
                for (var i = 0; i < definedDefaults.particleCount; ++i) {
                    var particle = new Particle(context);

                    // Set the position to be inside the canvas bounds
                    particle.setPosition(generateRandom(0, window.innerWidth), generateRandom(0, window.innerHeight));

                    // Set the initial velocity to be either random and either negative or positive
                    particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
                    globals.particles.push(particle);
                }
            }
            else {
                alert("Please use a modern browser");
            }


            //requestAnimationFrame(function () { update(); draw(); });

            // If the context is set then we can draw the scene (if not then the browser does not support canvas)
            if (context) {
                setInterval(function () {

                    // Update the scene befoe drawing
                    update();

                    // Draw the scene
                    draw();

                }, 1000 / targetFPS);
            }
        }
    }


$.fn.SmokeyCanvas = function (method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    }
    else {
        $.error('Method ' + method + ' does not exist on jQuery.SmokeyCanvas');
    }
};

})(jQuery);
