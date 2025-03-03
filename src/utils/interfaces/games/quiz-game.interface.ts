export interface QuizGameI {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar: string;
  };
  entryFee: number;
  duration: string;
  players: number;
  image: string;
  link: string;
  isPending: boolean;
}
