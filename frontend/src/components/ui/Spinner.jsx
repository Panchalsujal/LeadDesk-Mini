// Spinner — loading indicator
export default function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
    xl: 'w-12 h-12 border-4',
  };
  return (
    <span
      className={`inline-block rounded-full border-indigo-200 border-t-indigo-600 animate-spin ${sizeMap[size] || sizeMap.md} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
