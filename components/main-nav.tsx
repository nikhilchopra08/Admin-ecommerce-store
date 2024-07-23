"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserButton } from "@clerk/nextjs";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        { href: `/${params.storeId}`, label: 'Overview' },
        { href: `/${params.storeId}/billboards`, label: 'Billboards' },
        { href: `/${params.storeId}/categories`, label: 'Categories' },
        { href: `/${params.storeId}/sizes`, label: 'Sizes' },
        { href: `/${params.storeId}/colors`, label: 'Colors' },
        { href: `/${params.storeId}/products`, label: 'Products' },
        { href: `/${params.storeId}/orders`, label: 'Orders' },
        { href: `/${params.storeId}/settings`, label: 'Settings' },
    ];

    return (
        <nav className='fixed top-0 left-0 -right-4 z-10 bg-[#121212] bg-opacity-100'>
            <div className='flex flex-wrap items-center justify-between mx-auto px-4 py-2'>
                <Link href={"/"} className='text-2xl md:text-5xl text-white font-semibold'>
                    Logo
                </Link>
                <div className='mobile-menu block md:hidden'>
                    {!navbarOpen ? (
                        <button
                            onClick={() => setNavbarOpen(true)}
                            className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                            <FaBars className='h-5 w-5' />
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className='menu hidden md:flex md:w-auto'>
                    <ul className='flex md:p-0 md:flex-row md:space-x-8 mt-0'>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "flex items-center text-sm font-medium transition-colors hover:text-slate-400 text-white"
                                    )}
                                >
                                    <span>{route.label}</span>
                                </Link>
                            </li>

                        ))}
                        <UserButton afterSignOutUrl='/' />
                    </ul>
                </div>
            </div>
            {navbarOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-80 z-20'>
                    <div className="flex justify-end items-end px-3 py-2">
                        <button
                            onClick={() => setNavbarOpen(false)}
                            className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                            <FaTimes className='h-5 w-5' />
                        </button>
                        </div>
                    <div className='flex flex-col items-center pt-20'>
                        <ul className='flex flex-col space-y-4'>
                            {routes.map((route, index) => (
                                <li key={index}>
                                    <Link
                                        href={route.href}
                                        className={cn(
                                            "text-white text-lg font-medium transition-colors hover:text-slate-400"
                                        )}
                                        onClick={() => setNavbarOpen(false)}
                                    >
                                        <span>{route.label}</span>
                                    </Link>
                                </li>
                            ))}
                                                                <UserButton afterSignOutUrl='/' />
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}
