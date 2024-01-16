'use client'

import React from "react";
import {SafeUser} from "@/app/types";
import {AiFillCiCircle, AiFillPlusCircle, AiOutlinePlus} from "react-icons/ai";
import {MdOutlineCircle} from "react-icons/md";
import {BiPlusCircle} from "react-icons/bi";

interface PlusButtonProps {
    productId: string
    currentUser?: SafeUser | null
}

const PlusButton: React.FC<PlusButtonProps> = ({
                                                   productId,
                                                   currentUser
                                               }) => {
    const hasAdded = false
    const toggleFavourite = () => {}

    return (
        <div
            onClick={toggleFavourite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <BiPlusCircle
                size={24}
                className={
                    hasAdded ? 'fill-green-400' : 'fill-neutral-300'
                }
            />
        </div>
    )
}

export default PlusButton