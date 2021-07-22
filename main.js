const { addMembersToDB } = require("./Models/membersBL");
const { addMoviesToDB } = require("./Models/moviesBL");


const express = require('express');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouters');
const subscriptionRouter = require('./routers/subscriptionsRouter');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./configs/database');

app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscriptions', subscriptionRouter);

app.listen(8000);


initDB = async function () {
    await addMembersToDB();
    await addMoviesToDB();
}


