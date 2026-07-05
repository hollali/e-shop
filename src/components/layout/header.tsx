"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { TopBar } from "./top-bar";
import { MainNav } from "./main-nav";
import { useCart } from "@/store/cart";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isSignedIn } = useUser();
  const itemCount = useCart((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />

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
                  href="/auth/login"
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

      <MainNav />

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {["MEN", "WOMEN", "BRANDS", "DISCOUNT", "UNISEX"].map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat.toLowerCase()}`}
                className="block py-2 text-sm font-semibold uppercase text-gray-800 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <hr className="my-2" />
            {!isSignedIn && (
              <>
                <Link
                  href="/auth/login"
                  className="block py-2 text-sm text-gray-600 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 text-sm text-gray-600 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
