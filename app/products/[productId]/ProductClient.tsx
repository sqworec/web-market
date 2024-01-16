'use client'

import {SafeProduct, SafeUser} from "@/app/types";
import {useMemo} from "react";
import {categories} from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ProductHead from "@/app/components/products/ProductHead";
import ProductInfo from "@/app/components/products/ProductInfo";
import {Product} from "@prisma/client";

interface ProductClientProps {
    product: Product
}

const ProductClient: React.FC<ProductClientProps> = ({
                                                         product
                                                     }) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === product.category)
    }, [product.category])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ProductHead
                        title={product.title}
                        imageSrc={product.imageSrc}
                        id={product.id}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ProductInfo
                            category={category}
                            description={product.description}
                            weight={product.weight}
                            price={product.price}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductClient