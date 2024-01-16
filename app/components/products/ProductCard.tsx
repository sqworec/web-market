'use client'

import {SafeProduct, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import React, {useCallback} from "react";
import Image from "next/image";
import Button from "@/app/components/Button";

interface ProductCardProps {
    data: SafeProduct
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: number
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     data,
                                                     onAction,
                                                     disabled,
                                                     actionLabel,
                                                     actionId = "",
                                                 }) => {

    const router = useRouter()

    const handleCancel = useCallback(() => {
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if (disabled) {
                return
            }

            onAction?.(actionId.toString())
        }
    }, [onAction, actionId, disabled])


    return (
        <div
            onClick={() => router.push(`/products/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        src={data.imageSrc}
                        alt="Продукт"
                        className="
                            object-cover
                            h-full
                            w-full
                            group
                            group-hover:scale-110
                            transition
                        "
                    />
                    {/*<div className="absolute top-3 right-3">*/}
                    {/*    <PlusButton*/}
                    {/*        productId={data.id}*/}
                    {/*        currentUser={currentUser}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className="font-semibold text-xl">
                    {data.title}
                </div>
                <div className="font-light text-neutral-500 text-sm">
                    {data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        {data.price.toString()} BYN
                    </div>
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ProductCard