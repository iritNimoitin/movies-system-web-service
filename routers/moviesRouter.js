const express = require('express');
const movieBL = require('../Models/moviesBL');
const movieDAL = require('../DALS/moviesRestDal');

const router = express.Router();

router.route('/')
    .get(async function (req, resp) {
        try {
            let result = await movieBL.getAllMoviesFromDB();
            return resp.json(result);

        }
        catch (err) {
            return resp.json(err);
        }

    })
router.route('/:id')
    .get(async (req, resp) => {
        try {
            let data = await movieBL.getMovieFromDBbyId(req.params.id);
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/')
    .post(async (req, resp) => {
        try {
            let status = await movieBL.addOneMovie(req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/:id')
    .put(async (req, resp) => {
        try {
            console.log(req.body);
            let status = await movieBL.updateMovieDB(req.params.id, req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/:id')
    .delete(async (req, resp) => {
        try {
            let status = await movieBL.deleteMovieFromDB(req.params.id);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

module.exports = router;
