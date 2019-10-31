import { ds, DataStoreKind } from '@/models';

interface Echo {
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
    return ds.addEntity(DataStoreKind.echo, { id: undefined, text, message: message.join(' ') });
  }
};
