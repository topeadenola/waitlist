// src/pages/api/v1/users/wait-list.js
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db('mydatabase');
    const collection = database.collection('waitlist');

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    await collection.insertOne({ email, timestamp: new Date() });
    res.status(201).json({ message: 'You have been added to the waitlist.' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal server error', error });
  } finally {
    await client.close();
  }
};

export default handler;
