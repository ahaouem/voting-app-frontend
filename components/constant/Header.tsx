"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Bell } from "lucide-react";
import Link from "next/link";
import CategoriesNavbar from "./CategoriesNavbar";
import { useParams } from "next/navigation";

export default function Header({ userId }: { userId: string }): JSX.Element {
    // filter in DB votings w/ { category }
    const { category }: { category: string } = useParams();

    return (
        <section className="p-7 flex flex-col items-center justify-between w-screen bg-black">
            <header className="w-full flex items-center justify-between pb-3">
                {/* Logo */}
                <Link href={"/"} className="text-3xl font-bold text-white">
                    Cloak
                </Link>
                <section className="flex items-center justify-end gap-x-2">
                    <Link
                        href={"/notifications"}
                        className="border rounded-full p-2 w-7 h-7 flex items-center justify-center text-white"
                    >
                        <Bell size={20} />
                    </Link>
                    <UserButton
                        appearance={{
                            baseTheme: dark,
                        }}
                    />
                </section>
            </header>
            <CategoriesNavbar userId={userId} />
        </section>
    );
}
