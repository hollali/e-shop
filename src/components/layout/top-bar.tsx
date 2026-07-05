"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export function TopBar({
  items,
}: {
  items: { title: string; href: string }[];
}) {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-gray-100 border-b border-gray-200 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-9">
          <div className="flex items-center">
            <nav className="flex space-x-1">
              {items.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-xs text-gray-600 hover:text-primary px-2 py-1 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xs text-gray-600 hover:text-primary flex items-center gap-1 transition-colors">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              Location
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button className="text-xs text-gray-600 hover:text-primary transition-colors">
              GHS (¢)
            </button>
            <span className="text-xs text-gray-400">|</span>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-1">EN</span>
              English
            </div>
            <span className="text-xs text-gray-400">|</span>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-xs text-gray-600 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <span className="text-xs text-gray-400">/</span>
                <Link
                  href="/sign-up"
                  className="text-xs text-gray-600 hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
