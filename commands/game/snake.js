const Discord = require('discord.js')

const { Snake }  = require("weky")

module.exports = {
  name: 'snake',
  aliases: ["snek"],
  category: 'game',
  description: "Rắn săn mồi",
  usage: "snek",

  run: async(client , message , args) => {
  const game = new Snake({
            message: message,
                  embed: {
                           title: 'Snake', 
                           color: message.guild.me.displayHexColor, 
                           gameOverTitle: "Game Over", 
                  },
                 emojis: {
                          empty: '⬛', 
                          snakeBody: '🐍', 
                          food: ':apple:', 
                         //controls
                           up: '⬆️', 
                           right: '⬅️',
                           down: '⬇️',
                           left: '➡️'
                 }
                        })
        game.start()
    }
}