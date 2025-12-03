require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db/models'); // <-- NEW: Database models
const certificateRouter = require('./controllers/certificateController');


app.use(express.json());
app.use('/api', certificateRouter);


// Test DB connection
(async () => {
try {
await db.sequelize.authenticate();
console.log('Database connected successfully');
} catch (err) {
console.error('DB connection error:', err);
}
})();


module.exports = app;
```('dotenv').config();
const express = require('express');
const app = express();
const certificateRouter = require('./controllers/certificateController');


app.use(express.json());
app.use('/api', certificateRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
