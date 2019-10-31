import { Datastore, Query } from '@google-cloud/datastore';
import { RunQueryInfo } from '@google-cloud/datastore/build/src/query';
import { entity } from '@google-cloud/datastore/build/src/entity';

export enum DataStoreKind {
  command = 'command',
  echo = 'echo',
}

const toDatastore = (entity: any, nonIndexed?: string[]) => {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(entity).forEach(k => {
    if (entity[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: entity[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
    });
  });

  return results;
};

class DatastoreClient {
  private store: Datastore;

  constructor(projectId: string) {
    this.store = new Datastore({ projectId });
  }

  public createQuery(kind: DataStoreKind) {
    return this.store.createQuery([kind]);
  }

  public async runQuery<T = any>(q: Query) {
    return new Promise<{ entities: T[]; nextQuery: RunQueryInfo }>((resolve, reject) => {
      this.store.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          return reject(err);
        }

        resolve({ entities, nextQuery });
      });
    });
  }

  public async addEntity<T extends { id?: string }>(kind: DataStoreKind, data: T) {
    return new Promise<T>((resolve, reject) => {
      const key: entity.Key = data.id ? this.store.key([kind, parseInt(data.id, 10)]) : this.store.key(kind);

      const entity = {
        key: key,
        data: toDatastore(data),
      };

      this.store.save(entity, err => {
        data.id = entity.key.id;
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }
}

export const ds = new DatastoreClient(process.env.GOOGLE_DATASTORE_PROJECT_ID);
export default ds;
