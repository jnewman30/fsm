import {SessionList} from "./SessionList";
import {Socket} from "socket.io";
import {Session} from "./session";
import {getSessionId} from "../utilities";

export class SessionManager {
    public sessions: SessionList = {};

    public getOrCreateSession(socket: Socket): Session {
        const sessionId = getSessionId(socket);
        let session = this.sessions[sessionId];
        if (!session) {
            session = this.createSession(sessionId, socket);
        }
        return session;
    }

    private createSession(sessionId: string, socket: Socket): Session {
        return new Session(sessionId, socket);
    }
}
