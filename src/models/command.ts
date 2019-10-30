import { ds } from '@/models';

const commandKind = 'command';

interface Command {
  name: string;
  echo: string;
  run: boolean;
}

export const getCommands = async () => {
  const query = ds.createQuery(commandKind);
  const { entities: data } = await ds.runQuery<Command>(query);

  return data;
};
