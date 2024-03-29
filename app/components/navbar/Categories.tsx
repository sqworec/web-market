'use client'

import Container from "@/app/components/Container";
import {TbBread, TbCake, TbCakeOff} from "react-icons/tb";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";

export const categories = [
    {
        label: "Сладости",
        icon: TbCake,
        description: 'Вкусняшки',
    },
    {
        label: "Хлебобулочные изделия",
        icon: TbBread,
        description: 'Хлеб батон',
    },
    {
        label: "Каравай",
        icon: TbCakeOff,
        description: 'Хлеб батон',
    },
]
const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathName = usePathname()

    const isMainPage = pathName === '/'

    if (!isMainPage) {
        return null
    }
    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))
                }
            </div>
        </Container>
    )
}

export default Categories