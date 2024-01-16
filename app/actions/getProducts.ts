import prisma from "@/app/libs/prismadb";

export default async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeProducts = products.map((product) => ({
            ...product,
            createdAt: product.createdAt.toISOString(),
            price: product.price.toDecimalPlaces(3),
            weight: product.weight.toDecimalPlaces(3)
        }))

        return safeProducts
    } catch (error: any) {
        throw new Error(error)
    }
}