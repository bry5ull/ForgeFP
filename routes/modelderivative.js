
//requires

const express = require('express');
const {DerivativesApi, JobPayload, JobPayloadInput, JobPayloadOutput, JobSvfOutputPayload} = require('forge-apis');
const { getClient, getInternalToken } = require('./common/oauth');

//router

let router = express.Router();

// middleware

router.use(async (req, res, next) => {
    const token = await getInternalToken();
    req.oauth_token = token;
    req.oauth_client = getClient();
    next();
});

// POST /api/forge/modelderivative/jobs

router.post('/jobs', async (req, res, next) => {
    let job = new JobPayload();
    job.input = new JobPayloadInput();
    job.input.urn = req.body.objectName;
    job.output = new JobPayloadOutput([
        new JobSvfOutputPayload()
    ]);
    job.output.formats[0].type = 'svf';
    job.output.formats[0].views = ['2d', '3d'];
    try {

        // submit a translation job

        await new DerivativesApi().translate(job, {}, req.oauth_client, req.oauth_token);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
