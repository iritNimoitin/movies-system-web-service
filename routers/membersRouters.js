const express = require('express');
const memberBL = require('../Models/membersBL');

const router = express.Router;

router.route('/')
    .get(async (req, resp) => {
        try{
            let data = await memberBL.addMembersToDB();
            return resp.json(data);
        }catch(err){
            return resp.json(err);
        }
        
    })

