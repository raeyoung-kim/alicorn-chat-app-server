import mongoose, { ConnectOptions } from 'mongoose';

export default function connect() {
  mongoose.connect(
    process.env.MONGODB_CONNECT! as string,
    {
      dbName: 'mobile-invitation',
    }! as ConnectOptions
  );

  mongoose.connection.on('open', (err) => {
    console.log('mongoDB connect :)');
  });

  mongoose.connection.on('error', (err) => {
    console.log('mongoDB error :(');
  });

  mongoose.connection.on('disconnection', (err) => {
    console.log('mongoDB connection retries !');
  });
}
