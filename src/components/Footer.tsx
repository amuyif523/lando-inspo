import Link from "next/link";
import { Twitter, Instagram, Youtube, Twitch } from "lucide-react";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/landonorris" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/landonorris" },
  { name: "Twitch", icon: Twitch, href: "https://twitch.tv/landonorris" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/landonorris" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-3xl font-black italic tracking-tighter">
            LN<span className="text-lando">4</span>
          </h2>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lando Norris. All rights reserved.
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lando transition-colors transform hover:scale-110"
            >
              <social.icon size={24} />
              <span className="sr-only">{social.name}</span>
            </Link>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
      
      {/* Big Background Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.02]">
        <span className="text-[20vw] font-black leading-none text-white whitespace-nowrap">
          LANDO NORRIS
        </span>
      </div>
    </footer>
  );
}
