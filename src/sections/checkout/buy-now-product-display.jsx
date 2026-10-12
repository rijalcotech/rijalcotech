
"use client";

import { Image } from "@/components/image";
import { NumberInput } from "@/components/number-input";
import { fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------

export function BuyNowProductDisplay({
    product,
    quantity,
    onQuantityChange,
}) {
    if (!product) return null;

    const {
        name,
        featured_image,
        price,
        selling_price,
        flash_sale_products,
    } = product;

    const regularPrice = selling_price?.regularPrice || price;
    const flashSalePrice = selling_price?.flashSalePrice || price;

    const hasFlashSale =
        flash_sale_products && flash_sale_products.length > 0;

    const finalPrice =
        hasFlashSale &&
            parseFloat(flashSalePrice) < parseFloat(regularPrice)
            ? flashSalePrice
            : regularPrice;

    const subtotal = quantity * parseFloat(finalPrice);

    return (
        <div className="rounded-xl bg-white shadow-md border border-gray-100">
            <div className="p-5">

                <div className="flex flex-col gap-4">

                    {/* PRODUCT ROW */}
                    <div className="flex items-center gap-4">

                        {/* IMAGE */}
                        <div className="w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img
                                alt={name}
                                title={name}
                                src={featured_image || "/assets/placeholder.png"}
                                ratio="1/1"
                            />
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900">
                                {name}
                            </h3>

                            <div className="flex items-center gap-2 mt-2">
                                {hasFlashSale &&
                                    parseFloat(flashSalePrice) <
                                    parseFloat(regularPrice) && (
                                        <span className="text-sm text-gray-400 line-through">
                                            {fCurrency(regularPrice)}
                                        </span>
                                    )}

                                <span className="text-lg font-bold text-red-600">
                                    {fCurrency(finalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200" />

                    {/* QUANTITY */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Quantity:
                        </span>

                        <div className="w-[120px]">
                            <NumberInput
                                value={quantity}
                                onChange={(event, value) =>
                                    onQuantityChange(value)
                                }
                                min={1}
                                max={100}
                            />
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200" />

                    {/* SUBTOTAL */}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-900">
                            Subtotal:
                        </span>

                        <span className="text-lg font-bold text-purple-950">
                            {fCurrency(subtotal)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}