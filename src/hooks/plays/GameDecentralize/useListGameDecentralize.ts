/* eslint-disable @typescript-eslint/explicit-function-return-type */

import PlayArena from '@/assets/play/quiz/play-arena-game-space.svg';
import SeedsGame from '@/assets/play/quiz/seeds-game-space.svg';
import { type GameSpaceI } from '@/components/play/CardGameSpace';

const listGame: GameSpaceI[] = [
  {
    image: SeedsGame,
    link: '/play/creator-space/quiz',
    name: 'Seeds Game'
  },
  {
    image: PlayArena,
    link: '/play/creator-space/play-arena',
    name: 'Play Game'
  }
];

const UseListGameDecentralize = () => {
  // Tambahkan logic jika ada nanti
  return {
    listGame
  };
};

export default UseListGameDecentralize;
