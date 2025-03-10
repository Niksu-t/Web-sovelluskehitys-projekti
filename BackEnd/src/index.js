import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import entryRouter from './routes/entry-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// middleware needed for vite functionality
app.use(cors());

// Static html page at root
app.use('/', express.static('docs'));
// middleware which reads json from request body
app.use(express.json());



// rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö apin juureen havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});


// Users resource endpoints
app.use('/api/users', userRouter);
// User authentication
app.use('/api/auth', authRouter);
// Diary entries endpoints
app.use('/api/entries', entryRouter);


app.use(notFoundHandler);
app.use(errorHandler);

// server starts
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});