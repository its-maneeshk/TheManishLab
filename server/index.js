const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

PORT = process.env.PORT || 4040;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log(`DB Error: ${err.message}`));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at port http://localhost:${PORT}`)
});// Auto update on 2024-06-15 - 16770 
// Auto update on 2024-04-05 - 16770 
// Auto update on 2024-07-08 - 16770 
// Auto update on 2024-06-13 - 16770 
// Auto update on 2025-02-02 - 16770 
// Auto update on 2024-09-21 - 16770 
// Auto update on 2024-09-30 - 12420 
