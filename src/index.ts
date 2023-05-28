import fastify, {FastifyReply, FastifyRequest} from 'fastify'
import {RegisterSocketIo} from "./plugins";
import {SetupSockets} from "./sockets";

const server = fastify();

RegisterSocketIo(server);

SetupSockets(server);

server.get('/ping', async (requestL: FastifyRequest, reply: FastifyReply) => {
    return 'pong\n'
});

server.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});
