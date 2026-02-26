// Importeer Express
import express from 'express';

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

// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}/workout`);
});