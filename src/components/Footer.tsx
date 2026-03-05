import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-12 w-48">
                <Image
                  src="/logo.png"
                  alt="Thrayambakam Official Logo"
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6">
              Let the rhythm of devotion be the only beat your heart follows.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/18EuvCdYNb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.instagram.com/thrayambakambhajans?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Bhajan Library
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Past & Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">
              Bhajan Categories
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/library?cat=shiva"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Shiva Bhajans
                </Link>
              </li>
              <li>
                <Link
                  href="/library?cat=krishna"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Krishna Bhajans
                </Link>
              </li>
              <li>
                <Link
                  href="/library?cat=devi"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Devi Bhajans
                </Link>
              </li>
              <li>
                <Link
                  href="/library?cat=ganapathy"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Ganapathy Bhajans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Ramapuram, Kerala, India</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+91 1234 567 890</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@thrayambakam.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} Bijali Jayalakshmi Jayan 
          </p>
        </div>
      </div>
    </footer>
  );
}
