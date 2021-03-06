const getRandomInt = (limit) => {
  return Math.floor(Math.random() * limit);
};

const getMoveFromNumber = (num) => {
  switch (num) {
    case 0:
      return 'Attack';
    case 1:
      return 'Special';
    case 2:
      return 'Heal';
    case 3:
      return 'Block';
  }
};

const getDamageValues = (demonMove, playerMove) => {
  let demonDamage = 0;
  let demonHeal = 0;
  let playerDamage = 0;
  let playerHeal = 0;
  let logMessage = '';

  switch (demonMove) {
    case 'Attack':
      if (playerMove == 'Block') {
        logMessage += "Demon's attack is unsuccessful.";
      } else {
        const attackDamage = getRandomInt(11);
        playerDamage += attackDamage;
        logMessage += `Demon attacks for ${attackDamage} dmg. `;
      }
      break;
    case 'Special':
      const specialSelfDamage = getRandomInt(16);
      const specialPlayerDamage = getRandomInt(21);
      demonDamage += specialSelfDamage;
      playerDamage += specialPlayerDamage;
      logMessage += `Demon uses magic for ${specialPlayerDamage} dmg to Player and ${specialSelfDamage} dmg to self. `;
      break;
    case 'Heal':
      const healAmount = getRandomInt(11);
      demonHeal += healAmount;
      logMessage += `Demon heals for ${healAmount}. `;
      break;
    case 'Block':
      logMessage += 'Demon blocks. ';
      break;
  }

  switch (playerMove) {
    case 'Attack':
      if (demonMove == 'Block') {
        logMessage += "Player's attack is unsuccessful.";
      } else {
        const attackDamage = getRandomInt(11);
        demonDamage += attackDamage;
        logMessage += `Player attacks for ${attackDamage} dmg. `;
      }
      break;
    case 'Special':
      const specialSelfDamage = getRandomInt(16);
      const specialDemonDamage = getRandomInt(21);
      playerDamage += specialSelfDamage;
      demonDamage += specialDemonDamage;
      logMessage += `Player uses magic for ${specialDemonDamage} dmg to Demon and ${specialSelfDamage} dmg to self. `;
      break;
    case 'Heal':
      const healAmount = getRandomInt(11);
      playerHeal += healAmount;
      logMessage += `Player heals for ${healAmount}. `;
      break;
    case 'Block':
      logMessage += 'Player blocks. ';
      break;
  }

  let demonValue = demonHeal - demonDamage;
  let playerValue = playerHeal - playerDamage;
  return { demonValue, playerValue, logMessage };
};

new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    demonHealth: 100,
    playerHealth: 100,
    logs: [],
    header: 'Save the world!',
    buttonMessage: 'START GAME',
  },
  methods: {
    startGame: function () {
      this.gameStarted = true;
      this.demonHealth = 100;
      this.playerHealth = 100;
      this.logs = [];
      this.header = 'Save the world!';
    },
    play: function (choice) {
      const demonMove = getMoveFromNumber(getRandomInt(4));
      const playerMove = getMoveFromNumber(choice);
      const { demonValue, playerValue, logMessage } = getDamageValues(
        demonMove,
        playerMove
      );
      this.demonHealth += demonValue;
      this.playerHealth += playerValue;
      this.logs = [logMessage, ...this.logs];
      if (this.demonHealth <= 0) {
        this.demonHealth = 0;
        this.logs = ['Demon is dead! Player wins!', ...this.logs];
        this.header = 'YOU WIN';
        this.buttonMessage = 'RESTART';
        this.gameStarted = false;
        return;
      }
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.logs = ['Player is dead! Evil prevails!', ...this.logs];
        this.header = 'YOU LOSE';
        this.buttonMessage = 'RESTART';
        this.gameStarted = false;
        return;
      }
    },
  },
  computed: {
    isDemonInDanger: function () {
      return this.demonHealth < 30;
    },
    isPlayerInDanger: function () {
      return this.playerHealth < 30;
    },
    demonStyle: function () {
      return {
        width: this.demonHealth + '%',
      };
    },
    playerStyle: function () {
      return {
        width: this.playerHealth + '%',
      };
    },
  },
});
