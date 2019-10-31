import { ds, DataStoreKind } from '@/models';

interface Echo {
  id?: string;
  text: string;
  message: string;
}

export const getEchoMessages = async () => {
  const query = ds.createQuery(DataStoreKind.echo);
  const { entities: data } = await ds.runQuery<Echo>(query);

  return data;
};

export const addEchoMessage = async (text?: string, ...message: string[]) => {
  if (text && message && message.length > 0) {
    const echoMessages = await getEchoMessages();
    const alreadyMessage = echoMessages.filter(m => m.text === text);
    for (const m of alreadyMessage) {
      await ds.deleteEntity(DataStoreKind.echo, m.id || '');
    }

    return ds.addEntity(DataStoreKind.echo, { id: undefined, text, message: message.join(' ') });
  }
};
