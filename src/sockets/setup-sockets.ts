import {FastifyInstance} from "fastify";
import {Socket} from "socket.io";
import {SessionManager} from "../sessions";

const sessionManager = new SessionManager();

export function SetupSockets(server: FastifyInstance): void {

    server.io.on('connection', (socket: Socket) => {
        const session = sessionManager.getOrCreateSession(socket);
    });
}