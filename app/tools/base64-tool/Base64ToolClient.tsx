'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiLock, FiHome, FiChevronRight, FiUpload, FiDownload, FiFile, FiSettings, FiShield, FiCode, FiLink } from 'react-icons/fi';
import Link from 'next/link';
 
// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Encoder Decoder",
    "url": "https://freedevtools.dev/tools/base64-tool",
    "description": "Free online Base64 encoder and decoder with file support. Convert text to Base64 or decode Base64 strings with UTF-8 and ASCII encoding options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Encode text to Base64",
      "Decode Base64 strings",
      "File to Base64 conversion",
      "UTF-8 and ASCII encoding support",
      "Real-time conversion",
      "One-click copy to clipboard",
      "Download results as files"
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
      <span className="text-gray-900 font-medium">Base64 Encoder/Decoder</span>
    </nav>
  );
}

// Main component
export default function Base64ToolClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [file, setFile] = useState<File | null>(null);
  const [encodingType, setEncodingType] = useState<'utf-8' | 'ascii'>('utf-8');
  const [copied, setCopied] = useState(false);

  // Real-time conversion
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (mode === 'encode') {
        let textToEncode = input;
        if (encodingType === 'utf-8') {
          textToEncode = unescape(encodeURIComponent(input));
        }
        setOutput(btoa(textToEncode));
        setError('');
      } else {
        // Validate Base64 format
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(input.replace(/\s/g, ''))) {
          throw new Error('Invalid Base64 format');
        }
        
        const decoded = atob(input.replace(/\s/g, ''));
        let finalDecoded = decoded;
        
        if (encodingType === 'utf-8') {
          try {
            finalDecoded = decodeURIComponent(escape(decoded));
          } catch {
            // If UTF-8 decoding fails, fall back to raw decoded
            finalDecoded = decoded;
          }
        }
        setOutput(finalDecoded);
        setError('');
      }
    } catch (e) {
      setError(`Invalid ${mode === 'encode' ? 'input text' : 'Base64 string'}`);
      setOutput('');
    }
  }, [input, mode, encodingType]);

  // File-to-Base64 conversion
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // File size limiter (2MB)
    if (selectedFile.size > 2_000_000) {
      setError('File size exceeds 2MB limit');
      return;
    }

    setFile(selectedFile);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        // Remove the data URL prefix (data:mime/type;base64,)
        const base64String = result.split(',')[1] || '';
        setInput(base64String);
        setMode('decode');
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(selectedFile);
  };

  // Copy with feedback
  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  // Download result
  const downloadResult = () => {
    if (!output) return;
    
    try {
      let blob: Blob;
      let filename: string;
      
      if (mode === 'encode') {
        blob = new Blob([output], { type: 'text/plain' });
        filename = 'encoded-base64.txt';
      } else {
        blob = new Blob([output], { type: 'application/octet-stream' });
        filename = file ? `decoded-${file.name}` : 'decoded-file.txt';
      }
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download file');
    }
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setError('');
    setFile(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
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
              <FiLock className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Base64 Encoder & Decoder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert text and files to Base64 encoding or decode Base64 strings back to their original format.
              Supports UTF-8 and ASCII encoding with file upload capabilities.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Mode Selection */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'encode'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiLock className="w-4 h-4 inline mr-2" />
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'decode'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiLock className="w-4 h-4 inline mr-2 transform rotate-180" />
                  Decode
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'encode' ? 'Enter text to encode:' : 'Enter Base64 string to decode:'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' 
                  ? 'Enter your text here or upload a file below...' 
                  : 'Paste your Base64 string here...'}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none font-mono text-sm"
              />
              
              {/* File Upload for Encode Mode */}
              {mode === 'encode' && (
                <div className="mt-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <FiUpload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Upload file (max 2MB)
                    </span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      aria-label="Upload file for encoding"
                    />
                  </label>
                  {file && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <FiFile className="w-4 h-4" />
                      <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Encoding Options:</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setEncodingType('utf-8')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    encodingType === 'utf-8'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiSettings className="w-4 h-4 inline mr-1" />
                  UTF-8
                </button>
                
                <button
                  onClick={() => setEncodingType('ascii')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    encodingType === 'ascii'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiSettings className="w-4 h-4 inline mr-1" />
                  ASCII
                </button>
                
                <button
                  onClick={resetFields}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                >
                  <FiRefreshCw className="w-4 h-4 inline mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className={`p-3 rounded-lg mb-4 ${
                error.includes('Copied') || error.includes('Downloaded')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {error}
              </div>
            )}

            {/* Result Section */}
            {output && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {mode === 'encode' ? 'Base64 Output:' : 'Decoded Result:'}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      {copied ? <FiRefreshCw className="text-white" /> : <FiCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadResult}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <FiDownload />
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <pre className="whitespace-pre-wrap break-all font-mono text-sm max-h-96 overflow-auto">
                    {output}
                  </pre>
                  <div className="mt-2 text-sm text-gray-500 flex gap-4">
                    <span>Characters: {output.length}</span>
                    <span>Size: {(new Blob([output]).size / 1024).toFixed(2)} KB</span>
                  </div>
                </div>
              </div>
            )}

            {/* Decode Warning */}
            {mode === 'decode' && output && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                <strong>⚠️ Security Warning:</strong> Only decode Base64 content from trusted sources. 
                Malicious content could harm your system when decoded.
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiLock className="text-indigo-600" />
              How to Use the Base64 Tool
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">🔐 Encoding</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                      <li>Enter text or upload a file (max 2MB)</li>
                      <li>Choose encoding type (UTF-8 for special characters)</li>
                      <li>Copy or download the Base64 result</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">🔓 Decoding</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                      <li>Paste a valid Base64 string</li>
                      <li>Verify encoding type matches the original</li>
                      <li>Copy or download the decoded result</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                  <li>Use UTF-8 encoding for text with special characters or emojis</li>
                  <li>ASCII encoding is suitable for simple English text and is more compatible</li>
                  <li>Base64 increases data size by approximately 33%</li>
                  <li>Always verify the source when decoding Base64 from unknown origins</li>
                  <li>File uploads are processed entirely in your browser for privacy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Base64 Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Simple Text Encoding</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original Text:</div>
                    <code className="text-sm">Hello World!</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="text-sm text-green-600 mb-1">Base64 Encoded:</div>
                    <code className="text-sm break-all">SGVsbG8gV29ybGQh</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">UTF-8 with Special Characters</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Original Text:</div>
                    <code className="text-sm">Hello 🌍 UTF-8!</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="text-sm text-blue-600 mb-1">Base64 Encoded:</div>
                    <code className="text-sm break-all">SGVsbG8g8J+MjSBVVEYtOCE=</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Encoding Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/url-encoder-decoder" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLink className="text-indigo-600" />
                  <h3 className="font-semibold">URL Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode URLs for web transmission</p>
              </Link>
              
              <Link href="/tools/html-encoder-decoder" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">HTML Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode HTML entities for safe display</p>
              </Link>
              
              <Link href="/tools/bcrypt-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiShield className="text-indigo-600" />
                  <h3 className="font-semibold">Bcrypt Hash</h3>
                </div>
                <p className="text-sm text-gray-600">Generate secure password hashes</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}