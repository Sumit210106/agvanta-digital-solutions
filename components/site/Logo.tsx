"use client";

export function Logo({ className = "", textClassName = "" }: { className?: string; textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/Header.png" alt="Agvanta" className="h-16 w-auto" />
      {/* <span className={`text-base font-semibold tracking-tight ${textClassName}`}>
        Agvanta
      </span> */}
    </div>
  );
}