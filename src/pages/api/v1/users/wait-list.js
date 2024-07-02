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
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('mydatabase');
    const collection = database.collection('waitlist');

    const { email } = req.body;
    console.log('Request body:', req.body);

    if (!email) {
      console.error('No email provided');
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('Saving email to the database...');
    await collection.insertOne({ email, timestamp: new Date() });
    console.log('Email saved to the database');

    // Define the email content
    // const msg = {
    //   to: email,
    //   from: 'tope.adenola@gmail.com', // Change to your verified sender
    //   subject: 'Welcome to the Waitlist',
    //   text: 'Thank you for joining our waitlist.',
    //   html: '<strong>Thank you for joining our waitlist.</strong>',
    // };

    // console.log('Sending email with SendGrid...');
    // await sgMail.send(msg);
    // console.log('Email sent successfully');


    //and an email has been sent.
    res.status(201).json({ message: 'You have been added to the waitlist ' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

export default handler;
