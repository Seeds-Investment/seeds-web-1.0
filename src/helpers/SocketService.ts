import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
class SocketService {
  private socket: Socket | null = null;

  connect(id: string): void {
    this.socket = io('wss://seeds-dev-gcp.seeds.finance', {
      transports: ['websocket'],
      query: { uuid: id }
    });
  }

  disconnect(id: string): void {
    if (this.socket !== null) {
      this.socket.emit('user.offline', {
        guid: this.socket.id,
        uuid: id
      });
      this.socket.disconnect();
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  sendMessage(roomId: any, message: any) {
    if (this.socket != null) {
      this.socket.emit('message', { roomId, message });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  receiveMessage(callback: (...args: any[]) => void) {
    if (this.socket != null) {
      this.socket.on('message', callback);
    }
  }

  emit(eventName: string, body?: object): void {
    if (this.socket !== null) {
      this.socket.emit(eventName, {
        guid: this.socket.id,
        body
      });
    }
  }

  addListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.socket !== null) {
      this.socket.on(eventName, callback);
    }
  }

  removeListener(eventName: string, callback: (...args: any[]) => void): void {
    if (this.socket !== null) {
      this.socket.off(eventName, callback);
    }
  }
}

export default new SocketService();
