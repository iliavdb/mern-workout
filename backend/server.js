// Importeer Express
import express from 'express';
import mongoose from 'mongoose';

// Maak Express app
const app = express();

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

app.get('/api/workouts', (req, res) => {
  res.json({ 
    message: 'Alle Workouts',
    success: true
  });
})

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