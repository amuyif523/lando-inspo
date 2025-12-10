export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">404</p>
        <h1 className="text-4xl md:text-6xl font-black display-font">Signal Lost</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you were looking for isn&apos;t transmitting. Let&apos;s route you back to the neural core.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-cyan text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
        >
          Return Home
        </a>
      </div>
    </main>
  );
}
