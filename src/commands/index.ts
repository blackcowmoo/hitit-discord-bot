import lolchess from '@/commands/lolchess';
import { stock } from '@/commands/stock';
import { stockSearch } from '@/commands/stock/search';

export const commandParser = async (command: string, options: string[]): Promise<string> => {
  // if (command[0] !== '!') {
  //   const echoResult = await echoMessage([command, ...options].join(' '));
  //   if (echoResult) {
  //     return echoResult;
  //   }
  // }

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
    // !deprecated
    // case '!echo':
    //   if (options.length === 0) {
    //     return (await getEchoMessage()).map((e) => `${e.text}: ${e.message}`).join('\n');
    //   }
    //   [, ...tmp] = options;
    //   return echo(options[0] || '', tmp.join(' ')) && '';
    // !deprecated
    // case '!!echo':
    //   return removeMessage(options[0]) && '';
  }

  const stockResult = await stock(command.toLowerCase());
  if (stockResult) {
    return stockResult;
  }

  try {
    if (command[0] === '!') {
      const stockSearchResult = await stockSearch(command.toLowerCase());
      if (stockSearchResult) {
        return stockSearchResult;
      }
    }
  } catch (err) {
    console.error(err);
  }
};
