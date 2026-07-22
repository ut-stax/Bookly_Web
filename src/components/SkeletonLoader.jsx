import React from "react";

export function BookCardSkeleton() {
  return (
    <div className="bg-slate-100/80 rounded-3xl p-5 animate-pulse border border-slate-200/60 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div className="w-20 h-5 bg-slate-200 rounded-full" />
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      </div>
      <div className="w-full aspect-[3/4] bg-slate-200 rounded-2xl mb-4" />
      <div className="space-y-2">
        <div className="w-3/4 h-5 bg-slate-200 rounded" />
        <div className="w-1/2 h-4 bg-slate-200 rounded" />
        <div className="flex justify-between pt-2">
          <div className="w-12 h-3 bg-slate-200 rounded" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="w-full h-10 bg-slate-200 rounded-xl mt-4" />
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
