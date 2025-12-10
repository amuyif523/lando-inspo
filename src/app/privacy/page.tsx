export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Policy</p>
          <h1 className="text-4xl md:text-5xl font-black display-font mt-2">Privacy Notice</h1>
          <p className="text-gray-400 mt-2">Last updated: {new Date().getFullYear()}</p>
        </div>

        <p className="text-gray-300">
          This portfolio is informational. No personal data is collected beyond the details you choose to submit in the contact/inquiry forms.
        </p>

        <div className="space-y-4 text-gray-300">
          <div>
            <h2 className="text-xl font-bold text-white">What&apos;s collected</h2>
            <p className="text-gray-400">
              If you submit a form, your name, email, message, and selected modules are transmitted for follow-up. No tracking cookies or third-party pixels are in use.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">How it&apos;s used</h2>
            <p className="text-gray-400">
              Submitted details are used solely to respond to your inquiry. They are not shared or sold.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Storage & retention</h2>
            <p className="text-gray-400">
              Messages may be retained for follow-up. Request deletion anytime via email: hello@amanuel.dev.
            </p>
          </div>
        </div>

        <p className="text-gray-400">
          For any privacy questions, contact <a href="mailto:hello@amanuel.dev" className="text-cyan underline">hello@amanuel.dev</a>.
        </p>
      </div>
    </main>
  );
}
