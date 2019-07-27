import puppeteer from 'puppeteer';

export const getBrowser = async () => {
  return await puppeteer.launch({
    args: [
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--lang=ja,en-US;q=0.9,en;q=0.8',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    ],
  });
};

export const defaultViewport = {
  deviceScaleFactor: 1,
  hasTouch: false,
  height: 1024,
  isLandscape: false,
  isMobile: false,
  width: 1280,
};
