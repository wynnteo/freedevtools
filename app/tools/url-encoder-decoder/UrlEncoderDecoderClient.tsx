'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiLink, FiHome, FiChevronRight, FiCode, FiAlignLeft, FiShield, FiLock } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "URL Encoder/Decoder",
    "url": "https://freedevtools.dev/tools/url-encoder-decoder",
    "description": "Free online URL encoder and decoder tool to encode and decode URLs for proper web transmission and display.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Encode URLs with encodeURI",
      "Encode URLs with encodeURIComponent",
      "Decode URL-encoded strings",
      "Auto-encode/decode as you type",
      "Preserve or remove spaces",
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
      <span className="text-gray-900 font-medium">URL Encoder/Decoder</span>
    </nav>
  );
}

// Main component
export default function UrlEncoderDecoderClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [encodeMethod, setEncodeMethod] = useState<'uri' | 'component'>('component');
  const [options, setOptions] = useState({
    autoEncode: false,
    autoDecode: false,
    preserveSpaces: true,
  });
  const [copied, setCopied] = useState(false);

  const urlEncode = () => {
    try {
      setError('');
      let result = input;
      
      if (!options.preserveSpaces) {
        result = result.replace(/\s+/g, '');
      }
      
      const encoded = encodeMethod === 'uri' 
        ? encodeURI(result) 
        : encodeURIComponent(result);
      
      setOutput(encoded);
    } catch (e) {
      setError('Invalid URL input');
      setOutput('');
    }
  };

  const urlDecode = () => {
    try {
      setError('');
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (e) {
      setError('Invalid URL encoding');
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

  // Auto encode/decode functionality
  const handleInputChange = (value: string) => {
    setInput(value);
    
    if (options.autoEncode && value.trim()) {
      try {
        setError('');
        let result = value;
        
        if (!options.preserveSpaces) {
          result = result.replace(/\s+/g, '');
        }
        
        const encoded = encodeMethod === 'uri' 
          ? encodeURI(result) 
          : encodeURIComponent(result);
        
        setOutput(encoded);
      } catch (e) {
        setError('Invalid URL input');
        setOutput('');
      }
    } else if (options.autoDecode && value.trim()) {
      try {
        setError('');
        const decoded = decodeURIComponent(value);
        setOutput(decoded);
      } catch (e) {
        setError('Invalid URL encoding');
        setOutput('');
      }
    } else if (!value.trim()) {
      setOutput('');
      setError('');
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
              <FiLink className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              URL Encoder/Decoder Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encode and decode URLs for proper web transmission and display. 
              Perfect for handling special characters, spaces, and query parameters in URLs.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter URL to encode/decode:
              </label>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type or paste your URL here... (e.g., https://example.com/path with spaces?query=hello world)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none font-mono text-sm"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Encoding Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => setOptions(prev => ({...prev, autoEncode: !prev.autoEncode, autoDecode: false}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.autoEncode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiCode className="w-4 h-4 mx-auto mb-1" />
                  {options.autoEncode ? 'Auto-Encode On' : 'Auto-Encode'}
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, autoDecode: !prev.autoDecode, autoEncode: false}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.autoDecode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiCode className="w-4 h-4 mx-auto mb-1" />
                  {options.autoDecode ? 'Auto-Decode On' : 'Auto-Decode'}
                </button>
                
                <button
                  onClick={() => setOptions(prev => ({...prev, preserveSpaces: !prev.preserveSpaces}))}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    options.preserveSpaces
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiAlignLeft className="w-4 h-4 mx-auto mb-1" />
                  {options.preserveSpaces ? 'Preserve Spaces' : 'Remove Spaces'}
                </button>
                
                <div className="p-3 border border-gray-300 rounded-lg">
                  <select
                    value={encodeMethod}
                    onChange={(e) => setEncodeMethod(e.target.value as 'uri' | 'component')}
                    className="w-full text-sm bg-transparent focus:outline-none"
                  >
                    <option value="component">encodeURIComponent</option>
                    <option value="uri">encodeURI</option>
                  </select>
                </div>
                
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
                onClick={urlEncode}
                disabled={!input.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiLink />
                Encode URL
              </button>
              
              <button
                onClick={urlDecode}
                disabled={!input.trim()}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium cursor-pointer transition-colors"
              >
                <FiLink />
                Decode URL
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
                <div className="flex items-center">
                  <FiShield className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 font-medium">Error:</span>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            )}

            {/* Result */}
            {output && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {options.autoEncode || (!options.autoEncode && !options.autoDecode) ? 'Encoded' : 'Decoded'} URL:
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
              <FiLink className="text-indigo-600" />
              How to Use the URL Encoder/Decoder
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste the URL you want to encode or decode in the input field</li>
                  <li>Choose your encoding options:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Auto-Encode:</strong> Automatically encode URLs as you type</li>
                    <li><strong>Auto-Decode:</strong> Automatically decode URLs as you type</li>
                    <li><strong>Preserve Spaces:</strong> Keep original spacing or remove all spaces</li>
                    <li><strong>Encode Method:</strong> Choose between encodeURI or encodeURIComponent</li>
                  </ul>
                  <li>Click "Encode URL" or "Decode URL" to process your input</li>
                  <li>Copy the result using the "Copy Result" button</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Encoding Methods Explained</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">encodeURIComponent</h4>
                    <p className="text-blue-700 text-sm mb-2">Encodes all special characters including reserved URL characters (/, ?, #, etc.)</p>
                    <p className="text-blue-600 text-xs">Best for: Query parameters, form data</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">encodeURI</h4>
                    <p className="text-green-700 text-sm mb-2">Encodes characters but preserves valid URL structure characters</p>
                    <p className="text-green-600 text-xs">Best for: Complete URLs, preserving URL structure</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>Use encodeURIComponent for individual URL components like query values</li>
                  <li>Use encodeURI when encoding complete URLs</li>
                  <li>Auto-encode/decode modes provide real-time conversion as you type</li>
                  <li>Always encode URLs before sending them in HTTP requests</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">URL Encoding Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">encodeURI Example</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm break-all">https://example.com/path with spaces</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Encoded:</div>
                    <code className="text-sm break-all">https://example.com/path%20with%20spaces</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">encodeURIComponent Example</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                    <code className="text-sm break-all">hello world & more</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Encoded:</div>
                    <code className="text-sm break-all">hello%20world%20%26%20more</code>
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
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder/Decoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings and files</p>
              </Link>
              
              <Link href="/tools/html-encoder-decoder" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">HTML Encoder/Decoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode HTML entities safely</p>
              </Link>
              
              <Link href="/tools/bcrypt-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiShield className="text-indigo-600" />
                  <h3 className="font-semibold">Bcrypt Hash Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate secure bcrypt hashes for passwords</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
