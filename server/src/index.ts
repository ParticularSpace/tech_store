import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tech_store')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Routes
app.get('/', (req, res) => res.send('Hello from the server!'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
