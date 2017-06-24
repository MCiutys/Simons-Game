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
        
        
        /*do {
            this.addOneColor();
            this.showSequence();
            var self = this;
            this.getGuess(function() {
                self.isMatching();
            });
        } while (this.isMatching());*/
        
        var self = this;
        mainLoop();
        
        function mainLoop() {
            if (self.isMatching()) {
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
        console.log("---------------START GAME------------------");
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
    };
    
    // Function to get one more color to make it harder for player
    Simon.prototype.addOneColor = function() {
        console.log("---------------ADD ONE COLOUR------------------");
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
        console.log("---------------SHOW SEQUENCE------------------");
        console.log(this.currentSequence);
        for (var i = 0; i < this.currentSequence.length; i++) {
            var place = "";
            var colorToSet = "";
            var colorToSetBack = "";
            if (this.currentSequence.charAt(i) === 'G') {
                place = "quarter1";
                colorToSet = LIGHT_GREEN;
                colorToSetBack = DARK_GREEN;
            } else if (this.currentSequence.charAt(i) === 'R') {
                place = "quarter2";
                colorToSet = LIGHT_RED;
                colorToSetBack = DARK_RED;
            } else if (this.currentSequence.charAt(i) === 'Y') {
                place = "quarter3";
                colorToSet = LIGHT_BLUE;
                colorToSetBack = DARK_BLUE;
            } else {
                place = "quarter4";
                colorToSet = LIGHT_YELLOW;
                colorToSetBack = DARK_YELLOW;
            }
            setColor(place, colorToSet);
            setTimeout(function() { setColorBack(place, colorToSetBack) }, 2000);
        }
    };

    // Function to get the guess from a user
    Simon.prototype.getGuess = function(callback) {
        console.log("---------------GET GUESS------------------");
        
        var g = this;
        
        loop();
       
       function loop() {
           console.log("loop");
           console.log("Guess length: " + g.guess.length);
           console.log("Current seq length: " + g.currentSequence.length);
            if (g.guess.length < g.currentSequence.length) {
                setTimeout(loop, 0);
            } else {
                console.log("callback");
                callback();
            }
       }
    };

    // Check whether guess matches actual sequence
    Simon.prototype.isMatching = function() {
        console.log("---------------IS MATCHING------------------");
        var match = false;
        console.log("Guess: " + this.guess);
        console.log("Curr sequence: " + this.currentSequence);
        if (this.guess === this.currentSequence) {
            console.log("equal");
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