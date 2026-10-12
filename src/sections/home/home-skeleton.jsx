export function HomeViewSkeleton() {
    return (
        <div className="mx-auto container px-4 mt-6 mb-20 flex flex-col gap-12">

            {/* Hero Banner */}
            <Skel className="h-[300px] w-full rounded-xl sm:h-[400px] md:h-[500px]" />

            {/* About Section */}
            <div className="px-2 text-center md:px-16 flex flex-col items-center gap-2">
                <Skel className="h-8 w-[60%]" />
                <Skel className="h-4 w-[80%]" />
                <Skel className="h-4 w-[75%]" />
                <Skel className="h-4 w-[70%]" />
            </div>

            {/* Flash Sale & Best Sellers */}
            <div className="flex flex-col gap-8">
                {[0, 1].map((i) => (
                    <div key={i}>
                        <Skel className="mb-6 h-7 w-48" />
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {[...Array(4)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Categories */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                    {[...Array(8)].map((_, i) => <CategoryCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Trending Products */}
            <div>
                <Skel className="mb-6 h-7 w-48" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {[...Array(5)].map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-4">
                <Skel className="mx-auto mb-6 h-8 w-72" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => <TestimonialCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Video Testimonials */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-72" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Skel key={i} className="h-[200px] w-full rounded-xl" />
                    ))}
                </div>
            </div>

            {/* Featured Brands */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-48" />
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                        <Skel key={i} className="h-20 w-full rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Skin Concerns */}
            <div className="py-4">
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skel key={i} className="h-[150px] w-full rounded-xl" />
                    ))}
                </div>
            </div>

            {/* Tech Features */}
            <div className="rounded-xl bg-gray-100 py-6 px-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <Skel className="h-12 w-12 rounded-full" />
                            <Skel className="h-4 w-24" />
                            <Skel className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Logos */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-48" />
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                    {[...Array(8)].map((_, i) => (
                        <Skel key={i} className="h-[60px] w-full rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl bg-gray-100 px-6 py-10 flex flex-col items-center gap-4">
                <Skel className="h-7 w-72" />
                <Skel className="h-4 w-96" />
                <Skel className="h-12 w-96 rounded-lg" />
            </div>

            {/* FAQ */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="flex flex-col gap-3">
                    {[...Array(5)].map((_, i) => (
                        <Skel key={i} className="h-[60px] w-full rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Blog */}
            <div>
                <Skel className="mb-6 h-7 w-48" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)}
                </div>
            </div>

        </div>
    );
}

// ----------------------------------------------------------------------
// Primitive — a single animated skeleton block
// ----------------------------------------------------------------------

function Skel({ className = "" }) {
    return <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />;
}

// ----------------------------------------------------------------------
// Sub-skeletons
// ----------------------------------------------------------------------

function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200">
            <Skel className="w-full pt-[100%] rounded-none" />
            <div className="flex flex-col gap-2 p-3">
                <Skel className="h-4 w-4/5" />
                <div className="flex items-center justify-between">
                    <Skel className="h-4 w-14" />
                    <Skel className="h-6 w-6 rounded-full" />
                </div>
            </div>
        </div>
    );
}

function CategoryCardSkeleton() {
    return (
        <div className="flex flex-col items-center gap-2">
            <Skel className="h-[150px] w-full rounded-xl" />
            <Skel className="h-4 w-4/5" />
        </div>
    );
}

function TestimonialCardSkeleton() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <Skel className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                    <Skel className="h-4 w-3/5" />
                    <Skel className="h-4 w-2/5" />
                </div>
            </div>
            <Skel className="h-4 w-full" />
            <Skel className="h-4 w-full" />
            <Skel className="h-4 w-4/5" />
        </div>
    );
}

function BlogCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200">
            <Skel className="h-[200px] w-full rounded-none" />
            <div className="flex flex-col gap-2 p-3">
                <Skel className="h-4 w-[90%]" />
                <Skel className="h-4 w-full" />
                <Skel className="h-4 w-4/5" />
                <div className="mt-1 flex gap-2">
                    <Skel className="h-4 w-14" />
                    <Skel className="h-4 w-20" />
                </div>
            </div>
        </div>
    );
}