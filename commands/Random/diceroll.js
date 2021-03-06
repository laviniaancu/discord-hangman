const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die... hopefully'
    });
  }
  async run(message, args) {
    this.leavemealone = 1;
    const roll = Math.floor(Math.random() * 6) + 1;
    message.reply(`you rolled a ${roll}`);
  }
}

module.exports = DiceRollCommand;
