'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiChevronRight, FiCopy, FiRefreshCw, FiHash, FiCommand, FiLock, FiDroplet, FiGitMerge } from 'react-icons/fi';
// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Number Base Converter",
    "url": "https://freedevtools.dev/tools/number-base-converter",
    "description": "Free online number base converter tool to convert numbers between binary, decimal, hexadecimal, octal and other bases.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert between binary, decimal, hexadecimal, octal",
      "Support for bases 2-36",
      "Real-time conversion",
      "Copy results to clipboard",
      "Input validation",
      "Common programming bases"
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
      <span className="text-gray-900 font-medium">Number Base Converter</span>
    </nav>
  );
}

const commonBases = [
  { value: 2, name: 'Binary', example: '1010' },
  { value: 8, name: 'Octal', example: '755' },
  { value: 10, name: 'Decimal', example: '123' },
  { value: 16, name: 'Hexadecimal', example: 'A1B2' },
];

// Main component
export default function NumberBaseConverter() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<Record<number, string>>({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<number | ''>('');

  const isValidInput = (value: string, base: number) => {
    if (!value) return false;
    const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
    return value.toUpperCase().split('').every(char => validChars.includes(char));
  };

  const convertNumber = () => {
    if (!input.trim()) {
      setError('Please enter a number to convert');
      setResults({});
      return;
    }

    if (!isValidInput(input.trim(), fromBase)) {
      setError(`Invalid input for base ${fromBase}. Please check your number.`);
      setResults({});
      return;
    }

    try {
      const decimalValue = parseInt(input.trim(), fromBase);
      
      if (isNaN(decimalValue)) {
        setError('Invalid number format');
        setResults({});
        return;
      }

      const newResults: Record<number, string> = {};
      commonBases.forEach(base => {
        if (base.value === 16) {
          newResults[base.value] = decimalValue.toString(base.value).toUpperCase();
        } else {
          newResults[base.value] = decimalValue.toString(base.value);
        }
      });

      setResults(newResults);
      setError('');
    } catch (err) {
      setError('Conversion failed. Please check your input.');
      setResults({});
    }
  };

  const copyToClipboard = async (value: string, base: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(base);
      setTimeout(() => setCopied(''), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setInput('');
    setResults({});
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Auto-convert on input change if valid
    if (value.trim() && isValidInput(value.trim(), fromBase)) {
      setTimeout(() => {
        if (value === input) convertNumber();
      }, 300);
    }
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
              <FiHash className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Number Base Converter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert numbers between different bases instantly. Support for binary, decimal, hexadecimal, octal, and custom bases from 2 to 36.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter number to convert:
              </label>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter your number here..."
                  className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={fromBase}
                  onChange={(e) => setFromBase(parseInt(e.target.value))}
                  className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {commonBases.map(base => (
                    <option key={base.value} value={base.value}>
                      Base {base.value} ({base.name})
                    </option>
                  ))}
                  {[...Array(33)].map((_, i) => {
                    const base = i + 4;
                    if (![2, 8, 10, 16].includes(base)) {
                      return (
                        <option key={base} value={base}>
                          Base {base}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>
              
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3 mb-4">
                  {error}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={convertNumber}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiCommand />
                Convert Number
              </button>
              
              <button
                onClick={resetFields}
                className="bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>

            {/* Results */}
            {Object.keys(results).length > 0 && (
              <div className="grid md:grid-cols-2 gap-4">
                {commonBases.map(base => (
                  <div key={base.value} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-700">
                        {base.name} (Base {base.value})
                      </h3>
                      <button
                        onClick={() => copyToClipboard(results[base.value], base.value)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        {copied === base.value ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                        {copied === base.value ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-white p-3 rounded border font-mono text-lg">
                      {results[base.value]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCommand className="text-indigo-600" />
              How to Use the Number Base Converter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter the number you want to convert in the input field</li>
                  <li>Select the source base (the base your number is currently in)</li>
                  <li>The tool will automatically convert to all common bases</li>
                  <li>Click "Copy" next to any result to copy it to your clipboard</li>
                  <li>Use "Reset" to clear all fields and start over</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Base Conversion Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li><strong>Binary (Base 2):</strong> Uses only 0 and 1</li>
                  <li><strong>Octal (Base 8):</strong> Uses digits 0-7</li>
                  <li><strong>Decimal (Base 10):</strong> Standard numbers 0-9</li>
                  <li><strong>Hexadecimal (Base 16):</strong> Uses 0-9 and A-F</li>
                  <li>The tool supports bases from 2 to 36</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Number Base Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Common Conversions</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Decimal 255 equals:</div>
                    <div className="space-y-1 text-sm font-mono">
                      <div>Binary: 11111111</div>
                      <div>Octal: 377</div>
                      <div>Hex: FF</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Programming Examples</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Hex A1B2 equals:</div>
                    <div className="space-y-1 text-sm font-mono">
                      <div>Decimal: 41394</div>
                      <div>Binary: 1010000110110010</div>
                      <div>Octal: 120662</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings</p>
              </Link>
              
              <Link href="/tools/color-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiDroplet className="text-indigo-600" />
                  <h3 className="font-semibold">Color Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert colors between formats</p>
              </Link>
              
              <Link href="/tools/regex-tester" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiGitMerge className="text-indigo-600" />
                  <h3 className="font-semibold">Regex Tester</h3>
                </div>
                <p className="text-sm text-gray-600">Test and debug regular expressions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}