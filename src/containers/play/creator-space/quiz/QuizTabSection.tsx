import React, { useState } from 'react';

interface QuizTabSectionProps {
  tabs?: string[]; // Opsi tab bisa dikustomisasi
  onTabChange?: (tab: string) => void; // Event ketika tab berubah
}

const QuizTabSection: React.FC<QuizTabSectionProps> = ({
  tabs = ['My Quiz', 'Pending Quiz'],
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
    if (onTabChange != null) onTabChange(tab);
  };

  return (
    <section className="w-full">
      <div className="flex flex-row border-b border-gray-400">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => {
              handleTabClick(tab);
            }}
            className={`flex w-1/2 justify-center py-2 transition-all duration-300 transform hover:scale-[102%] ${
              activeTab === tab ? 'border-b-2 border-seeds-green' : ''
            }`}
          >
            <span
              className={`text-lg transition-colors duration-300 ${
                activeTab === tab
                  ? 'font-bold text-seeds-green'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuizTabSection;
