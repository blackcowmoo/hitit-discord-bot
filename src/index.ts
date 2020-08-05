/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

import '@/config';
import Discord from 'discord.js';
import { commandParser } from '@/commands';

const client = new Discord.Client();

// Create an event listener for messages
client.on('message', async (message) => {
  if (!message.author.bot) {
    try {
      if (message && message.content) {
        const [command, ...options] = message.content.split(' ');
        const result = await commandParser(command, options);

        if (result) {
          message.channel.send(result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
