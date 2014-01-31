
// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / targetFPS);
            };
})();

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

(function ($) {
    function Particle(canvasContext) {

        this.canvasContext = canvasContext; // Store the canvasContext which will be used to draw the particle
        this.pos = { x: 0, y: 0 }; // Set the initial x and y positions
        this.velocity = { x: 0, y: 0 };// Set the initial velocity
        this.radius = 2; // Set the radius

        this.addCoords = function (objA, objB) { return { x: objA.x + objB.x, y: objA.y + objB.y } };

        // The function to draw the particle on the canvas.
        this.draw = function () {

            // If an image is set draw it
            if (this.image) {
                this.canvasContext.drawImage(this.image, this.pos.x - 128, this.pos.y - 128);
                // If the image is being rendered do not draw the circle so break out of the draw function                
                return;
            }

            // Draw the circle as before, with the addition of using the position and the radius from this object.
            //[JD]: this appears to only happen right before the image loads, if we get around to that. good debugging thing though.
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
            this.canvasContext.fillStyle = "rgba(0, 255, 255, 1)";
            this.canvasContext.fill();
            this.canvasContext.closePath();
        };

        // Update the particle.
        this.update = function () {
            // Update the position of the particle with the addition of the velocity.---------------------------------------------------------------------------------
            this.pos = this.addCoords(this.pos, this.velocity);

            var canvasHalf = { width: 0, height: 0 };
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

    var globals = {
        mousePos: null,

        // The canvas canvasContext if it is defined.
        canvasContext: null, 
        particles: [],
        
        // Create an image object (only need one instance)
        imageObj:  new Image()
    }

    var methods = {

        initialDefaults: {
            
            // The amount of particles to render
            particleCount: 200,

            // The maximum velocity in each direction
            maxVelocity: 2,
            clearWidth: 900,
            clearHeight: 900,
            clearFactor: 3,

            canvas: {
                height: 400,
                width: 400
            }
        },

        initialCache: {
            canvas: {
                Context: null,
                height: 0,
                width: 0
            }
        },

        // A function to create a particle object.
        // A function to generate a random number between 2 values
        generateRandom: function(min, max) {
            return Math.random() * (max - min) + min;
        },

        // Initialise the scene and set the canvasContext if possible
        init: function(context) {
            if (context.getContext) {
                var _o = { cache: access.cache(context), defaults: access.defaults(context) };
                // Once the callback is arranged then set the source of the image
                globals.imageObj.src = "../../Images/Smoke10.png";

                // Once the image has been downloaded then set the image on all of the particles
                globals.imageObj.onload = function () {
                    globals.particles.forEach(function (particle) {
                        particle.setImage(imageObj);
                    });
                };

                // Set the canvasContext variable so it can be re-used
                _o.cache.canvasContext = context.getContext('2d');

                $('body').on("mousemove", function (event) {
                    globals.mousePos = { x: event.x - this.offsetX, y: event.y - this.offsetY };
                });

                $('body').on("mouseout", function (event) {
                    globals.mousePos = null;
                });

                $(window).resize(function () {
                    _o = { cache: access.cache(context), defaults: access.defaults(context) };
                    $(context).attr('height', window.innerHeight);
                    $(context).attr('width', window.innerWidth);
                    _o.defaults.canvas.height = window.innerHeight;
                    _o.defaults.canvas.width = window.innerWidth;
                    access.defaults(context, _o.defaults);
                });

                // Create the particles and set their initial positions and velocities
                for (var i = 0; i < _o.defaults.particleCount; ++i) {
                    var particle = new Particle(canvasContext);

                    // Set the position to be inside the canvas bounds
                    particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, _o.c));

                    // Set the initial velocity to be either random and either negative or positive
                    particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
                    particles.push(particle);
                }

                Run();
            }
            else {
                alert("Please use a modern browser");
            }
        },
        
        // The function to draw the scene
        draw: function() {
            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

            // Go through all of the particles and draw them.
            particles.forEach(function (particle) {
                particle.draw();
            });
        },


        // Update the scene
        update: function() {
            globals.particles.forEach(function (particle) {
                this.particle.update();
            });
        },

        Run: function() {
            if (canvasContext) {
                requestAnimFrame(Run);
                update();
                draw();
            }
        },

        initialize: function (options) {

            $(this).each(function (index, context) {

                if (access.cache(context) != null) {
                    // if cache already exists on this element, it already has been initialized.
                    return;
                }

                var definedDefaults = $.extend(true, {}, methods.initialDefaults, options);
                var definedCache = $.extend({}, methods.initialCache);

                access.defaults(context, definedDefaults); access.cache(context, definedCache);

                methods.init(context);
            });
        }
    };

    /********************************************************************************/
    /*****    7. Standard jQuery Extension function definition                 ******/
    /********************************************************************************/

    $.fn.SmokeyCanvas = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.initialize.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.SmokeyCanvas');
        }
    };

})(jQuery);
