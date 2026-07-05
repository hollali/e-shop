"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useAuth } from "@clerk/nextjs";

export function ProductDetailClient({ product, slug }: { product: any; slug: string }) {
  const addItem = useCart((s) => s.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId || !product) return;
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((items) => {
        if (items.some((i: any) => i.productId === product._id)) {
          setWishlisted(true);
        }
      })
      .catch(() => {});
  }, [userId, product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        images: product.images,
        inStock: product.inStock,
      },
      quantity,
      selectedSize,
      selectedColor
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleWishlist = async () => {
    if (!userId || !product) return;
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await fetch(`/api/wishlist?productId=${product._id}`, { method: "DELETE" });
        setWishlisted(false);
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
            productName: product.name,
            productSlug: product.slug,
            productPrice: Number(product.price),
            productImage:
              typeof product.images?.[0] === "string"
                ? product.images[0]
                : product.images?.[0]?.asset?.url || "",
          }),
        });
        setWishlisted(true);
      }
    } catch {} finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }, []);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-6">Product not found or no longer available.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const imageUrl = (img: any) =>
    typeof img === "string" ? img : img?.asset?.url || "https://via.placeholder.com/600x700/eee/999?text=Product";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-4">
            <img
              src={imageUrl(product.images?.[selectedImage])}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {product.images?.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === i
                    ? "border-primary"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={imageUrl(img)}
                  alt={`${product.name} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {product.categories?.[0]?.name}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <Badge variant="sale">
                  -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 px-4 text-sm rounded-md border ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 px-4 text-sm rounded-md border ${
                      selectedColor === color
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quantity
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
                className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
                className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Wishlist & Share row */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
                onClick={toggleWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Heart
                    size={16}
                    className={wishlisted ? "fill-red-500 text-red-500" : ""}
                  />
                )}
                {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
                onClick={handleShare}
              >
                <Share2 size={16} />
                {shareCopied ? "Copied!" : "Share"}
              </Button>
            </div>
            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full gap-2"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {!product.inStock ? (
                "Out of Stock"
              ) : added ? (
                <>
                  <Check size={20} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={20} /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}