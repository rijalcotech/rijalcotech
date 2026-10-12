export function ChatNavItemSkeleton({ itemCount = 6 }) {
  return Array.from({ length: itemCount }, (_, index) => (
    <div
      key={index}
      className="container mx-auto flex items-center gap-4 px-6 py-3"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />

      {/* Text lines */}
      <div className="flex flex-col flex-grow gap-2">
        <div className="h-2 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ));
}

// ------------------------------------------------------

export function ChatHeaderSkeleton() {
  return (
    <div className="container mx-auto flex items-center px-4 py-2">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

      {/* Name + subtitle */}
      <div className="flex flex-col gap-2 flex-grow mx-4">
        <div className="h-2 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 w-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Action icons */}
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse mx-2" />
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse mr-2" />
    </div>
  );
}

// ------------------------------------------------------

export function ChatRoomSkeleton() {
  return (
    <div className="container mx-auto pt-10 flex-1 flex flex-col">
      <div className="flex flex-col items-center justify-center">

        {/* Big avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />

        {/* Title line */}
        <div className="mt-6 mb-2 h-2 w-2/3 bg-gray-200 rounded animate-pulse" />

        {/* Subtitle line */}
        <div className="mb-10 h-2 w-1/3 bg-gray-200 rounded animate-pulse" />

        {/* Loader */}
        <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}