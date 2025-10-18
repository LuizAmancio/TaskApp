
"use client";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import { logout } from "@/lib/logout";
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, LogOut, PencilIcon, User } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const Header = () => {
    const auth = useAuth();
    const router = useRouter();
    const { showLoading, setShowLoading } = useLoading();

    const handleLogout = async () => {
        try {
            setShowLoading(true);
            await logout();
            router.push("/login");
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        if(auth?.loading){
            setShowLoading(true);
        }else{
            setShowLoading(false);
        }
    },[auth])

    return (
        <header className="fixed grid grid-cols-[12rem_auto_12rem] justify-stretch top-0 right-0 left-0 py-2 border-b text-center shadow-xl">
          <div></div>
          <div><Link className="" href="/">Tasks App</Link></div>
          <div>
            { auth != null && !auth.loading && !auth.user.error && auth.isAuthenticated && (

            <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
                    <User /> <span className="text-sm">{auth.user?.name || "Usuário"}</span>
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-gray/5 bg-gray-200 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                    </button>
                </MenuItem>
                
                <div className="my-1 h-px bg-gray-100" />
                <MenuItem>
                    <button onClick={handleLogout} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-red-300">
                    <LogOut className="size-4 fill-white/30" />
                    Logout
                    </button>
                </MenuItem>
                
                </MenuItems>
            </Menu>
            )}
          </div>
        </header>
    )
}