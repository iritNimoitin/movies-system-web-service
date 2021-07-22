const express = require('express');
const subscriptionBL = require('../Models/subscriptionsBL');
const moviesBL = require('../Models/moviesBL');
const router = express.Router();

router.route('/')
    .get(async (req, resp) => {
        try {
            let data = await subscriptionBL.getAllSubscriptionsFromDB();
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })
// router.route('/')
//     .get(async (req, resp) => {
//         try {
//             let data = await subscriptionBL.getAllSubscriptionsFromDB();
//             let result = [];
//             data.forEach(function (subscription) {
//                 subscription.Movies.forEach(function (movie) {
//                     let movieDB = await moviesBL.getMovieFromDBbyId(movie.movieId);
//                     let movieName = movieDB.name;

//                 });
//                 return resp.json(data);
//             }catch (err) {
//                 return resp.json(err);
//             }

//         })

router.route('/:id')
    .get(async (req, resp) => {
        try {
            let data = await subscriptionBL.getSubscriptionFromDBbyId(req.params.id);
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/')
    .post(async (req, resp) => {
        try {
            let status = await subscriptionBL.addOneSubscription(req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/:id')
    .put(async (req, resp) => {
        try {
            let status = await subscriptionBL.updateSubscriptionDB(req.params.id, req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/:id')
    .delete(async (req, resp) => {
        try {
            let status = await subscriptionBL.deleteSubscriptionFromDB(req.params.id);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

module.exports = router;