import { useRouter } from 'next/router';

const DetailCreatorSpaceQuiz: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  return <>{`ini idnya ${(id as string) ?? ''}`}</>;
};

export default DetailCreatorSpaceQuiz;
