/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import socketService from '@/repository/socket.repository';
import { useEffect, useState } from 'react';

const useChat = () => {
  const [connect, setConnect] = useState(false);
  console.log(connect, 'cek connect');

  useEffect(() => {
    socketService.connectAsset();

    socketService.addListener('connect', () => {
      setConnect(true);
    });
    console.log('masuk');

    socketService.addListener('joined_room', (message: any) => {
      console.log('joinned room:', message, 'cek');
    });
    console.log('masuk 2');

    socketService.addListener('last_price', (message: any) => {
      console.log(message, 'cek');
    });

    return () => {
      socketService.disconnectAsset();
    };
  }, []);

  useEffect(() => {
    if (connect) {
      socketService.emit('join_room', { body: { ticker: 'AAPL' } });
    }
  }, [connect]);
};

export default useChat;
