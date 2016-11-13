(function () {
    var validLetters, words, guessInput, guess, guessButton, guessedLetter, matchedLetter, result, health, letters, currentWord, numMatchedLetter, hp, outcomes, endImage, selection, winImg, loseImg;

    var wordBank = {
      'plants': ['peashooter', 'sunflower', 'cherry bomb', 'potato mine', 'chomper'],
      'zombies': ['conehead', 'flag', 'buckethead', 'newspaper', 'dancing']
    };

    var newPlants = wordBank.plants[Math.floor(Math.random() * wordBank.plants.length)];
    var newZombies = wordBank.zombies[Math.floor(Math.random() * wordBank.zombies.length)];

    function setup() {
        /* start config options */
        validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        hp = 5;
        words = ['conehead', 'flag', 'buckethead', 'newspaper', 'dancing'];
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

        /* make #health and #app blank, create vars for later access */
        result = document.getElementById("result");
        health = document.getElementById("health");
        guessInput = document.getElementById("letter");

        health.innerHTML = 'You have ' + hp + ' hp remaining';
        result.innerHTML = '';

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
        var container = document.getElementById('end-img');
        var endImageDiv = document.createElement('div');
        endImage = document.createElement('img');
        endImage.src = '';
        winImg = 'http://plusquotes.com/images/quotes-img/flower-25.jpg';
        loseImg = 'http://cms.kienthuc.net.vn/uploaded/vannt/2016_09_23/hoa/nam-mo-thay-hoa-bao-truoc-dieu-gi-trong-tuong-lai-hinh-2.jpg';
        endImage.id = 'end-game-image';
        endImageDiv.appendChild(endImage);
        container.appendChild(endImageDiv);

        if (win) {
          endImage.src = winImg;
          result.innerHTML = outcomes.win;
          result.classList.add('win');
        } else {
          endImage.src = loseImg;
          result.innerHTML = outcomes.lose;
          result.classList.add('error');
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
        result.innerHTML = '';
        result.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (validLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((matchedLetter && matchedLetter.indexOf(guess) > -1) || (guessedLetter && guessedLetter.indexOf(guess) > -1)) {
                    result.innerHTML = '"' + guess.toUpperCase() + '"' + outcomes.guessed;
                    result.classList.add("warning");
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
                result.classList.add('error');
                result.innerHTML = outcomes.validation;
            }
        }
        /* no letter entered, error */
        else {
            result.classList.add('error');
            result.innerHTML = outcomes.validation;
        }
        return false;
    };
}());