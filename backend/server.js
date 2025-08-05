const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Import auth routes

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes); // ✅ Use auth routes

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://2k22ece2212487:Abhi!234@cluster0.ot2a2db.mongodb.net/JOBNINJA?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check
app.get('/', (req, res) => {
  res.send('🎉 Backend is working and MongoDB is connected!');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
