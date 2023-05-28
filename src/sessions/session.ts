import {Socket} from "socket.io";

export class Session {

    private lastAccessedDate = new Date();

    public get lastAccessed(): Date {
        return this.lastAccessedDate;
    }

    constructor(public readonly sessionId: string, public readonly socket: Socket) {
    }
}