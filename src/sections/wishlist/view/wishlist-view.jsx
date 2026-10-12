"use client";


import { WishlistOverview } from "../wishlist-overview";

export function WishlistView() {
  return (
    <div className="container max-w-6xl my-5 mx-auto md:px-5 px-2 py-5"  >
      <h1 className="text-xl font-bold mb-3">
        Wishlist
      </h1>

      <WishlistOverview />
    </div>
  );
}
