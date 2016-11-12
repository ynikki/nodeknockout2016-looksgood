function hangman(){
  var wordBank = {
    'plants': ['peashooter', 'sunflower', 'cherry bomb', 'potato mine', 'chomper'],
    'zombies': ['conehead', 'pole vaulting', 'buckethead', 'newspaper', 'dancing']
  };

  var outcomes = {
    win: "I'm ALIVE!",
    lose: "I withered away :'(",
    guess: 'Try another letter, already guessed',
    validation: 'Enter a letter A-Z'
  };

  var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

}