/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    // Static final variables
    const RED = 'R';
    const BLUE = 'B';
    const GREEN = 'G';
    const YELLOW = 'Y';
    
    function Simon() {
        this.guess = "";
        this.currentSequence = "";
        this.result = 0;
    }
    
    // Function where all the logic is placed
    Simon.prototype.executeGame = function() {
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
        guess = "";
        currentSequence = "";
        result = 0;
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

    // Function to show flashing buttons
    Simon.prototype.showSequence = function() {
        for (var i = 0; i < this.currentSequence.length; i++) {
            console.log(this.currentSequence.charAt(i));
            if (this.currentSequence.charAt(i) === 'G') {
                var color = "rgb(0, 51, 0)";
                var j = 0;
                while (j < 3000) {
                    console.log(j);
                    document.getElementById("quarter1").style.backgroundColor = "black";
                    j++;
                }
                document.getElementById("quarter1").style.backgroundColor = color;
            } else if (this.currentSequence.charAt(i) === 'R') {
                document.getElementById("quarter2").style.backgroundColor = "rgb(255, 0, 0)";
            } else if (this.currentSequence.charAt(i) === 'B') {
                document.getElementById("quarter3").style.backgroundColor = "rgb(255, 255, 0)";
            } else {
                document.getElementById("quarter4").style.backgroundColor = "rgb(51, 102, 204)";
            }
        }
    };

    // Function to get the guess from a user
    Simon.prototype.getGuess = function() {
        
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