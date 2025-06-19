'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiLink, FiHome, FiChevronRight, FiType, FiAlignLeft, FiSettings, FiArrowRight, FiHash } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Slug Converter",
    "url": "https://freedevtools.dev/tools/slug-converter",
    "description": "Free online slug converter tool to create SEO-friendly URL slugs from text with customizable separators and formatting options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert text to URL-friendly slugs",
      "Custom separator options (hyphen/underscore)",
      "Preserve or force lowercase",
      "Handle special characters and diacritics",
      "Real-time conversion",
      "One-click copy to clipboard"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Free Developer Tools"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb component
function Breadcrumb() {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-indigo-600 flex items-center">
        <FiHome className="w-4 h-4 mr-1" />
        Home
      </Link>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <Link href="/tools" className="hover:text-indigo-600">
        Tools
      </Link>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <span className="text-gray-900 font-medium">Slug Converter</span>
    </nav>
  );
}

// Main component
export default function SlugConverterClient() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [options, setOptions] = useState({
    separator: '-',
    preserveCase: false,
    trim: true
  });
  const [copied, setCopied] = useState(false);

  const convertToSlug = (text: string) => {
    if (!text) return '';
    
    let result = text
      .normalize("NFD") // Normalize diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
      .replace(/[\s_]+/g, options.separator) // Replace spaces/underscores with separator
      .replace(new RegExp(`\\${options.separator}+`, 'g'), options.separator); // Replace multiple separators
    
    if (!options.preserveCase) {
      result = result.toLowerCase();
    }
    
    if (options.trim) {
      result = result.replace(new RegExp(`^\\${options.separator}+|\\${options.separator}+$`, 'g'), '');
    }
    
    return result;
  };

  useEffect(() => {
    setSlug(convertToSlug(input));
  }, [input, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setSlug('');
  };

  const editSlug = () => {
    setInput(slug);
  };

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiLink className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Slug Converter Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create SEO-friendly URL slugs from any text. Perfect for blog posts, 
              product URLs, and web development with customizable formatting options.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to convert to slug:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here (e.g., 'Hello World! 2024 Report')"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Conversion Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, separator: '-'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.separator === '-'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  Hyphen (-)
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, separator: '_'}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.separator === '_'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiType className="w-4 h-4 mx-auto mb-1" />
                  Underscore (_)
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, preserveCase: !prev.preserveCase}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.preserveCase
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiSettings className="w-4 h-4 mx-auto mb-1" />
                  {options.preserveCase ? 'Case Preserved' : 'Lowercase'}
                </button>
                
                <button
                  onClick={resetFields}
                  className="p-3 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-600 cursor-pointer transition-colors"
                >
                  <FiRefreshCw className="w-4 h-4 mx-auto mb-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Result */}
            {slug && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Generated Slug:
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={editSlug}
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-medium cursor-pointer transition-colors"
                    >
                      Edit Slug
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors"
                    >
                      {copied ? <FiRefreshCw className="text-white" /> : <FiCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-white p-3 rounded border select-all"
                  />
                  <div className="mt-2 text-sm text-gray-500 flex gap-4">
                    <span>Characters: {slug.length}</span>
                    <span>Words: {slug.split(options.separator).filter(Boolean).length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiLink className="text-indigo-600" />
              How to Use the Slug Converter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the text you want to convert into a URL slug</li>
                  <li>Choose your conversion options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Separator:</strong> Choose between hyphens (-) or underscores (_)</li>
                    <li><strong>Case:</strong> Preserve original case or convert to lowercase</li>
                    <li><strong>Trimming:</strong> Remove leading/trailing separators (recommended)</li>
                  </ul>
                  <li>The slug is generated automatically as you type</li>
                  <li>Copy the result or edit it manually if needed</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use hyphens for better SEO (Google prefers hyphens over underscores)</li>
                  <li>Keep slugs short and descriptive for better readability</li>
                  <li>The tool automatically handles special characters and diacritics</li>
                  <li>Use the "Edit Slug" feature to make manual adjustments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Slug Conversion Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Blog Post Titles</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">How to Build a Website in 2024</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Slug:</div>
                    <code className="text-sm">how-to-build-a-website-in-2024</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Special Characters</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">Café & Restaurant Guide!</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Slug:</div>
                    <code className="text-sm">cafe-restaurant-guide</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/text-reverser" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiArrowRight className="text-indigo-600" />
                  <h3 className="font-semibold">Text Reverser</h3>
                </div>
                <p className="text-sm text-gray-600">Reverse text, words, or lines instantly</p>
              </Link>
              
              <Link href="/tools/case-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Case Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert text to uppercase, lowercase, title case</p>
              </Link>
              
              <Link href="/tools/word-counter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiHash className="text-indigo-600" />
                  <h3 className="font-semibold">Word Counter</h3>
                </div>
                <p className="text-sm text-gray-600">Count words, characters, and analyze text</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}