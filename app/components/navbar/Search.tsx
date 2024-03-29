'use client'

import {BiSearch} from "react-icons/bi";
import {useRouter} from "next/navigation";

const Search = () => {
    const router = useRouter()
    return (
        <div
            className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
        >

            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                "
            >

                <div
                    onClick={() => router.push('/')}
                    className="
                        text-sm
                        font-semibold
                        flex-1
                        px-6
                    "
                >
                    Ассортимент
                </div>
                <div
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                    "
                >
                    О нас
                </div>
                {/*<div*/}
                {/*    className="*/}
                {/*        hidden*/}
                {/*        sm:block*/}
                {/*        text-sm*/}
                {/*        font-semibold*/}
                {/*        px-6*/}
                {/*        border-x-[1px]*/}
                {/*        flex-1*/}
                {/*        text-center*/}
                {/*    "*/}
                {/*>*/}
                {/*    Отзывы*/}
                {/*</div>*/}
                <div
                    className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
                >
                    {/*<div className="hidden sm:block">Корзина</div>*/}
                    <div
                        className="
                            p-2
                            bg-black
                            rounded-full
                            text-white
                        "
                    >
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search