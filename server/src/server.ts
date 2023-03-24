import mongoose from 'mongoose';
import app from './app';

const PORT: number = parseInt(process.env.PORT || '1234', 10);
const mongoDB: string = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

// Connect to mongo database and listen to requests
mongoose
  .connect(mongoDB)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}.`)))
  .catch((err: mongoose.Error) => console.error('Could not connect to MongoDB...', err));
  