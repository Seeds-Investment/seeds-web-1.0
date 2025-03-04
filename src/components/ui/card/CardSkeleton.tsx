import React from 'react';

interface SkeletonCardProps {
  size?: 'fit' | 'custom'; // Mode ukuran
  customWidth?: string; // Ukuran jika mode "custom"
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  size = 'fit',
  customWidth = '200px'
}) => {
  const cardWidth = size === 'fit' ? 'w-full' : `w-[${customWidth}]`;

  return (
    <div className={`rounded-lg shadow-md p-4 space-y-5 ${cardWidth} bg-white`}>
      {/* Skeleton Header */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="h-24 w-full bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Skeleton Text Section */}
      <div className="space-y-3">
        <div className="h-3 w-3/5 bg-gray-200 rounded-lg animate-shimmer"></div>
        <div className="h-3 w-4/5 bg-gray-200 rounded-lg animate-shimmer"></div>
        <div className="h-3 w-2/5 bg-gray-300 rounded-lg animate-shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
