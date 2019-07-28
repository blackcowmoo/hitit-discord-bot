/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

import '@/config';

// Import the discord.js module
import Discord from 'discord.js';
// import { hook } from '@/webhook';

// commands
import lolchess from './lolchess';

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  // hook.send('봇 살아남 !');
});

// Create an event listener for messages
client.on('message', message => {
  const [command, ...options] = message.content.split(' ');
  switch (command) {
    case '!lolchess':
    case '!롤토체스':
    case '!롤체':
      return lolchess(message, options);
    case '!내바박':
      return lolchess(message, ['고스트', '체스왕']);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_BOT_TOKEN);
