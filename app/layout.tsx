import type {Metadata} from 'next'
import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const nunito = Nunito({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Cake Market',
    description: 'hi',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()


    return (
        <html lang="en">
        <body className={nunito.className}>
        <ClientOnly>
            <ToasterProvider/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
        </html>
    )
}
