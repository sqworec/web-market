'use client'

import React from "react";
import {IconType} from "react-icons";
import {Decimal} from "@prisma/client/runtime/library";
import ProductCategory from "@/app/components/products/ProductCategory";
import Button from "@/app/components/Button";

interface ProductInfoProps {
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    description: string
    weight: Decimal
    price: Decimal
}

const ProductInfo: React.FC<ProductInfoProps> = ({
                                                     category,
                                                     description,
                                                     weight,
                                                     price
                                                 }) => {

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        {weight.toString()} кг
                    </div>
                </div>
            </div>
            <hr/>
            {category && (
                <ProductCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Button
                onClick={() => {}}
                label="В корзину"
            />
        </div>
    )
}

export default ProductInfo