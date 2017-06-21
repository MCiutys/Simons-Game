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
        do {
            this.addOneColor();
            this.showSequence();
            this.getGuess();
        } while (this.isMatching());
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
    
    function pressColor() {
        
    }

    // Function to show flashing buttons
    Simon.prototype.showSequence = function() {
        console.log(this.currentSequence);
        for (var i = 0; i < this.currentSequence.length; i++) {
            var place = "";
            var colorToSet = "";
            var colorToSetBack = "";
            alert(place);
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
    Simon.prototype.getGuess = function() {
        var counter = 0;
        while (counter < this.currentSequence.length) {
            
        }
    };

    // Check whether guess matches actual sequence
    Simon.prototype.isMatching = function() {
        var match = false;
        if (guess === currentSequence) {
            result++;
            match = true;
        } 
        return match;
    };

    // Execute if the game has to be stopped
    Simon.prototype.stopGame = function() {

    };