export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Terms</p>
          <h1 className="text-4xl md:text-5xl font-black display-font mt-2">Terms of Use</h1>
          <p className="text-gray-400 mt-2">Last updated: {new Date().getFullYear()}</p>
        </div>

        <p className="text-gray-300">
          This site showcases work by Amanuel Fikremariam. Use it for informational purposes only. Do not misuse interactive features or attempt to breach security.
        </p>

        <div className="space-y-4 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">No warranties</h2>
            <p className="text-gray-400">
              Content is provided &quot;as is&quot; without warranties. Links to external sites are not endorsements.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Intellectual property</h2>
            <p className="text-gray-400">
              Designs, copy, and code samples are owned by Amanuel unless otherwise noted. Do not reproduce without permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p className="text-gray-400">
              For questions about these terms, email <a href="mailto:hello@amanuel.dev" className="text-cyan underline">hello@amanuel.dev</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
