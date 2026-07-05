"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";
import { useCart } from "@/store/cart";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

export function Header({
  topBarItems,
  mainNavItems,
}: {
  topBarItems: { title: string; href: string }[];
  mainNavItems: NavItem[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isSignedIn } = useUser();
  const itemCount = useCart((s) => s.getItemCount());

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar items={topBarItems} />

      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary tracking-tight">
                STYLEHIVE
              </span>
              <span className="block text-[8px] text-gray-400 tracking-[0.2em] uppercase">
                Leading Online Fashion Store
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, categories or brands"
                  className="w-full h-10 pl-4 pr-12 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-primary text-white rounded-md">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="hidden sm:flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                <Heart size={20} />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>
              <Link href="/cart" className="relative flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-[16px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full px-1">
                    {itemCount}
                  </span>
                )}
                <span className="hidden lg:inline">Cart</span>
              </Link>
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center h-9 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="hidden sm:inline-flex items-center h-9 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                >
                  Sell Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden border-b border-gray-200 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 pl-4 pr-12 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-primary text-white rounded-md">
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      <MainNav items={mainNavItems} />

      {/* Mobile sidebar drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/" className="text-lg font-bold text-primary tracking-tight">
              STYLEHIVE
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100% - 7rem)" }}>
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block py-3 text-sm font-semibold uppercase text-gray-800 hover:text-primary border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            {!isSignedIn ? (
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full text-center py-2.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:border-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard"
                className="block w-full text-center py-2.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
