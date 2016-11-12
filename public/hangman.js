(function () {
    var validLetters, words, guessInput, guess, guessButton, guessedLetter, matchedLetter, output, health, letters, currentWord, numMatchedLetter, hp, outcomes;

    var wordBank = {
      'plants': ['peashooter', 'sunflower', 'cherry bomb', 'potato mine', 'chomper'],
      'zombies': ['conehead', 'pole vaulting', 'buckethead', 'newspaper', 'dancing']
    };

    var newPlants = wordBank.plants[Math.floor(Math.random() * wordBank.plants.length)];
    var newZombies = wordBank.zombies[Math.floor(Math.random() * wordBank.zombies.length)];

    function setup() {
        /* start config options */
        validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        hp = 5;
        words = ['conehead', 'pole vaulting', 'buckethead', 'newspaper', 'dancing'];
        outcomes = {
          win: "I'm ALIVE!",
          lose: "I withered away :'(",
          guessed: 'Try another letter, already guessed',
          validation: 'Enter a letter A-Z'
        };

        /* end config options */

        guessedLetter = matchedLetter = '';
        numMatchedLetter = 0;

        /* choose a word */
        currentWord = words[Math.floor(Math.random() * words.length)];

        /* make #health and #output blank, create vars for later access */
        output = document.getElementById("output");
        health = document.getElementById("health");
        guessInput = document.getElementById("letter");

        health.innerHTML = 'You have ' + hp + ' hp remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function endGame(win) {
        if (win) {
            output.innerHTML = outcomes.win;
            output.classList.add('win');
        } else {
            output.innerHTML = outcomes.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;

    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = '';
    };

    /* main guess function when user clicks #guess */
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (validLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((matchedLetter && matchedLetter.indexOf(guess) > -1) || (guessedLetter && guessedLetter.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + outcomes.guessed;
                    output.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numMatchedLetter += 1;
                        }
                    }

                    matchedLetter += guess;
                    if (numMatchedLetter === currentWord.length) {
                        endGame(true);
                    }
                }
                /* guess doesn't exist in current word and hasn't been guessed before, add to guessedLetter, reduce hp & update user */
                else {
                    guessedLetter += guess;
                    hp--;
                    health.innerHTML = 'You have ' + hp + ' hp remaining';
                    if (hp === 0) endGame();
                }
            }
            /* not a valid letter, error */
            else {
                output.classList.add('error');
                output.innerHTML = outcomes.validation;
            }
        }
        /* no letter entered, error */
        else {
            output.classList.add('error');
            output.innerHTML = outcomes.validation;
        }
        return false;
    };
}());