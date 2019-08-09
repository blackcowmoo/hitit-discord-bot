import path from 'path';
import puppeteer from 'puppeteer';

export const getBrowser = async () => {
  return await puppeteer.launch({
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--single-process'],
    ignoreDefaultArgs: ['--disable-extensions'],
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
