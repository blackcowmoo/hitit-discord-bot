/**
 * Send a message using a webhook
 */

// Import the discord.js module
import Discord from 'discord.js';

// Create a new webhook
export const hook = new Discord.WebhookClient(process.env.DISCORD_WEBHOOK_ID, process.env.DISCORD_WEBHOOK_TOKEN);
