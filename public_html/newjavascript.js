/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    // Final variables
    const RED = 'R';
    const BLUE = 'B';
    const GREEN = 'G';
    const YELLOW = 'Y';
    
    // Final variables for colours
    const DARK_GREEN = "rgb(0, 51, 0)";
    const DARK_RED = "rgb(204, 0, 0)";
    const DARK_BLUE = "rgb(255, 204, 0)";
    const DARK_YELLOW = "rgb(0, 0, 102)";
    
    const LIGHT_GREEN = "rgb(0, 153, 51)";
    const LIGHT_RED = "rgb(255, 0, 0)";
    const LIGHT_BLUE = "rgb(255, 255, 0";
    const LIGHT_YELLOW = "rgb(51, 102, 204)";
    
    function Simon() {
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
    }
    
    // Function where all the logic is placed
    Simon.prototype.executeGame = function() {
        this.startGame();
        
        var self = this;
        mainLoop();
        
        function mainLoop() {
            if (self.isMatching()) {
                console.log(self.result);
                self.addOneColor();
                self.showSequence();
                self.getGuess(function() {
                    mainLoop();
                });
            } else {
                console.log("Game is done");
            }
        }
        
        this.stopGame();
    };
    
    // Function for starting the game
    Simon.prototype.startGame = function() {
        // Reset variables
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
    };
    
    // Function to get one more color to make it harder for player
    Simon.prototype.addOneColor = function() {
    // Getting one more color to guess
        var random = Math.floor(Math.random() * 4);
        switch(random) {
            case 0:
                this.currentSequence += RED;
                break;
            case 1:
                this.currentSequence += BLUE;
                break;
            case 2:
                this.currentSequence += YELLOW;
                break;
            case 3:
                this.currentSequence += GREEN;
                break;
            default:
                console.log("Invalid");
                break; 
        }
    };
    
    function setColor(place, color) {
        var x = document.getElementById(place);
        x.style.backgroundColor = color;
    }
    
    function setColorBack(place, color) {
        var x = document.getElementById(place);
        x.style.backgroundColor = color;
    }
    
    Simon.prototype.pressGreen = function() {        
        this.guess += GREEN;
    };
    
    Simon.prototype.lightGreen = function() {
        document.getElementById("quarter1").style.backgroundColor = LIGHT_GREEN;
    };
    
    Simon.prototype.darkGreen = function() {
        document.getElementById("quarter1").style.backgroundColor = DARK_GREEN;
    };
    
    Simon.prototype.lightRed = function() {
        document.getElementById("quarter2").style.backgroundColor = LIGHT_RED;
    };
    
    Simon.prototype.darkRed = function() {
        document.getElementById("quarter2").style.backgroundColor = DARK_RED;
    };
    
    Simon.prototype.lightBlue = function() {
        document.getElementById("quarter3").style.backgroundColor = LIGHT_BLUE;
    };
    
    Simon.prototype.darkBlue = function() {
        document.getElementById("quarter3").style.backgroundColor = DARK_BLUE;
    };
    
    Simon.prototype.lightYellow = function() {
        document.getElementById("quarter4").style.backgroundColor = LIGHT_YELLOW;
    };
    
    Simon.prototype.darkYellow = function() {
        document.getElementById("quarter4").style.backgroundColor = DARK_YELLOW;
    };
    
    Simon.prototype.pressRed = function() {
        this.guess += RED;
    };
    
    Simon.prototype.pressBlue = function() {
        this.guess += BLUE;
    };
    
    Simon.prototype.pressYellow = function() {
        this.guess += YELLOW;
    };

    // Function to show flashing buttons
    Simon.prototype.showSequence = function() {
        var self = this;
        var counter = 0;
        show();
        
        function show() {
            if (counter < self.currentSequence.length) {
                var place = "";
                var colorToSet = "";
                var colorToSetBack = "";
                if (self.currentSequence.charAt(counter) === 'G') {
                    place = "quarter1";
                    colorToSet = LIGHT_GREEN;
                    colorToSetBack = DARK_GREEN;
                } else if (self.currentSequence.charAt(counter) === 'R') {
                    place = "quarter2";
                    colorToSet = LIGHT_RED;
                    colorToSetBack = DARK_RED;
                } else if (self.currentSequence.charAt(counter) === 'B') {
                    place = "quarter3";
                    colorToSet = LIGHT_BLUE;
                    colorToSetBack = DARK_BLUE;
                } else {
                    place = "quarter4";
                    colorToSet = LIGHT_YELLOW;
                    colorToSetBack = DARK_YELLOW;
                }
                setColor(place, colorToSet);
                setTimeout(function() { setColorBack(place, colorToSetBack) }, 1000);
                counter++;
                setTimeout(show, 2000);
            }
        }
    };

    // Function to get the guess from a user
    Simon.prototype.getGuess = function(callback) {       
        var g = this;
        loop();
       
       function loop() {
            if (g.guess.length < g.currentSequence.length) {
                setTimeout(loop, 0);
            } else {
                setTimeout(callback, 2000);
                //callback();
            }
       }
    };

    // Check whether guess matches actual sequence
    Simon.prototype.isMatching = function() {
        var match = false;
        if (this.guess === this.currentSequence) {
            document.getElementById("counter").innerHTML = this.result;
            this.result++;
            match = true;
        } else {
            console.log("not equal");
        }
        this.guess = "";
        return match;
    };

    // Execute if the game has to be stopped
    Simon.prototype.stopGame = function() {

    };