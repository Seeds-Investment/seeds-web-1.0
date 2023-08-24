import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ArticleList(): React.ReactElement {
  const articles = [
    // Daftar artikel (data mockup)
    {
      id: 1,
      trend: 'Trends',
      type: 'Apple :',
      content: 'New fitur from',
      content2: 'Iphone 13 pro',
      name: 'Robert Hans',
      updateAt: '12 Hours Ago',
      image: ''
    },
    {
      id: 2,
      trend: 'Trends',
      type: 'Apple :',
      content: 'New fitur from',
      content2: 'Iphone 13 pro',
      name: 'Robert Hans',
      updateAt: '12 Hours Ago',
      image: ''
    },
    {
      id: 3,
      trend: 'Trends',
      type: 'Apple :',
      content: 'New fitur from',
      content2: 'Iphone 13 pro',
      name: 'Robert Hans',
      updateAt: '12 Hours Ago',
      image: ''
    }
    // ... tambahkan lebih banyak artikel di sini
  ];
  const { t } = useTranslation();

  return (
    <div className="container font-poppins justify-center lg:ml-5 w-full  mx-4">
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <div className="text-base font-semibold">
            {t('articleList.text1')}
          </div>
          <div className="text-[#7C7C7C] font-normal text-xs">
            {t('articleList.text2')}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <input
            type="search"
            className="lg:w-[300px] lg:h-[40px] rounded-3xl border-[1px] px-[8px] justify-between py-[12px] text-[#7C7C7C] "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {articles.map(article => (
          <div
            key={article.id}
            className="p-4 border bg-[#F9F9F9] gap-[16px] border-gray-300 rounded"
          >
            <div className="flex justify-between">
              <div className="flex-row">
                <div className="px-3 w-[40%] rounded-full font-poppins bg-[#5E44FF] text-xs font-normal">
                  {article.trend}
                </div>
                <div className="flex ">
                  <p className="mt-2">{article.type}</p>
                  <p className="mt-2">{article.content}</p>
                </div>
                <div>
                  <p className="mt-1">{article.content2}</p>
                </div>
                <div className="flex mt-2 justify-between">
                  <p className="mt-1">{article.name}</p>
                  <p className="mt-1">{article.updateAt}</p>
                </div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="pagination">
          {/* Letakkan komponen Pagination di sini */}
        </div>
      </div>
    </div>
  );
}
