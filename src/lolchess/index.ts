import querystring from 'querystring';

import Discord from 'discord.js';
import rp from 'request-promise';

import cheerio from 'cheerio';

const lolchess = async (message: Discord.Message, options: string[]) => {
  const URL = 'https://lolchess.gg/profile/kr/' + querystring.escape(options.join(''));

  const html: string = await rp({ method: 'GET', uri: URL });
  const $ = cheerio.load(html);

  const tier = {
    닉네임: options.join(' '),
    티어: $('.profile__tier__summary .profile__tier__summary__tier').text(),
    LP: $('.profile__tier__summary .profile__tier__summary__lp').text(),
    랭크: [$('.profile__tier__summary .top-percent').text(), $('.profile__tier__summary .rank-region').text()].join(' / '),
  };

  message.channel.send(
    Object.entries(tier)
      .map(e => `${e[0]}: ${e[1]}`)
      .join('\n')
  );
};

export default lolchess;
