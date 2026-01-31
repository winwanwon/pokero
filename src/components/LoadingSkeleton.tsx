import React from 'react';

interface Props {
  count?: number;
}

const LoadingSkeleton: React.FC<Props> = ({ count = 3 }) => {
  return (
    <div className="grid gap-2 sm:gap-3 grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-28 w-24 sm:h-32 sm:w-28 border border-slate-300 rounded-lg shadow-md bg-white flex flex-col justify-between items-center py-3 animate-pulse"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-slate-300 rounded-full flex justify-center items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-300 rounded-full" />
          </div>
          <div className="h-3 w-16 bg-slate-300 rounded" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
