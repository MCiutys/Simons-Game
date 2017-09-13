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
    const DARK_BLUE = "rgb(0, 0, 102)";
    const DARK_YELLOW = "rgb(255, 204, 0)";
    
    const LIGHT_GREEN = "rgb(0, 153, 51)";
    const LIGHT_RED = "rgb(255, 0, 0)";
    const LIGHT_BLUE = "rgb(51, 102, 204)";
    const LIGHT_YELLOW = "rgb(255, 255, 0)";
    
    // Color when pressed
    const BLACK = "black";
    const WHITE = "white";
    
    // Other const variables
    const SCORE_TEXT = "Score ";
    const GUESS_TEXT = "Guess ";
    const LEVEL_TEXT = "Level: ";
    
    // Audio files
    const AUDIO_GREEN = new Audio('green.wav');
    const AUDIO_RED= new Audio('red.wav');
    const AUDIO_BLUE = new Audio('blue.wav');
    const AUDIO_YELLOW = new Audio('yellow.wav');
    const AUDIO_GAME_OVER = new Audio('game_over.wav');
    const AUDIO_ACCEPT = new Audio('accept.wav');
    const AUDIO_CANCEL = new Audio('cancel.wav');
    
    // Levels and speed
    const SHOW_COLOR = 1000;
    const CHANGE_COLOR = 2000;
    
    function Simon() {
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
        this.level = 1;
        this.accepted = false;
        this.gameStarted = false;
        this.showingSequence = false;
    }
    
    // Function where all the logic is placed
    Simon.prototype.executeGame = function() {
        this.startGame();
        
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
            }
        }
        
        this.stopGame();
    };
    
    // Function for starting the game
    Simon.prototype.startGame = function() {
        
        this.buttonFlash("start-button");
        
        // Reset variables
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
        this.gameStarted = true;
        this.level = 1;
        this.showingSequence = false;
        
        document.getElementById("screen").style.textOverflow = "ellipsis";
        document.getElementById("screen").style.overflow = "hidden";
        document.getElementById("screen").style.whiteSpace = "nowrap";
        
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
    
    // Flash all black borders
    Simon.prototype.flashWhite = function() {
        if (!this.showingSequence) {
            var elements = document.querySelectorAll(".black-border");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i].id;
                document.getElementById(element).style.borderColor = WHITE;
            }      
        }
    };
    
    // Flashes the given button
    Simon.prototype.buttonFlash = function(button) {
        if (!this.showingSequence || button === "start-button") {
            document.getElementById(button).style.color = WHITE;
            document.getElementById(button).style.borderColor = WHITE;
        }
    };
    
    // Return previous color for a given button
    Simon.prototype.buttonBack = function(button) {
            document.getElementById(button).style.color = BLACK;
            document.getElementById(button).style.borderColor = BLACK;
    };
    
    function setColor(place, color) {
        var x = document.getElementById(place);
        x.style.backgroundColor = color;
    }
    
    function setColorBack(place, color) {
        var x = document.getElementById(place);
        x.style.backgroundColor = color;
    }
    
    function playSound(place) {
        switch(place) {
            case 'red':
                return AUDIO_RED;
            case 'green':
                return AUDIO_GREEN;
            case 'blue':
                return AUDIO_BLUE;
            case 'yellow':
                return AUDIO_YELLOW;
        }
    }
    
    
    
    function backBlack() {
        var elements = document.getElementsByClassName("black-border");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i].id;
            document.getElementById(element).style.borderColor = BLACK;
        } 
    }
    
    Simon.prototype.mouseDown = function(place) {
        if (!this.showingSequence) {
            document.getElementById(place).style.backgroundColor = BLACK;
            this.flashWhite();
        }
    };
    
    Simon.prototype.mouseUp = function(place) {
        if (!this.showingSequence) {
            backBlack();
            switch(place) {
                case 'green': 
                    document.getElementById(place).style.backgroundColor = LIGHT_GREEN;
                    break;
                case 'red':
                    document.getElementById(place).style.backgroundColor = LIGHT_RED;
                    break;
                case 'blue':
                    document.getElementById(place).style.backgroundColor = LIGHT_BLUE;
                    break;
                case 'yellow':
                    document.getElementById(place).style.backgroundColor = LIGHT_YELLOW;
                    break;
            }        
        }
    };
    
    function gameOver(self) {
        AUDIO_GAME_OVER.play();
        document.getElementById("screen").innerHTML = "Game Over" + "<br>" + "Score " + 
                    self.result;
    }
    
    Simon.prototype.hoveringOver = function(color) {
        if (!this.showingSequence) {
            switch(color) {
                case RED:
                    document.getElementById("red").style.backgroundColor = LIGHT_RED;
                    break;
                case GREEN:
                    document.getElementById("green").style.backgroundColor = LIGHT_GREEN;
                    break;
                case BLUE:
                    document.getElementById("blue").style.backgroundColor = LIGHT_BLUE;
                    break;
                case YELLOW:
                    document.getElementById("yellow").style.backgroundColor = LIGHT_YELLOW;
                    break;
            } 
        }
    };
    
    Simon.prototype.afterHovering = function(color) {
        if (!this.showingSequence) {
            switch(color) {
                case RED:
                    document.getElementById("red").style.backgroundColor = DARK_RED;
                    break;
                case GREEN:
                    document.getElementById("green").style.backgroundColor = DARK_GREEN;
                    break;
                case BLUE:
                    document.getElementById("blue").style.backgroundColor = DARK_BLUE;
                    break;
                case YELLOW:
                    document.getElementById("yellow").style.backgroundColor = DARK_YELLOW;
                    break;
            }
        }
    };
    
    Simon.prototype.pressColor = function(color) {
        if (!this.showingSequence) {
            switch(color) {
                case RED:
                    AUDIO_RED.play();
                    this.guess += RED;
                    break;
                case GREEN:
                    AUDIO_GREEN.play();
                    this.guess += GREEN;
                    break;
                case BLUE:
                    AUDIO_BLUE.play();
                    this.guess += BLUE;
                    break;
                case YELLOW:
                    AUDIO_YELLOW.play();
                    this.guess += YELLOW;
                    break;
            }
        }
    };
    
    Simon.prototype.pressGreen = function() {
        AUDIO_GREEN.play();
        this.guess += GREEN;
    };
    
    Simon.prototype.pressRed = function() {
        AUDIO_RED.play();
        this.guess += RED;
    };
    
    Simon.prototype.pressBlue = function() {
        AUDIO_BLUE.play();
        this.guess += BLUE;
    };
    
    Simon.prototype.pressYellow = function() {
        AUDIO_YELLOW.play();
        this.guess += YELLOW;
    };
    
    Simon.prototype.cancelGuess = function() {
        if (this.gameStarted) {
            this.guess = this.guess.substring(0, this.guess.length - 1);
            AUDIO_CANCEL.play();
        }
    };
    
    Simon.prototype.acceptGuess = function() {
        if (this.gameStarted) {
            this.accepted = true;
            AUDIO_ACCEPT.play();
        }
    };

    // Function to show flashing buttons
    Simon.prototype.showSequence = function() {
        var self = this;
        var counter = 0;
                
        show();
        
        function show() {
            self.showingSequence = true;
            
            // If true, buttons can be clickable
            if (counter === self.currentSequence.length) {
                self.showingSequence = false;
            }
            
            if (counter < self.currentSequence.length) {
                var place = "";
                var colorToSet = "";
                var colorToSetBack = "";
                if (self.currentSequence.charAt(counter) === 'G') {
                    place = "green";
                    colorToSet = LIGHT_GREEN;
                    colorToSetBack = DARK_GREEN;
                } else if (self.currentSequence.charAt(counter) === 'R') {
                    place = "red";
                    colorToSet = LIGHT_RED;
                    colorToSetBack = DARK_RED;
                } else if (self.currentSequence.charAt(counter) === 'B') {
                    place = "blue";
                    colorToSet = LIGHT_BLUE;
                    colorToSetBack = DARK_BLUE;
                } else {
                    place = "yellow";
                    colorToSet = LIGHT_YELLOW;
                    colorToSetBack = DARK_YELLOW;
                }
                
                setColor(place, colorToSet);
                playSound(place).play();
                setTimeout(function() {
                    setColorBack(place, colorToSetBack);
                }, SHOW_COLOR / self.level);
                
                counter++;
                
                var delayTime = CHANGE_COLOR / self.level;
                if (counter === self.currentSequence.length) {
                    delayTime = SHOW_COLOR / self.level;
                }
                
                
                setTimeout(function() {
                    show();
                }, delayTime);  
            }
            
        }
        
        
    };

    // Function to get the guess from a user
    Simon.prototype.getGuess = function(callback) {       
        var g = this;
        loop();
       
       function loop() {
           document.getElementById("screen").innerHTML = SCORE_TEXT +
                    g.result + "," + LEVEL_TEXT + g.level + '<br>' + GUESS_TEXT + g.guess;
            if (g.accepted === true) {
                g.accepted = false;
                setTimeout(callback, 0);
            } else {
                setTimeout(loop, 0);
            }
       }
    };

    // Check whether guess matches actual sequence
    Simon.prototype.isMatching = function() {
        var match = false;
        if (this.guess === this.currentSequence) {
            // Do not increase result when both are empty at the start
            if (this.guess.length !== 0) {
                this.result++;
            }
            match = true;
        } else {
            gameOver(this);
        }
        this.guess = "";
        
    // Increase level if needed
        if (this.result % 3 === 0 && this.result > 0) {
            this.level++;
        }
        return match;
    };

    // Execute if the game has to be stopped
    Simon.prototype.stopGame = function() {

    };