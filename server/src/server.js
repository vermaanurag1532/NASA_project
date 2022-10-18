const http = require('http');
const app = require('./app.js');
const {
    loadPlanaetsData
} = require('./models/planets.model');

const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
    await loadPlanaetsData();
    server.listen(PORT, () => {
        console.log(`listening on PORT : ${PORT} ... `);
    })
}

startServer();