import {Socket} from "socket.io";

export function getSessionId(socket: Socket): string {
    return <string>socket.request.headers['x-session'];
}