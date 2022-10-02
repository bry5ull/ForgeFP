
// forge configuration

module.exports = {

    // set environment variables

    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK_URL
    },

    // set scopes

    scopes: {
        // required scopes for the server-side application

        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],

        // required scope for the client-side viewer

        public: ['viewables:read']
    }
};