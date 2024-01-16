'use client'

import {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import React, {useCallback, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {FaShoppingCart} from "react-icons/fa";
import {BiCart} from "react-icons/bi";
import useLoginModal from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import useProductModal from "@/app/hooks/useProductModal";

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
                                               currentUser
                                           }) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const productModal = useProductModal()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const addItem = useCallback(() => {
        productModal.onOpen()


    }, [productModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {
                    }}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    <BiCart
                        size={22}
                    />
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[30vw]
                        md:w-[90%]
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                {currentUser.role === "ADMIN" && (
                                    <MenuItem
                                        onClick={addItem}
                                        label={"Добавить позицию"}
                                    />
                                )}
                                <MenuItem
                                    onClick={() => {
                                    }}
                                    label={"Корзина"}
                                />
                                <hr/>
                                <MenuItem
                                    onClick={() => signOut()}
                                    label={"Выйти"}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label={"Авторизация"}
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label={"Регистрация"}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu