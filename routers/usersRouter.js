const express = require('express');
const userBL = require('../Models/UserBL');
const UserDal = require('../DAL/usersDAL')

const router = express.Router();

router.route('/')
    .get(async function (req, resp) {
        try {
            let result = await userBL.getAllUsersFromDB();
            return resp.json(result);

        }
        catch (err) {
            return resp.json(err);
        }

    })
router.route('/all')
    .get(async function (req, resp) {
        try {
            let result = await UserDal.getUsersFromJson();
            return resp.json(result);

        }
        catch (err) {
            return resp.json(err);
        }

    })
router.route('/user/:id')
    .get(async (req, resp) => {
        try {
            let data = await userBL.getUserFromDBbyId(req.params.id);
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/details')
    .get(async (req, resp) => {
        try {
            let data = await userBL.getAllUsersDetails();
            console.log(data);
            return resp.json(data);
        } catch (err) {
            console.log(err);
            return resp.json(err);
        }

    })
router.route('/user/:username')
    .post(async (req, resp) => {
        try {
            let data = await userBL.getUserFromDB(req.params.username);
            console.log(data);
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/user')
    .post(async (req, resp) => {
        try {
            let status = await userBL.addUserPassword(req.headers.username, req.headers.password);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/')
    .post(async (req, resp) => {
        try {
            let status = await userBL.AddUser(req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/')
    .put(async (req, resp) => {
        try {
            let status = await userBL.updateUser(req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
// router.route('/:id')
//     .put(async (req, resp) => {
//         try {
//             console.log(req.body);
//             let status = await movieBL.updateMovieDB(req.params.id, req.body);
//             return resp.json(status);
//         } catch (err) {
//             return resp.json(err);
//         }

//     })
// router.route('/:id')
//     .delete(async (req, resp) => {
//         try {
//             let status = await movieBL.deleteMovieFromDB(req.params.id);
//             return resp.json(status);
//         } catch (err) {
//             return resp.json(err);
//         }

//     })
router.route('/:id')
    .delete(async (req, resp) => {
        try {
            let status = await userBL.deleteUser(req.params.id)
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

module.exports = router;