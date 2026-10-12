"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { useGetCategories } from "@/api";
import { paths } from "@/routes/paths";
import { setCategory } from "@/redux/actions";

// ----------------------------------------------------------------------

export function HomeSkinConcerns() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { categories, isLoading: categoriesLoading } = useGetCategories();

    const handleClick = (id) => {
        dispatch(setCategory(id));
        router.push(paths.product.root);
    };

    if (categoriesLoading) {
        return (
            <section className="flex flex-col gap-8 py-2">
                <div className="h-[300px] animate-pulse rounded-3xl bg-gray-100" />
            </section>
        );
    }

    const footerCategories = categories?.filter((cat) => cat.show_in_footer === true);

    if (!footerCategories?.length) return null;

    return (
        <section className="container-fluid lg:my-8 my-4 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {footerCategories.slice(0, 4).map((concern, index) => (
                    <SkinConcernCard
                        key={concern.category_id}
                        concern={concern.name}
                        image={concern.web_image}
                        index={index}
                        onClick={() => handleClick(concern.category_id)}
                    />
                ))}
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------

function SkinConcernCard({ concern, image, index, onClick }) {
    const isDark = index % 2 === 0;

    if (isDark) {
        return (
            <div
                onClick={onClick}
                className="group relative min-h-[300px] md:min-h-[340px] rounded-[32px] overflow-hidden bg-[#09090b] cursor-pointer border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-white/20 flex flex-col justify-between p-7 md:p-9"
            >
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Gradient Radial Glow behind product */}
                <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/25 transition-all duration-700" />

                {/* Top Content: Title */}
                <div className="relative z-10 max-w-[280px]">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        {concern}
                    </h2>
                </div>

                {/* Center Right: Product Image */}
                <div className="absolute right-2 bottom-2 md:right-4 md:bottom-4 w-[55%] h-[75%] pointer-events-none transition-transform duration-700 group-hover:scale-105">
                    <Image
                        src={image || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"}
                        alt={concern}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-right-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    />
                </div>

                {/* Bottom Left: Glowing Pill Button */}
                <div className="relative z-10 mt-auto pt-6">
                    <button
                        className="relative group/btn inline-flex items-center gap-3 px-6 py-3 rounded-3xl bg-black/90 text-white font-bold text-sm md:text-base border border-red-500/40 transition-all duration-300 hover:scale-105"
                        style={{
                            boxShadow: "0 0 25px 2px rgba(220,38,38,0.4)",
                        }}
                    >
                        <span>Explore</span>
                        <span className="text-lg leading-none transition-transform group-hover/btn:translate-x-1">→</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className="group relative min-h-[300px] md:min-h-[340px] rounded-[32px] overflow-hidden cursor-pointer border border-gray-300/60 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col justify-between p-7 md:p-9"
            style={{
                background: "linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 50%, #d1d5db 100%)",
            }}
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

            {/* Top Content: Title */}
            <div className="relative z-10 max-w-[280px]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {concern}
                </h2>
            </div>

            {/* Center Right: Product Image */}
            <div className="absolute right-0 bottom-0 w-[55%] h-[75%] pointer-events-none transition-transform duration-700 group-hover:scale-105">
                <Image
                    src={image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"}
                    alt={concern}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-right-bottom mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                />
            </div>

            {/* Bottom Left: Dark Pill Button */}
            <div className="relative z-10 mt-auto pt-6">
                <button className="inline-flex items-center gap-3 px-6 py-3 rounded-3xl bg-[#18181b] text-white font-bold text-sm md:text-base shadow-lg transition-all duration-300 group-hover:bg-black group-hover:scale-105">
                    Explore
                    <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    );
}

