// (function () {
//     var validLetters, words, guessInput, guess, guessButton, guessedLetter, matchedLetter, output, health, letters, currentWord, numMatchedLetter, hp, outcomes;

//     var wordBank = {
//       'plants': ['peashooter', 'sunflower', 'cherry bomb', 'potato mine', 'chomper'],
//       'zombies': ['conehead', 'pole vaulting', 'buckethead', 'newspaper', 'dancing']
//     };

//     var newPlants = wordBank.plants[Math.floor(Math.random() * wordBank.plants.length)];
//     var newZombies = wordBank.zombies[Math.floor(Math.random() * wordBank.zombies.length)];

//     function setup() {
//         /* start config options */
//         validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//         hp = 5;
//         words = ['conehead', 'pole vaulting', 'buckethead', 'newspaper', 'dancing'];
//         outcomes = {
//           win: "I'm ALIVE!",
//           lose: "I withered away :'(",
//           guessed: 'Try another letter, already guessed',
//           validation: 'Enter a letter A-Z'
//         };

//         /* end config options */

//         guessedLetter = matchedLetter = '';
//         numMatchedLetter = 0;

//         /* choose a word */
//         currentWord = words[Math.floor(Math.random() * words.length)];

//         /* make #health and #output blank, create vars for later access */
//         output = document.getElementById("output");
//         health = document.getElementById("health");
//         guessInput = document.getElementById("letter");

//         health.innerHTML = 'You have ' + hp + ' hp remaining';
//         output.innerHTML = '';

//         document.getElementById("letter").value = '';

//         /* make sure guess button is enabled */
//         guessButton = document.getElementById("guess");
//         guessInput.style.display = 'inline';
//         guessButton.style.display = 'inline';

//         /* set up display of letters in current word */
//         letters = document.getElementById("letters");
//         letters.innerHTML = '<li class="current-word">Current word:</li>';

//         var letter, i;
//         for (i = 0; i < currentWord.length; i++) {
//             letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
//             letters.insertAdjacentHTML('beforeend', letter);
//         }
//     }

//     function endGame(win) {
//         if (win) {
//             output.innerHTML = outcomes.win;
//             output.classList.add('win');
//         } else {
//             output.innerHTML = outcomes.lose;
//             output.classList.add('error');
//         }

//         guessInput.style.display = guessButton.style.display = 'none';
//         guessInput.value = '';
//     }

//     /* Start game - should ideally check for existing functions attached to window.onload */
//     window.onload = setup();

//      buttons
//     document.getElementById("restart").onclick = setup;

//     /* reset letter to guess on click */
//     guessInput.onclick = function () {
//         this.value = '';
//     };

//     /* main guess function when user clicks #guess */
//     document.getElementById('hangman').onsubmit = function (e) {
//         if (e.preventDefault) e.preventDefault();
//         output.innerHTML = '';
//         output.classList.remove('error', 'warning');
//         guess = guessInput.value;

//         /* does guess have a value? if yes continue, if no, error */
//         if (guess) {
//             /* is guess a valid letter? if so carry on, else error */
//             if (validLetters.indexOf(guess) > -1) {
//                 /* has it been guessed (missed or matched) already? if so, abandon & add notice */
//                 if ((matchedLetter && matchedLetter.indexOf(guess) > -1) || (guessedLetter && guessedLetter.indexOf(guess) > -1)) {
//                     output.innerHTML = '"' + guess.toUpperCase() + '"' + outcomes.guessed;
//                     output.classList.add("warning");
//                 }
//                 /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
//                 else if (currentWord.indexOf(guess) > -1) {
//                     var lettersToShow;
//                     lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

//                     for (var i = 0; i < lettersToShow.length; i++) {
//                         lettersToShow[i].classList.add("correct");
//                     }

//                     /* check to see if letter appears multiple times */
//                     for (var j = 0; j < currentWord.length; j++) {
//                         if (currentWord.charAt(j) === guess) {
//                             numMatchedLetter += 1;
//                         }
//                     }

//                     matchedLetter += guess;
//                     if (numMatchedLetter === currentWord.length) {
//                         endGame(true);
//                     }
//                 }
//                 /* guess doesn't exist in current word and hasn't been guessed before, add to guessedLetter, reduce hp & update user */
//                 else {
//                     guessedLetter += guess;
//                     hp--;
//                     health.innerHTML = 'You have ' + hp + ' hp remaining';
//                     if (hp === 0) endGame();
//                 }
//             }
//             /* not a valid letter, error */
//             else {
//                 output.classList.add('error');
//                 output.innerHTML = outcomes.validation;
//             }
//         }
//         /* no letter entered, error */
//         else {
//             output.classList.add('error');
//             output.innerHTML = outcomes.validation;
//         }
//         return false;
//     };
// }());

window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      endGame();
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        var win = "win";
        endGame(win);
      }
    }
  }

      // Animate man
  // var animate = function () {
  //   var drawMe = lives ;
  //   drawArray[drawMe]();
  // }


   // Hangman
  // canvas =  function(){

  //   myStickman = document.getElementById("stickman");
  //   context = myStickman.getContext('2d');
  //   context.beginPath();
  //   context.strokeStyle = "#fff";
  //   context.lineWidth = 2;
  // };

    // head = function(){
    //   myStickman = document.getElementById("stickman");
    //   context = myStickman.getContext('2d');
    //   context.beginPath();
    //   context.arc(60, 25, 10, 0, Math.PI*2, true);
    //   context.stroke();
    // }

//   draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

//     context.moveTo($pathFromx, $pathFromy);
//     context.lineTo($pathTox, $pathToy);
//     context.stroke();
// }

//    frame1 = function() {
//      draw (0, 150, 150, 150);
//    };

//    frame2 = function() {
//      draw (10, 0, 10, 600);
//    };

//    frame3 = function() {
//      draw (0, 5, 70, 5);
//    };

//    frame4 = function() {
//      draw (60, 5, 60, 15);
//    };

//    torso = function() {
//      draw (60, 36, 60, 70);
//    };

//    rightArm = function() {
//      draw (60, 46, 100, 50);
//    };

//    leftArm = function() {
//      draw (60, 46, 20, 50);
//    };

//    rightLeg = function() {
//      draw (60, 70, 100, 100);
//    };

//    leftLeg = function() {
//      draw (60, 70, 20, 100);
//    };

  // drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        // animate();
      } else {
        comments();
      }
    }
  }


  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    //canvas();
  }

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    //context.clearRect(0, 0, 400, 400);
    play();
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