import {FastifyInstance} from "fastify";
import { socketioServer } from 'fastify-socket.io';

export function RegisterSocketIo(fastify: FastifyInstance) {
    fastify.register(socketioServer, {
    });
}
