import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import codeSnippetRouter from './routes/codeSnippetRouter';
import cors from 'cors';
import path from 'path';

const app: Express = express();

// Configure dotenv
dotenv.config();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the custom-made routers.
app.use('/api/user', userRouter);
app.use('/api/codeSnippet', codeSnippetRouter);

// Make the server work in both production and development modes
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) => res.sendFile(path.resolve("..", "client", "build", "index.html"))); 
} else if (process.env.NODE_ENV === "development") { 
  const corsOptions = { 
    origin: "http://localhost:3000", 
    optionsSuccessStatus: 200,  
  };
  app.use(cors(corsOptions));
}

export default app;
