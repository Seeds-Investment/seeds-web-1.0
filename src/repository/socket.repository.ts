import io, { type Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(id: string): void {
    this.socket = io(
      process.env.SOCKET_URL ?? 'wss://seeds-dev-gcp.seeds.finance',
      {
        transports: ['websocket'],
        query: { uuid: id }
      }
    );
    console.log('connect chat: ', this.socket)
  }

  disconnect(id: string): void {
    if (this.socket != null) {
      this.socket.emit('user.offline', {
        guid: this.socket.id,
        uuid: id
      });
      this.socket.disconnect();
    }
  }

  emit(eventName: string, body?: object): void {
    if (this.socket != null) {
      this.socket.emit(eventName, {
        guid: this.socket.id,
        body
      });
    }
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

const socketService = new SocketService();
export default socketService;
