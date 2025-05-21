import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ArticleList from './articles';
import NewsList from './news';

const SeedsPedia: React.FC = () => {
  const router = useRouter();
  const activeTabParam = Array.isArray(router.query.activeTabParams)
    ? router.query.activeTabParams[0]
    : router.query.activeTabParams;

  const [activeTab, setActiveTab] = useState('article');

  useEffect(() => {
    if (activeTabParam === 'news') {
      setActiveTab('news');
    } else {
      setActiveTab('article');
    }
  }, [activeTabParam]);

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };  

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full md:w-[30%] flex justify-center items-center mb-6 border-b border-gray-300">
        <button
          onClick={async() => {
            handleTabChange('article');
            await router.replace(router.pathname, undefined, { shallow: true })
          }}
          className={`w-full text-xl px-4 py-2 font-poppins transition-all ${
            activeTab === 'article'
              ? 'text-[#9A76FE] font-semibold border-b-4 border-[#9A76FE]'
              : 'text-[#7C7C7C] font-normal'
          }`}
        >
          Article
        </button>
        <button
          onClick={async() => { 
            handleTabChange('news');
            await router.replace(router.pathname, undefined, { shallow: true })
          }}
          className={`w-full text-xl px-4 py-2 font-poppins transition-all ${
            activeTab === 'news'
              ? 'text-[#9A76FE] font-semibold border-b-4 border-[#9A76FE]'
              : 'text-[#7C7C7C] font-normal'
          }`}
        >
          News
        </button>
      </div>

      <div className="w-full">
        {activeTab === 'article' ? (
          <ArticleList
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleTabChange={handleTabChange}
          />
        ) : (
          <NewsList
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleTabChange={handleTabChange}
          />
        )}
      </div>
    </div>
  );
};

export default SeedsPedia;