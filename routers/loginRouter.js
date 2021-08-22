const express = require('express');
const loginBL = require('../Models/LoginBL');

const router = express.Router();

router.route('/')
    .post(async (req, resp) => {
        try {
            const status = await loginBL.isUserValid(req.headers.username, req.headers.password);
            console.log(status);
            return resp.json(status);
        } catch (err) {
            console.log(err);
            return resp.json(err);
        }

    })


module.exports = router;