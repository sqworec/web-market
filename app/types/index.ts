import {Product, User} from "@prisma/client";
import prisma from "@/app/libs/prismadb";
import {Decimal} from "@prisma/client/runtime/library";

export type SafeProduct = Omit<Product, "createdAt"> & {
    createdAt: string;
    weight: Decimal
    price: Decimal;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};