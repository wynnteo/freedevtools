'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiArrowRight, FiHome, FiChevronRight, FiType, FiAlignLeft, FiShuffle, FiHash } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Reverser",
    "url": "https://freedevtools.dev/tools/text-reverser",
    "description": "Free online text reverser tool to reverse text, words, and lines with customizable options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Reverse entire text",
      "Reverse word order",
      "Reverse line order",
      "Preserve or remove spacing",
      "Support for multiline text",
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
      <span className="text-gray-900 font-medium">Text Reverser</span>
    </nav>
  );
}

// Main component
export default function TextReverserClient() {
  const [input, setInput] = useState('');
  const [reversed, setReversed] = useState('');
  const [options, setOptions] = useState({
    preserveSpacing: true,
    reverseWords: false,
    reverseLines: false,
  });
  const [copied, setCopied] = useState(false);

  const reverseText = () => {
    let result = input;

    if (options.reverseLines) {
      result = result.split('\n').reverse().join('\n');
    }

    if (options.reverseWords) {
      result = result.split(' ').reverse().join(' ');
    }

    if (!options.preserveSpacing) {
      result = result.replace(/\s+/g, '');
    }

    result = result.split('').reverse().join('');
    setReversed(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reversed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setReversed('');
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
              <FiArrowRight className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Text Reverser Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reverse text, words, or lines instantly with our free online text reverser. 
              Perfect for creative writing, coding puzzles, or text manipulation tasks.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to reverse:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Reversal Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, preserveSpacing: !prev.preserveSpacing}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.preserveSpacing
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  {options.preserveSpacing ? 'Preserve Spaces' : 'Remove Spaces'}
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, reverseWords: !prev.reverseWords}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.reverseWords
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiShuffle className="w-4 h-4 mx-auto mb-1" />
                  Reverse Words
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, reverseLines: !prev.reverseLines}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.reverseLines
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiType className="w-4 h-4 mx-auto mb-1" />
                  Reverse Lines
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
                onClick={reverseText}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiArrowRight />
                Reverse Text
              </button>
              
              {reversed && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                >
                  {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              )}
            </div>

            {/* Result */}
            {reversed && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reversed Text:
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <textarea
                    value={reversed}
                    readOnly
                    className="w-full bg-white p-3 rounded border h-32 resize-none select-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiType className="text-indigo-600" />
              How to Use the Text Reverser
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the text you want to reverse in the input field</li>
                  <li>Choose your reversal options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Preserve Spaces:</strong> Keep original spacing (default) or remove all spaces</li>
                    <li><strong>Reverse Words:</strong> Reverse the order of words instead of characters</li>
                    <li><strong>Reverse Lines:</strong> Reverse the order of lines in multiline text</li>
                  </ul>
                  <li>Click "Reverse Text" to generate the reversed version</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Combine options for different reversal effects</li>
                  <li>Use word reversal for creative writing exercises</li>
                  <li>Line reversal is great for reorganizing lists</li>
                  <li>Character reversal works well for simple text obfuscation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Reversal Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Character Reversal</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">Hello World!</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Reversed:</div>
                    <code className="text-sm">!dlroW olleH</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Word Reversal</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm">The quick brown fox</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Word Reversed:</div>
                    <code className="text-sm">fox brown quick The</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
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
              
              <Link href="/tools/text-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiShuffle className="text-indigo-600" />
                  <h3 className="font-semibold">Text Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and beautify text with various options</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}