// Importeer Express
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import workoutRoutes from './src/routes/workoutRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Voeg deze regel toe


// Maak Express app
const app = express();

// CORS toestaan voor frontend
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

// Middleware: lees JSON
app.use(express.json());

// Test route - reageer op GET /
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mijn eerste backend!',
    success: true
  });
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes); // Voeg deze regel toe


// Verbind met MongoDB en start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    
    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });