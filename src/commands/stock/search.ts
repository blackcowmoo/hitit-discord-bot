import rp from 'request-promise';
import { getStockFromInvesting } from './etf';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36';

export const stockSearch = async (ticker: string): Promise<string> => {
  const searchResult = await rp.post('https://kr.investing.com/search/service/searchTopBar', {
    formData: { search_text: ticker },
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      Connection: 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Accept-Charset': 'utf-8',
      'User-Agent': userAgent,
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://kr.investing.com',
      Referer: 'https://kr.investing.com/',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });

  const { quotes } = JSON.parse(searchResult);
  if (quotes.length) {
    return getStockFromInvesting(quotes[0].link, quotes[0].pairId);
  }
};
