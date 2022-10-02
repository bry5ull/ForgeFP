
// requires

const { AuthClientTwoLegged } = require('forge-apis');

const config = require('../../config');

// initializes a client for 2-legged authentication

function getClient(scopes) {
    const { client_id, client_secret } = config.credentials;
    return new AuthClientTwoLegged(client_id, client_secret, scopes || config.scopes.internal);
}

let cache = new Map();
async function getToken(scopes) {
    const key = scopes.join('+');
    if (cache.has(key) && cache.get(key).expires_at > Date.now()) {
        return cache.get(key);
    }
    const client = getClient(scopes);
    let credentials = await client.authenticate();
    credentials.expires_at = Date.now() + credentials.expires_in * 1000;
    cache.set(key, credentials);
    return credentials;
}

// retrieves a 2-legged authentication token for public scopes
 
async function getPublicToken() {
    return getToken(config.scopes.public);
}

// retrieves a 2-legged authentication token for internal scopes
 
async function getInternalToken() {
    return getToken(config.scopes.internal);
}

module.exports = {
    getClient,
    getPublicToken,
    getInternalToken
};
