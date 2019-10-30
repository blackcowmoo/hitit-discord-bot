import { Datastore, Query } from '@google-cloud/datastore';
import { RunQueryInfo } from '@google-cloud/datastore/build/src/query';

type DatastoreKind = 'command';

class DatastoreClient {
  private store: Datastore;

  constructor(projectId: string) {
    this.store = new Datastore({ projectId });
  }

  public createQuery(kind: DatastoreKind) {
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
}

export default new DatastoreClient(process.env.GOOGLE_DATASTORE_PROJECT_ID);
