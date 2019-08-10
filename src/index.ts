/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

import '@/config';

import lolchess from '@/commands/lolchess';
import { voo } from '@/commands/stock';

import { app } from '@/lib/express';

const commandParser = async (command: string, ...options: string[]): Promise<string> => {
  switch (command) {
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
    case '!크로스핏':
      return 'https://namu.wiki/w/크로스핏';
    case '!VOO':
    case '!voo':
      return voo();
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
