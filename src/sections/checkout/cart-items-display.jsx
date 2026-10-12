
"use client";

import { Image } from "@/components/image";
import { fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------

export function CartItemsDisplay({ items }) {
    if (!items || items.length === 0) return null;

    const subtotal = items.reduce((total, item) => {
        const price = parseFloat(item.price || 0);
        const qty = parseInt(item.quantity || 0);
        return total + price * qty;
    }, 0);

    return (
        <div className="rounded-xl bg-white shadow-md border border-gray-100">
            <div className="p-5 space-y-4">

                {/* ITEMS */}
                <div className="space-y-4">

                    {items.map((item, index) => (
                        <div key={item.cart_id || index}>

                            <div className="flex items-center gap-4">

                                {/* IMAGE */}
                                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        alt={item.product_name || item.name}
                                        title={item.product_name || item.name}
                                        src={item.featured_image || "/assets/placeholder.png"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* INFO */}
                                <div className="flex-1">

                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {item.product_name || item.name}
                                    </h3>

                                    {item.variant_name && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Variant: {item.variant_name}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4 mt-1">

                                        <span className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </span>

                                        <span className="text-sm font-medium text-gray-700">
                                            {fCurrency(item.price)}
                                        </span>

                                    </div>
                                </div>

                                {/* TOTAL */}
                                <div className="text-sm font-bold text-blue-600 whitespace-nowrap">
                                    {fCurrency(
                                        parseFloat(item.price) *
                                        parseInt(item.quantity)
                                    )}
                                </div>

                            </div>

                            {/* DIVIDER */}
                            {index < items.length - 1 && (
                                <div className="border-t border-gray-200 mt-4" />
                            )}

                        </div>
                    ))}

                </div>

                {/* FINAL DIVIDER */}
                <div className="border-t border-gray-200" />

                {/* SUBTOTAL */}
                <div className="flex items-center justify-between pt-1">
                    <span className="text-base font-semibold text-gray-900">
                        Cart Subtotal:
                    </span>

                    <span className="text-lg font-bold text-blue-600">
                        {fCurrency(subtotal)}
                    </span>
                </div>

            </div>
        </div>
    );
}