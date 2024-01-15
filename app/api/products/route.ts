import {NextResponse} from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        title,
        description,
        imageSrc,
        category,
        price,
        weight
    } = body

    Object.keys(body).forEach((value: any) => {
        if(!body[value]) {
            NextResponse.error()
        }
    })

    const product = await prisma.product.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            price,
            weight
        }
    })

    return NextResponse.json(product)
}