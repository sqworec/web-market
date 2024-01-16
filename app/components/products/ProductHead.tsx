'use client'

import Heading from "@/app/components/Heading";
import Image from "next/image";

interface ProductHeadProps {
    title: string
    imageSrc: string
    id: number
}

const ProductHead: React.FC<ProductHeadProps> = ({
                                                     title,
                                                     imageSrc,
                                                     id
                                                 }) => {
    return (
        <>
            <Heading
                title={title}
                subtitle={``}
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    src={imageSrc}
                    alt="Фотокарточка"
                    width={500}
                    height={500}
                />
            </div>
        </>
    )
}

export default ProductHead