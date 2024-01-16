import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ProductClient from "@/app/products/[productId]/ProductClient";

interface IParams {
    productId?: number
}
const ProductPage = async ({params} : {params: IParams}) => {
    const product = await getProductById(params)

    if (!product) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ProductClient
                product={product}
            />
        </ClientOnly>
    )
}

export default ProductPage