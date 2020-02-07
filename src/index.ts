/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

import '@/config';

import lolchess from '@/commands/lolchess';
import { stock } from '@/commands/stock';
import { echo, echoMessage, removeMessage, getEchoMessage } from '@/commands/echo';

import { app } from '@/lib/express';
import { stockSearch } from './commands/stock/search';

const commandParser = async (command: string, options: string[]): Promise<string> => {
  let tmp: any;

  switch (command.toLowerCase()) {
    case '!lolchess':
    case '!롤토체스':
    case '!롤체':
      return lolchess(options);
    case '!내바박':
      return lolchess(['고스트', '체스왕']);
    case '!천년정지':
      return lolchess(['Aind']);
    case '!주머니':
      return lolchess(['영판항']);
    case '!주사위':
      return Math.ceil(Math.random() * +options[0]).toString();
    case '!가바보':
    case '!강감찬':
    case '!가위바위보':
      return ['가위', '바위', '보'][Math.floor(Math.random() * 3)];
    // case '!cmd':
    //   return 'Command: ' + (await echo([command, ...options].join(' ')));
    case '!echo':
      if (options.length === 0) {
        return (await getEchoMessage()).map(e => `${e.text}: ${e.message}`).join('\n');
      }

      [, ...tmp] = options;

      return echo(options[0] || '', tmp.join(' ')) && '';

    case '!!echo':
      return removeMessage(options[0]) && '';
  }

  const stockResult = await stock(command.toLowerCase());
  if (stockResult) {
    return stockResult;
  }

  if (command[0] !== '!') {
    const echoResult = await echoMessage([command, ...options].join(' '));
    if (echoResult) {
      return echoResult;
    }
  }

  try {
    const stockSearchResult = await stockSearch(command.toLowerCase());
    if (stockSearchResult) {
      return stockSearchResult;
    }
  } catch (err) {
    console.error(err);
  }
};

app.use('/', async (req, res) => {
  try {
    if (!req.query.content) return res.status(404).send('');
    const [command, ...options] = req.query.content.split(' ');
    return res.send(await commandParser(command, options));
  } catch (err) {
    console.error(err);
    return res.status(500).send('');
  }
});

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, function() {
  console.log(`Express server has started on port ${port}`);
});
