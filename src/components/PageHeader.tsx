interface PageHeaderProps {
  title: string;
  count?: number;
}

export default function PageHeader({ title, count }: PageHeaderProps) {
  return (
    <div className="bg-[#F8F9FB] px-4 rounded-t-lg">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title + badge */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-[#2C4A65]">{title}</h1>
          {count !== undefined && (
            <span className="bg-[#F26A5B] text-white text-xs px-2.5 py-1 rounded-full font-semibold">
              {count.toString().padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="mt-2 h-1 w-40 bg-[#34D1C4] rounded-full"></div>
      </div>
    </div>
  );
}
