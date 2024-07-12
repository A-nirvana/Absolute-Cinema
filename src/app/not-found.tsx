"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound: React.FC = () => {
    return (
        <main className="min-h-[90vh] flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-muted-foreground -mb-2">Error</h1>
            <div className=" rounded-3xl text-center bg-[url('/404.png')] aspect-[577/433] w-screen md:h-[500px] md:w-[700px] bg-cover drop-shadow-[0.5rem_0.5rem_0.2rem_#4444aa90] dark:drop-shadow-[0.5rem_0.5rem_0.2rem_#9999cc90]">
                <p className="text-7xl font-semibold text-muted-foreground mt-2">404</p>
            </div>
            <p className="text-xl font-semibold text-muted-foreground mt-4">Not all roads lead to Rome</p>
            <p className="md:text-xl font-semibold text-muted-foreground">We can`&apos;`t find what your`&apos;`re looking for,</p>
            <p className="md:text-xl font-semibold text-muted-foreground">You can go to</p>
            <div className="flex space-x-6 mt-4 mb-8">
                <Button variant="outline">
                    <Link href="/">
                        Home Page</Link>
                </Button>
                <Button variant="outline">
                    <Link href="https://anirban-feya.vercel.app">Dev`&apos;`s Portfolio
                    </Link>
                </Button>
            </div>

        </main>

    )
}

export default NotFound