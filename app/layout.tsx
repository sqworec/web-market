import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Cake Market',
    description: 'hi',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientOnly>
            <RegisterModal/>
            <Navbar/>
        </ClientOnly>
        {children}
        </body>
        </html>
    )
}
