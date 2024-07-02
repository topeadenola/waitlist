// src/pages/api/v1/users/wait-list.js
import { MongoClient } from 'mongodb';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    // Save the email to the database
    await collection.insertOne({ email, timestamp: new Date() });

    // Define the email content and template data
    const msg = {
      to: email,
      from: 'ubreedlearn@gmail.com',
      templateId: 'd-0088a80ef1a34b58b5e578d303633911',
      dynamic_template_data: {
        // Populate dynamic data as required
      },
    };

    // Send the email
    await sgMail.send(msg);

    res.status(201).json({ message: 'You have been added to the waitlist and an email has been sent.' });
  } catch (error) {
    console.error('Error connecting to the database or sending email:', error);
    res.status(500).json({ message: 'Internal server error', error });
  } finally {
    await client.close();
  }
};

export default handler;





