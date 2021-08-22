

const express = require('express');
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/usersRouter');

const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./configs/database');

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);


app.listen(8000);





