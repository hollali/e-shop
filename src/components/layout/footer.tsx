import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">STYLEHIVE</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading Online Fashion Store in Africa. Shop for shoes, clothing,
              jewellery, dresses and more from top brands and local stores.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/style-gallery" className="hover:text-primary transition-colors">Style Gallery</Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-primary transition-colors">Our Shops</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=men" className="hover:text-primary transition-colors">Men</Link>
              </li>
              <li>
                <Link href="/products?category=women" className="hover:text-primary transition-colors">Women</Link>
              </li>
              <li>
                <Link href="/products?category=unisex" className="hover:text-primary transition-colors">Unisex</Link>
              </li>
              <li>
                <Link href="/products?category=brands" className="hover:text-primary transition-colors">Brands</Link>
              </li>
              <li>
                <Link href="/products?discount=true" className="hover:text-primary transition-colors">Discount</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} StyleHive. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-primary cursor-pointer transition-colors">TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
