import prisma from "@/app/libs/prismadb";

interface IParams {
    productId?: number
}

export default async function getProductById(
    params: IParams
) {
    try {
        const {productId} = params

        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId)
            },
        })

        if (!product) {
            return null
        }

        return {
            ...product,
            createdAd: product.createdAt.toISOString(),
            weight: product.weight.toDecimalPlaces(3),
            price: product.price.toDecimalPlaces(3),
        }
    } catch (error: any) {
        throw new Error(error)
    }
}