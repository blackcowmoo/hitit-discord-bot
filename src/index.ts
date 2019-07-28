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
  // TODO: 지금 살아있는 봇 체크 루틴 추가
  if (false) {
    client.destroy();
  }

  const [command, ...options] = message.content.split(' ');
  switch (command) {
    case '!lolchess':
    case '!롤토체스':
    case '!롤체':
      return lolchess(message, options);
    case '!내바박':
      return lolchess(message, ['고스트', '체스왕']);
    case '!크로스핏':
      return message.channel.send('https://namu.wiki/w/크로스핏');
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_BOT_TOKEN);
