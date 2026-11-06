import React from 'react';

interface Props {
  count?: number;
}

const LoadingSkeleton: React.FC<Props> = ({ count = 3 }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 sm:gap-5" aria-label="Loading room">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-[5/7] w-[78px] animate-pulse rounded-lg bg-muted sm:w-[132px] sm:rounded-[10px]"
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
