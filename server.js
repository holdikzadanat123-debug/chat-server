const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);
    ws.on('message', (message) => {
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', () => {
        clients = clients.filter(c => c !== ws);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`✅ Сервер чата запущен на порту ${PORT}`));