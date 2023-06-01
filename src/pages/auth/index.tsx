import type { ReactElement } from 'react';

const Page: any = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <div className="bg-green-100">{page}</div>;
};

export default Page;
