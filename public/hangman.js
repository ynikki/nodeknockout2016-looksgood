window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var tries = [ ];      // Stored tries
  var hp ;             // hp
  var counter ;           // Count correct tries
  var space;              // Number of spaces in word '-'

  // Get elements
  var showhp = document.getElementById("myhp");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // Create Image When Game Ends
  var container = document.getElementById('end-img');
  var endImageDiv = document.createElement('div');
  endImageDiv.id = 'end-img-div';

  function createEndImg(){
    endImage = document.createElement('img');
    endImage.id = 'end-game-image';
    endImage.src = '';
    endImageDiv.appendChild(endImage);
    container.appendChild(endImageDiv);
    endImageDiv.appendChild(endImage);
    container.appendChild(endImageDiv);
  }
  createEndImg();



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('letter-buttons');
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
      catagoryName.innerHTML = "The Category is JavaScript";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Category is HTML & CSS";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Category is Server";
    }
  }

  // Create tries ul
  result = function () {
    wordHolder = document.getElementById('word-holder');
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

      tries.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show hp
  comments = function () {
    showhp.innerHTML = "You have " + hp + " HP";
    if (hp < 1) {
      showhp.innerHTML = "I withered away :'(";
      endGame();
    }
    for (var i = 0; i < tries.length; i++) {
      if (counter + space === tries.length) {
        showhp.innerHTML = "I'm ALIVE!";
        var win = "win";
        endGame(win);
      }
    }
  }

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          tries[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      var lifeBar = document.getElementById('health');
      if (j === -1) {
        hp -= 1;
        lifeBar.value--;
        comments();
      } else {
        comments();
      }
    }
  }


  // Play
  play = function () {

    categories = [
      ['function', 'variable', 'object', 'array', 'parameter'],
      ['attributes', 'body', 'value', 'selector', 'background-color'],
      ['hostname', 'port', 'server', 'listen', 'nodejs']
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    tries = [ ];
    hp = 5;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  };
  play();

  // Hint
  hint.onclick = function() {

    hints = [
      ['Set of statements and performs a task', 'Container for data', 'Has keys and values', 'Lists of values', 'Arguments object'],
      ['Additional information for elements', 'Has contents of HTML document', 'Define property', 'Patterns to grab elements', 'Can apply the rainbow'],
      ['IP address', 'Number server uses for url', 'Processes requests', 'Hear', 'Can build network applications']
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "*Hint: " +  hints [catagoryIndex][hintIndex] + '*';
  };

   // Reset
  document.getElementById('reset').onclick = function(){
    var x = document.getElementById('end-game-image');
    var lifeBar = document.getElementById('health');
    lifeBar.value='5';
    x.parentNode.removeChild(x);
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    play();
    createEndImg();
  };
};

function endGame(win) {
    winImg = 'http://plusquotes.com/images/quotes-img/flower-25.jpg';
    loseImg = 'http://cms.kienthuc.net.vn/uploaded/vannt/2016_09_23/hoa/nam-mo-thay-hoa-bao-truoc-dieu-gi-trong-tuong-lai-hinh-2.jpg';
    if (win) {
      endImage.src = winImg;
    } else {
      endImage.src = loseImg;
    }
}
