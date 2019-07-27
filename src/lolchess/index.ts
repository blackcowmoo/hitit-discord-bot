import Discord from 'discord.js';
import puppeteer from 'puppeteer';

const lolchess = async (message: Discord.Message, options: string[]) => {
  // Send "pong" to the same channel
  message.channel.send(JSON.stringify(options));
};

export default lolchess;
