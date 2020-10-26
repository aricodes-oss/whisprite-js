import { MongoClient } from 'mongodb';

const db = (async () => {
  const client = new MongoClient('mongodb://db:27017/whisprite', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  return client.db('whisprite');
})();

export const getCollection = async collName => {
  const dbInterface = await db;

  return dbInterface.collection(collName);
};

export const getNextSequence = async collName => {
  const dbInterface = await db;
  const sequences = dbInterface.collection('sequences');

  await sequences.findOneAndUpdate(
    { _id: collName },
    { $set: { _id: collName }, $inc: { current: 1 } },
    { upsert: true },
  );

  const newDoc = await sequences.findOne({ _id: collName });

  return newDoc.current;
};

export default db;
