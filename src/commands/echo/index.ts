import { getCommands } from '@/models/command';

export const echo = async (message: string) => {
  const commands = await getCommands();
  return JSON.stringify(commands);
};
