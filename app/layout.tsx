import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { FaGithub, FaBlog, FaHeart, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Free Developer Tools - Free Online Developer & Writer Tools',
  description: 'Free Developer Tools offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
  keywords: ['text tools', 'developer tools', 'writer tools', 'online utilities', 'regex tester', 'json formatter', 'markdown previewer'],
  authors: [{ name: 'Wynn Teo', url: 'https://wynntech.me' }],
  verification: {
    google: 'AyiXu4Zv1SkT9i3IbOTb11aIpLXEm-8MS2gS7Ey6W_M',
  },
  openGraph: {
    title: 'Free Developer Tools - Free Online Developer & Writer Tools',
    description: 'Free Developer Tools offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
    url: 'https://wynntech.me',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Tools - Free Online Developer & Writer Tools',
    description: 'Free Developer Tools offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
    images: ['https://yourwebsite.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">{children}</main>
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TT</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Free Developer Tools</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                  Empowering developers and writers with a comprehensive suite of free, lightning-fast online tools. 
                  Transform your workflow with our intuitive text manipulation and code formatting utilities.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>Made with</span>
                  <FaHeart className="h-4 w-4 text-red-500 animate-pulse" />
                  <span>by developers, for developers</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Access</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/" 
                      className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/tools" 
                      className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                      All Tools
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/feedback" 
                      className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full group-hover:w-2 transition-all duration-200"></span>
                      Feedback
                    </Link>
                  </li>

                </ul>
              </div>

              {/* Connect Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
                <div className="space-y-4">
                  <a
                    href="https://github.com/wynnteo/freedevtools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-200">
                      <FaGithub className="h-4 w-4" />
                    </div>
                    <span className="flex items-center gap-1">Star on GitHub <FaExternalLinkAlt className="h-3 w-3 opacity-50" /></span>
                    
                  </a>
                  <a 
                    href="https://wynntech.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-200">
                      <FaBlog className="h-4 w-4" />
                    </div>
                    <span className="flex items-center gap-1">
                      Blog
                      <FaExternalLinkAlt className="h-3 w-3 opacity-50" />
                    </span>
                  </a>
                  <Link 
                    href="/feedback"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-200">
                      <FaEnvelope className="h-4 w-4" />
                    </div>
                    <span>Contact Us</span>
                  </Link>
                  <a 
                    href="https://ko-fi.com/wynnteo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center group-hover:from-pink-600 group-hover:to-rose-600 transition-all duration-200">
                      <span className="text-sm">☕</span>
                    </div>
                    <span className="flex items-center gap-1">
                      Buy me a coffee
                      <FaExternalLinkAlt className="h-3 w-3 opacity-50" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-slate-400 text-sm">
                  © {new Date().getFullYear()} Free Developer Tools. Crafted with precision and care.
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-slate-400">No tracking • Open source</span>
                  <div className="flex items-center gap-1 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-FJZ3G5VM6H`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJZ3G5VM6H');
          `}
        </Script>
      </body>
    </html>
  );
}