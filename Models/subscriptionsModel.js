const mongoose = require('mongoose');

let SubscriptionsSchema = new mongoose.Schema({
    MemberId: String,
    Movies: [{ movieId: String, movieName: String, date: Date }]
})

module.exports = mongoose.model('subscriptions', SubscriptionsSchema);