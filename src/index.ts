/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

import '@/config';

import lolchess from '@/lolchess';

import { app } from '@/lib/express';

app.use('/', async (req, res) => {
  try {
    if (!req.body.content) return res.status(404).send('');

    const [command, ...options] = req.body.content.split(' ');
    switch (command) {
      case '!lolchess':
      case '!롤토체스':
      case '!롤체':
        return res.send(lolchess(options));
      case '!내바박':
        return res.send(lolchess(['고스트', '체스왕']));
      case '!크로스핏':
        return res.send('https://namu.wiki/w/크로스핏');
    }
  } catch (err) {
    return res.status(500).send('');
  }
});

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, function() {
  console.log(`Express server has started on port ${port}`);
});
