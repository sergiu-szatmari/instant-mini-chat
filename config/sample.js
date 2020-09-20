module.exports = {
    App: {
        title: 'instant-mini-chat',
    },
    Server: {
        port: process.env.PORT || 80,
        socketPort: 8080,
        baseURL: 'http://localhost',
        socketURL: `${ this.baseURL }:${ this.socketPort }`,
        log: {
            silent: false
        }
    }
}
