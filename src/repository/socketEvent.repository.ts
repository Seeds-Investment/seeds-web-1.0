import io, { type Socket } from 'socket.io-client';
// import * as io from "socket.io-client";

class SocketEventService {
  private socket: Socket | null = null;

  connect(id: string): void {
    this.socket = io(
      process.env.SOCKET_URL ?? 'ws://seeds-dev-gcp.seeds.finance',
      {
        transports: ['websocket'],
        query: { user_id: id }
      }
    );
  }

  addListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.socket != null) {
      this.socket.on(eventName, callback);
    }
  }

  removeListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.socket != null) {
      this.socket.off(eventName, callback);
    }
  }
}

const socketEventService = new SocketEventService();
export default socketEventService;
