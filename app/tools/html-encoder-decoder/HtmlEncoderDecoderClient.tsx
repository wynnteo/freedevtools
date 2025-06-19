'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiCode, FiHome, FiChevronRight, FiType, FiAlignLeft, FiShuffle } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HTML Encoder/Decoder",
    "url": "https://freedevtools.dev/tools/html-encoder-decoder",
    "description": "Free online HTML encoder/decoder tool to encode and decode HTML entities for safe web content display.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "HTML entity encoding",
      "HTML entity decoding",
      "HTML formatting and beautification",
      "HTML minification",
      "Support for multiline HTML",
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
      <span className="text-gray-900 font-medium">HTML Encoder/Decoder</span>
    </nav>
  );
}

// Main component
export default function HtmlEncoderDecoderClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    encodeAll: false,
    minify: false,
    beautify: false,
  });
  const [copied, setCopied] = useState(false);

  const htmlEncode = () => {
    try {
      let encoded;
      if (options.encodeAll) {
        encoded = input.replace(/[^\w\s]/g, (char) => `&#${char.charCodeAt(0)};`);
      } else {
        encoded = input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/[\u00A0-\u9999]/g, (char) => `&#${char.charCodeAt(0)};`);
      }
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Invalid HTML input');
      setOutput('');
    }
  };

  const htmlDecode = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = input;
      setOutput(textArea.value);
      setError('');
    } catch (e) {
      setError('Invalid HTML entities');
      setOutput('');
    }
  };

  const formatHtml = () => {
    try {
        let formatted = input.trim();

        if (options.minify) {
        // Minify HTML
        formatted = formatted
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .replace(/\s+>/g, '>')
            .replace(/<\s+/g, '<')
            .trim();
        } else if (options.beautify) {
        // Beautify HTML with proper indentation
        let depth = 0;
        const lines = [];
        let currentLine = '';
        let inTag = false;
        let inQuote = false;
        let quoteChar = '';
        
        for (let i = 0; i < formatted.length; i++) {
            const char = formatted[i];
            const nextChar = formatted[i + 1];
            
            // Handle quotes
            if ((char === '"' || char === "'") && !inQuote) {
             inQuote = true;
             quoteChar = char;
            } else if (char === quoteChar && inQuote) {
             inQuote = false;
             quoteChar = '';
            }
            
            currentLine += char;
            
            if (!inQuote) {
            if (char === '<') {
                inTag = true;
                // If we have content before this tag, push it as a line
                if (currentLine.length > 1) {
                 const content = currentLine.slice(0, -1).trim();
                if (content) {
                    lines.push('  '.repeat(depth) + content);
                }
                 currentLine = char;
                }
            } else if (char === '>' && inTag) {
                inTag = false;
                const tag = currentLine.trim();
                
                // Check if it's a closing tag
                if (tag.startsWith('</')) {
                depth = Math.max(0, depth - 1);
                lines.push('  '.repeat(depth) + tag);
                }
                // Check if it's a self-closing tag
                else if (tag.endsWith('/>')) {
                lines.push('  '.repeat(depth) + tag);
                }
                // Opening tag
                else {
                lines.push('  '.repeat(depth) + tag);
                // Don't increase depth for void elements
                const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
                const tagName = tag.match(/<(\w+)/)?.[1]?.toLowerCase();
                if (tagName && !voidElements.includes(tagName)) {
                    depth++;
                }
                }
                currentLine = '';
            }
            }
        }
        
        // Handle any remaining content
        if (currentLine.trim()) {
            lines.push('  '.repeat(depth) + currentLine.trim());
        }
        
        formatted = lines.filter(line => line.trim()).join('\n');
        }

        setOutput(formatted);
        setError('');
    } catch (e) {
        setError('Invalid HTML for formatting');
        setOutput('');
    }
    };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setError('');
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
              <FiCode className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              HTML Encoder/Decoder Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encode and decode HTML entities for safe web content display. 
              Perfect for developers, content creators, and web security tasks.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter HTML to encode/decode:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste your HTML here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none font-mono text-sm"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Encoding Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, encodeAll: !prev.encodeAll}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.encodeAll
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiCode className="w-4 h-4 mx-auto mb-1" />
                  {options.encodeAll ? 'Encode All' : 'Basic Encode'}
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, minify: !prev.minify, beautify: false}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.minify
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiShuffle className="w-4 h-4 mx-auto mb-1" />
                  Minify HTML
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, beautify: !prev.beautify, minify: false}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.beautify
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  Beautify HTML
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

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={htmlEncode}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiCode />
                Encode HTML
              </button>
              
              <button
                onClick={htmlDecode}
                disabled={!input.trim()}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiCode />
                Decode HTML
              </button>
              
              <button
                onClick={formatHtml}
                disabled={!input.trim()}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiAlignLeft />
                Format HTML
              </button>
              
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                >
                  {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Result */}
            {output && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result:
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <textarea
                    value={output}
                    readOnly
                    className="w-full bg-white p-3 rounded border h-32 resize-none select-all font-mono text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the HTML Encoder/Decoder
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the HTML content you want to process</li>
                  <li>Choose your processing options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Basic Encode:</strong> Encode common HTML entities (&lt;, &gt;, &amp;, etc.)</li>
                    <li><strong>Encode All:</strong> Encode all non-alphanumeric characters</li>
                    <li><strong>Minify HTML:</strong> Remove unnecessary whitespace</li>
                    <li><strong>Beautify HTML:</strong> Format HTML with proper indentation</li>
                  </ul>
                  <li>Click the appropriate action button (Encode, Decode, or Format)</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use encoding when displaying user content to prevent XSS attacks</li>
                  <li>Decode HTML entities when processing scraped web content</li>
                  <li>Beautify HTML for better code readability and debugging</li>
                  <li>Minify HTML to reduce file size for production websites</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">HTML Encoding Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">HTML Encoding</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">&lt;div class="test"&gt;Hello &amp; World&lt;/div&gt;</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Encoded:</div>
                    <code className="text-sm">&amp;lt;div class=&quot;test&quot;&amp;gt;Hello &amp;amp; World&amp;lt;/div&amp;gt;</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">HTML Decoding</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Encoded:</div>
                    <code className="text-sm">&amp;lt;p&amp;gt;Hello &amp;quot;World&amp;quot;&amp;lt;/p&amp;gt;</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Decoded:</div>
                    <code className="text-sm">&lt;p&gt;Hello "World"&lt;/p&gt;</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Encoding Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings</p>
              </Link>
              
              <Link href="/tools/url-encoder-decoder" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">URL Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode URLs for web transmission</p>
              </Link>
              
              <Link href="/tools/json-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">JSON Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and validate JSON data</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
