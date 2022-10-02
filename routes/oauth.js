
//requires

const express = require('express');

const { getPublicToken } = require('./common/oauth');

// router

let router = express.Router();

// generate a public access token

router.get('/token', async (req, res, next) => {
    try {
        const token = await getPublicToken();
        res.json({
            access_token: token.access_token,
            expires_in: token.expires_in
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;