export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/6"></div>
    </div>
  );
}