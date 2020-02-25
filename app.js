const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const paginate = require('express-paginate');
const app = express();

app.use(paginate.middleware(10, 50));

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/articles', require('./routes/articles.routes'));

const PORT = 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.log('Server ERROR', e.message)
        process.exit(1)
    }
}

start();

app.listen(5000, ()=> {
    console.log('ON SERVER')
})