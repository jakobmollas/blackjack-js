//@ts-check

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 
      'Ten', 'Nine', 'Eight', 'Seven', 'Six', 
      'Five', 'Four', 'Three', 'Two'];

// DOM variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false, 
    gameOver = false, 
    playerWon = false, 
    dealerCards = [], 
    playerCards = [], 
    dealerScore = 0, 
    playerScore = 0, 
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', initGame);
hitButton.addEventListener('click', hitPlayer);
stayButton.addEventListener('click', stay);

function initGame() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
}

function hitPlayer() {
  playerCards.push(getNextCard());
  updateScores();
  
  if (playerScore >= 21)
    endGame();

  showStatus();
}

function stay() {
  playDealerHand();
  endGame();
  showStatus();
}

function playDealerHand() {
  while (dealerScore < playerScore
         && playerScore <= 21 
         && dealerScore < 21) {
    dealerCards.push(getNextCard());
    updateScores();
  }
}

function endGame() {
  playerWon =
    playerScore === 21 ||
    playerScore < 21 && 
    (playerScore > dealerScore || 
    dealerScore > 21);
  gameOver = true;
}

function createDeck() {
  let deck = [];

  for(let suitId = 0; suitId < suits.length; suitId++) {
    for (let cardId = 0; cardId < values.length; cardId++) {
      let card = {
        suit: suits[suitId], 
        value: values[cardId]
      }
      deck.push(card);
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapId = Math.trunc(Math.random() * deck.length);
    let tempCard = deck[swapId];
    deck[swapId] = deck[i];
    deck[i] = tempCard;
  }
}

function getNextCard() {
  return deck.shift();
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cards) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace')
      hasAce = true;
  }

  if (hasAce && score <= 11)
    score += 10;

  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }

  let dealerCardString = '';
  dealerCards.forEach(card => dealerCardString += getCardString(card) + '\n');

  let playerCardString = '';
  playerCards.forEach(card => playerCardString += getCardString(card) + '\n');

  updateScores();

  textArea.innerText = 
    'Dealer has:\n' + 
    dealerCardString + 
    '(score: ' + dealerScore + ')\n\n' + 
    'Player has:\n' + 
    playerCardString + 
    '(score: ' + playerScore + ')\n\n';

    if (gameOver) {
      if (playerWon)
        textArea.innerText += 'YOU WIN!';
      else 
        textArea.innerText += 'DEALER WIN!';

      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    }
}