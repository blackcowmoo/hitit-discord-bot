// import Discord from 'discord.js';
import rp from 'request-promise';

// import { getBrowser } from '@/lib/puppeteer';

import cheerio from 'cheerio';

export const voo = async (): Promise<string> => {
  const URL = 'https://kr.investing.com/etfs/vanguard-s-p-500';
  const html: string = await rp({
    method: 'GET',
    uri: URL,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' },
  });
  const $ = cheerio.load(html);

  const price = $('.inlineblock.pid-38165-last').text();
  const dollar = $('.js-item-last.pid-650-last').text();

  const voo = {
    가격: price,
    환율: dollar,
    한국가격: parseInt(price.replace(',', ''), 10) * parseInt(dollar.replace(',', ''), 10),
  };

  return Object.entries(voo)
    .map(e => `${e[0]}: ${e[1]}`)
    .join('\n');
};
