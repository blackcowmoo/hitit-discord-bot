// import Discord from 'discord.js';
import rp from 'request-promise';

// import { getBrowser } from '@/lib/puppeteer';

import cheerio from 'cheerio';
import { makePrice } from '@/lib/utils/number';

const getStockFromInvesting = async (url: string, id: number) => {
  const URL = `https://kr.investing.com/etfs/${url}`;
  const html: string = await rp({
    method: 'GET',
    uri: URL,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' },
  });
  const $ = cheerio.load(html);

  const price = $(`.inlineblock.pid-${id}-last`).text();
  const dollar = $('.js-item-last.pid-650-last').text();

  const result = {
    가격: price,
    환율: dollar,
    한국가격: makePrice(+price.replace(',', '') * +dollar.replace(',', '')),
  };

  return Object.entries(result)
    .map(e => `${e[0]}: ${e[1]}`)
    .join('\n');
};

export const voo = async (): Promise<string> => await getStockFromInvesting('vanguard-s-p-500', 38165);
export const agg = async (): Promise<string> => await getStockFromInvesting('ishares-barclays-agg', 503);
export const tvix = async (): Promise<string> => await getStockFromInvesting('velocityshares-dly-2x-vix-sh.-term-historical-data', 38153);
export const mo = async (): Promise<string> => await getStockFromInvesting('altria-group', 8044);
