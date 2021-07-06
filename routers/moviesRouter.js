const express = require('express');
const movieBL = require('../Models/moviesBL');
const movieDAL = require('../DALS/moviesRestDal');

const router = express.Router();

router.route('/')
    .get(async function (req,resp)
    {
        try
        {
            let result = await movieBL.getAllMoviesFromDB();
            console.log(result);
            return resp.json(result);

        }
        catch(err)
        {
            return resp.json(err);
        }
        
    })

    module.exports = router;
