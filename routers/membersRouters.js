const express = require('express');
const memberBL = require('../Models/membersBL');
const router = express.Router();

router.route('/')
    .get(async (req, resp) => {
        try {
            let data = await memberBL.getAllMembersFromDB();
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/:id')
    .get(async (req, resp) => {
        try {
            let data = await memberBL.getMemberFromDBbyId(req.params.id);
            return resp.json(data);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/')
    .post(async (req, resp) => {
        try {
            let status = await memberBL.addOneMember(req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

router.route('/:id')
    .put(async (req, resp) => {
        try {
            let status = await memberBL.updateMemberDB(req.params.id, req.body);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })
router.route('/:id')
    .delete(async (req, resp) => {
        try {
            let status = await memberBL.deleteMemberFromDB(req.params.id);
            return resp.json(status);
        } catch (err) {
            return resp.json(err);
        }

    })

module.exports = router;