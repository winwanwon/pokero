import React from 'react';

interface Props {
  count?: number;
}

const LoadingSkeleton: React.FC<Props> = ({ count = 3 }) => {
  return (
    <>
      <div className="md:hidden w-5/6 md:w-auto grid grid-cols-1 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-12 border border-slate-300 rounded-lg shadow-md bg-white flex items-center animate-pulse"
          >
            <div className="w-2 h-2 rounded-full mx-4 bg-slate-300" />
            <div className="h-4 w-24 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
      <div className="hidden md:grid gap-2 grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-32 w-28 border border-slate-300 rounded-lg shadow-md bg-white flex flex-col justify-between items-center py-3 animate-pulse"
          >
            <div className="w-16 h-16 border-2 border-slate-300 rounded-full flex justify-center items-center">
              <div className="w-8 h-8 bg-slate-300 rounded-full" />
            </div>
            <div className="h-3 w-16 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
    </>
  );
};

export default LoadingSkeleton;
