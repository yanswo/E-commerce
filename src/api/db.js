import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server;
