import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Package, Heart, Settings } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Profile Settings", href: "/account/settings", icon: Settings },
];

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User size={28} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-sm text-gray-500">Manage your account and orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <link.icon className="h-8 w-8 text-primary" />
                <span className="font-medium">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
