import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getProducts from "@/app/actions/getProducts";
import ProductCard from "@/app/components/products/ProductCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {useCallback} from "react";

export default async function Home() {
    const products = await getProducts()
    const currentUser = await getCurrentUser()


    if (products.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <Container>
                <div className="
                    pt-24
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                ">
                    {products.map((product) => {
                        return (
                            <ProductCard
                                key={product.id}
                                data={product}
                                actionId={product.id}
                                disabled={false}
                                actionLabel="В корзину"
                            />
                        )
                    })}
                </div>
            </Container>
        </ClientOnly>
    )
}
