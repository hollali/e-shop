export function Newsletter() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Stay in the Loop
        </h2>
        <p className="text-white/80 mb-6">
          Subscribe to get special offers, free giveaways, and exclusive deals.
        </p>
        <form className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 h-12 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
