'use client';
import Link from 'next/link';
import { FiType,FiTerminal, FiFile, FiArrowRight, FiSearch, FiHash, FiCode, FiSmartphone, FiKey, FiClock } from 'react-icons/fi';

const tools = [
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, camel case, and more',
    icon: <FiType />,
    category: 'Text Tools',
    popularity: 'high'
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, paragraphs, and reading time for any text',
    icon: <FiHash />,
    category: 'Text Tools',
    popularity: 'medium'
  },
  {
    id: 'find-replace',
    title: 'Find & Replace',
    description: 'Find and replace text with support for regex patterns and bulk operations',
    icon: <FiSearch />,
    category: 'Text Tools',
    popularity: 'high'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    icon: <FiCode />,
    category: 'Developer',
    popularity: 'high'
  },
  {
    id: 'mock-json-generator',
    title: 'Mock JSON Generator',
    description: 'Generate realistic mock JSON data from schemas instantly. Perfect for API testing, development, and prototyping with customizable fake data generation.',
    icon: <FiCode />,
    category: 'Generators',
    popularity: 'high',
    tags: ['mock', 'json', 'generator', 'api', 'testing']
  },
  {
    id: 'env-properties-parser',
    title: '.env & Properties Parser',
    description: 'Parse and convert .env files and Java properties files between JSON, YAML, and key-value formats',
    icon: <FiFile />,
    category: 'Developer',
    popularity: 'high',
    tags: ['env', 'properties', 'parser', 'json', 'yaml', 'key-value', 'dotenv', 'config']
  },
  {
      id: 'api-code-generator',
      title: 'API Code Generator',
      description: 'Generate ready-to-use API request code snippets in 10+ programming languages. Includes authentication, error handling, and TypeScript support. Free online tool for developers.',
      icon: <FiTerminal />,
      category: 'Developer',
      popularity: 'high',
      tags: ['api', 'code', 'generator', 'http', 'request', 'snippets']
    },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets',
    icon: <FiKey />,
    category: 'Generators',
    popularity: 'high'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, WiFi, and more with customization options',
    icon: <FiSmartphone />,
    category: 'Generators',
    popularity: 'high'
  },
  {
    id: 'cron-expression',
    title: 'Cron Expression Builder',
    description: 'Create and validate cron expressions with visual builder for automated tasks and jobs',
    icon: <FiClock />,
    category: 'Developer',
    popularity: 'high'
  }
];

export default function Home() {
  const popularTools = tools.filter(tool => tool.popularity === 'high');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Online Text & Developer Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive collection of free, fast, and secure online tools for developers, writers, and digital professionals. No registration required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ✅ 100% Free
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🔒 Privacy First
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              ⚡ Instant Results
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              📱 Mobile Friendly
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools</h2>
          <p className="text-gray-600">Most used tools by our community</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{tool.category}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
        {/* Enhanced Stats Section - Focus on Developer Pain Points */}
        <div className="text-center mb-16 py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Why Developers Choose Us
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 px-4">
            Tools built by developers, for developers - no fluff, just results
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-8xl mx-auto px-4">
            {/* Tool Count - Emphasize curation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                25<span className="text-indigo-600">+</span>
              </div>
              <div className="text-gray-900 font-medium">Handpicked Tools</div>
              <div className="text-sm text-gray-500 mt-1">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Zero bloat, pure utility
                </span>
              </div>
            </div>

            {/* Privacy - Technical explanation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                100<span className="text-green-600">%</span>
              </div>
              <div className="text-gray-900 font-medium">Client-Side Processing</div>
              <div className="text-sm text-gray-500 mt-1">
                Data never leaves your browser
              </div>
            </div>

            {/* Zero Registration - Add value prop */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 text-purple-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <span className="text-purple-600">0</span>
              </div>
              <div className="text-gray-900 font-medium">Account Needed</div>
              <div className="text-sm text-gray-500 mt-1">
                Start working in 3 seconds
              </div>
            </div>

            {/* New Metric - Performance focus */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                &lt;100<span className="text-amber-600">ms</span>
              </div>
              <div className="text-gray-900 font-medium">Tool Load Time</div>
              <div className="text-sm text-gray-500 mt-1">
                Optimized for developer workflow
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore All Tools
          </h2>
          <p className="text-gray-600 mb-6">
            Discover our complete collection of text manipulation, encoding, developer, and generator tools.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse All Tools
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}