// Собственный сервер связи PeerJS (то же, что бесплатный 0.peerjs.com, но свой).
// Порт хостинг передаёт сам через переменную PORT.
const { PeerServer } = require("peer");
const port = Number(process.env.PORT) || 9000;

const server = PeerServer({
  port,
  path: "/",            // клиент на сайте использует path "/"
  key: "peerjs",        // тот же ключ, что в коде сайта (KEY)
  proxied: true,        // сервер стоит за прокси хостинга
  allow_discovery: false,
  alive_timeout: 60000,
  concurrent_limit: 500,
  corsOptions: { origin: "*" }
});

server.on("connection", c => console.log("+ подключился", String(c.getId()).slice(0, 14)));
server.on("disconnect", c => console.log("- отключился", String(c.getId()).slice(0, 14)));
console.log("PeerServer запущен, порт", port);
