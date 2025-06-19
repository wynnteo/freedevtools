'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiShield, FiHome, FiChevronRight, FiLock, FiKey, FiAlertTriangle, FiCode} from 'react-icons/fi';
import Link from 'next/link';
import bcrypt from 'bcryptjs';
// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Bcrypt Hash Generator",
    "url": "https://freedevtools.dev/tools/bcrypt-tool",
    "description": "Free online bcrypt hash generator and verifier tool for secure password hashing with customizable salt rounds.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate secure bcrypt hashes",
      "Verify passwords against hashes",
      "Customizable salt rounds (4-15)",
      "Real-time hash generation",
      "One-click copy to clipboard",
      "Security strength indicator"
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
      <span className="text-gray-900 font-medium">Bcrypt Hash Generator</span>
    </nav>
  );
}

// Main component
export default function BcryptToolClient() {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [saltRounds, setSaltRounds] = useState(10);
  const [mode, setMode] = useState<'generate' | 'verify'>('generate');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHash = async () => {
    if (!password.trim()) return;
    
    setIsGenerating(true);
    try {
        const generatedHash = await bcrypt.hash(password, saltRounds);
        setHash(generatedHash);
    } catch (error) {
        console.error('Hash generation failed:', error);
    } finally {
        setIsGenerating(false);
    }
 };

  const verifyPasswordHash = async () => {
    if (!verifyPassword.trim() || !verifyHash.trim()) {
        setVerifyResult(null);
        return;
    }
    
    try {
        const isMatch = await bcrypt.compare(verifyPassword, verifyHash);
        setVerifyResult(isMatch);
    } catch (error) {
        console.error('Verification failed:', error);
        setVerifyResult(false);
    }
    };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetFields = () => {
    setPassword('');
    setHash('');
    setVerifyPassword('');
    setVerifyHash('');
    setVerifyResult(null);
  };

  const getSecurityLevel = (rounds: number) => {
    if (rounds < 8) return { level: 'Low', color: 'red', description: 'Not recommended for production' };
    if (rounds < 10) return { level: 'Medium', color: 'yellow', description: 'Acceptable for most applications' };
    if (rounds < 12) return { level: 'High', color: 'green', description: 'Recommended for sensitive data' };
    return { level: 'Very High', color: 'blue', description: 'Maximum security (slower)' };
  };

  const security = getSecurityLevel(saltRounds);

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiShield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bcrypt Hash Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate secure bcrypt hashes for password protection and verify existing hashes. 
              Industry-standard hashing with customizable security levels.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setMode('generate')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  mode === 'generate'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <FiLock className="inline mr-2" />
                Generate Hash
              </button>
              <button
                onClick={() => setMode('verify')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  mode === 'verify'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <FiKey className="inline mr-2" />
                Verify Hash
              </button>
            </div>

            {mode === 'generate' ? (
              // Generate Mode
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password to hash:
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to hash"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Salt Rounds */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Salt Rounds: {saltRounds}
                    </label>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${security.color}-100 text-${security.color}-800`}>
                      {security.level} Security
                    </div>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    value={saltRounds}
                    onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4 (Fast)</span>
                    <span>15 (Secure)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{security.description}</p>
                </div>

                {/* Generate Button */}
                <div className="mb-6">
                  <button
                    onClick={generateHash}
                    disabled={!password.trim() || isGenerating}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      password.trim() && !isGenerating
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <FiRefreshCw className="inline mr-2 animate-spin" />
                        Generating Hash...
                      </>
                    ) : (
                      <>
                        <FiShield className="inline mr-2" />
                        Generate Bcrypt Hash
                      </>
                    )}
                  </button>
                </div>

                {/* Result */}
                {hash && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Generated Hash:
                      </label>
                      <button
                        onClick={copyToClipboard}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        {copied ? <FiRefreshCw className="animate-spin" /> : <FiCopy />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <code className="text-sm font-mono break-all">{hash}</code>
                      <div className="mt-2 text-sm text-gray-500">
                        Length: {hash.length} characters
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Verify Mode
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password to verify:
                  </label>
                  <input
                    type="password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    placeholder="Enter password to verify"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bcrypt hash to verify against:
                  </label>
                  <textarea
                    value={verifyHash}
                    onChange={(e) => setVerifyHash(e.target.value)}
                    placeholder="Enter bcrypt hash (e.g., $2b$10$...)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-20 font-mono text-sm"
                  />
                </div>

                <button
                  onClick={verifyPasswordHash}
                  disabled={!verifyPassword.trim() || !verifyHash.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mb-6 ${
                    verifyPassword.trim() && verifyHash.trim()
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiKey className="inline mr-2" />
                  Verify Password
                </button>

                {/* Verification Result */}
                {verifyResult !== null && (
                  <div className={`p-4 rounded-lg border ${
                    verifyResult
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      {verifyResult ? (
                        <>
                          <FiShield className="mr-2" />
                          <strong>Password Match!</strong>
                        </>
                      ) : (
                        <>
                          <FiAlertTriangle className="mr-2" />
                          <strong>Password Mismatch!</strong>
                        </>
                      )}
                    </div>
                    <p className="mt-1 text-sm">
                      {verifyResult
                        ? 'The password matches the provided hash.'
                        : 'The password does not match the provided hash.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reset Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={resetFields}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <FiRefreshCw className="inline mr-2" />
                Reset All Fields
              </button>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiShield className="text-indigo-600" />
              How to Use the Bcrypt Hash Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Password Hashing</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter the password you want to hash</li>
                  <li>Adjust salt rounds (higher = more secure but slower)</li>
                  <li>Click "Generate Bcrypt Hash" to create the hash</li>
                  <li>Copy the generated hash for use in your application</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Password Verification</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Switch to "Verify Hash" mode</li>
                  <li>Enter the password to verify</li>
                  <li>Paste the bcrypt hash to verify against</li>
                  <li>Click "Verify Password" to check if they match</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🔐 Security Notes</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Higher salt rounds = better security but slower processing</li>
                  <li>Salt rounds of 10-12 are recommended for most applications</li>
                  <li>Each hash is unique even for the same password</li>
                  <li>Bcrypt automatically includes salt in the hash</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Bcrypt Security</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">Salt Rounds Guide</h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-400 bg-red-50">
                    <div className="font-medium text-red-800">4-7 Rounds (Not Recommended)</div>
                    <div className="text-sm text-red-600">Too fast, vulnerable to attacks</div>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-400 bg-yellow-50">
                    <div className="font-medium text-yellow-800">8-9 Rounds (Basic)</div>
                    <div className="text-sm text-yellow-600">Minimum for non-critical applications</div>
                  </div>
                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <div className="font-medium text-green-800">10-12 Rounds (Recommended)</div>
                    <div className="text-sm text-green-600">Good balance of security and performance</div>
                  </div>
                  <div className="p-3 border-l-4 border-blue-400 bg-blue-50">
                    <div className="font-medium text-blue-800">13+ Rounds (High Security)</div>
                    <div className="text-sm text-blue-600">Maximum security for sensitive data</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Bcrypt Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FiShield className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Adaptive Hashing</div>
                      <div className="text-sm text-gray-600">Configurable work factor increases over time</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiLock className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Built-in Salt</div>
                      <div className="text-sm text-gray-600">Unique salt automatically generated and stored</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiKey className="text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Rainbow Table Resistant</div>
                      <div className="text-sm text-gray-600">Each hash is unique, even for identical passwords</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Security Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/password-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiKey className="text-indigo-600" />
                  <h3 className="font-semibold">Password Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate secure, random passwords</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings</p>
              </Link>
              
              <Link href="/tools/html-encoder-decoder" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">HTML Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Safely encode HTML entities</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}