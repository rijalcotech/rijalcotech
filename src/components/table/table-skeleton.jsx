export function TableSkeleton({ rowCount = 5, cellCount = 5, className = "" }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className={className}>
          {Array.from({ length: cellCount }).map((_, cellIndex) => (
            <td key={cellIndex} className="px-3 py-2">
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}