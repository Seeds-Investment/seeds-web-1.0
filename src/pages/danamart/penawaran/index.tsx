import withAuthDanamart from '@/helpers/withAuthDanamart';
import { useRouter } from 'next/router';
import React from 'react';

const Penawaran = (): React.ReactElement => {
  const router = useRouter();
  return (
    <div>
      Penawaran
      <button
        className="bg-red-50"
        onClick={async () => {
          await router.push(
            '/danamart/penawaran/prospektus?id=DM-EBUS-20241021111'
          );
        }}
      >
        tes button detail
      </button>
    </div>
  );
};

export default withAuthDanamart(Penawaran);