'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiCheckCircle, FiHome, FiChevronRight, FiShield, FiKey, FiLock, FiSmartphone } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Generator",
    "url": "https://freedevtools.dev/tools/password-generator",
    "description": "Free online password generator tool to create secure, random passwords with customizable options.",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate secure passwords",
      "Customizable length (8-64 characters)",
      "Multiple character set options",
      "Password strength indicator",
      "Exclude similar characters option",
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
      <span className="text-gray-900 font-medium">Password Generator</span>
    </nav>
  );
}

// Main component
export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);

  const characterSets = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnpqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    excludeSimilar: 'il1Lo0O'
  };

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += characterSets.uppercase;
    if (options.lowercase) chars += characterSets.lowercase;
    if (options.numbers) chars += characterSets.numbers;
    if (options.symbols) chars += characterSets.symbols;
    
    if (chars === '') return;

    if (options.excludeSimilar) {
      chars = chars.replace(new RegExp(`[${characterSets.excludeSimilar}]`, 'g'), '');
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
    setCopied(false);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[\W_]/.test(pass)) score++;
    setStrength(score);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiKey className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Secure Password Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create strong, random passwords instantly with our free online password generator. 
              Customize length, character sets, and ensure maximum security for your accounts.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="w-24 font-medium">Length</label>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono bg-gray-100 px-2 py-1 rounded">{length}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(options).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="h-5 w-5 accent-indigo-600"
                      disabled={key === 'excludeSimilar' && !(options.uppercase || options.lowercase)}
                    />
                    <label className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Password Strength:</span>
                  <span className={`font-bold ${
                    strength < 3 ? 'text-red-600' : strength < 5 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {strength < 3 ? 'Weak' : strength < 5 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={generatePassword}
                className="bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium"
              >
                <FiRefreshCw />
                Generate New Password
              </button>
              
              {password && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 px-6 py-3 cursor-pointer rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium"
                >
                  {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy Password'}
                </button>
              )}
            </div>

            {password && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Password:
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="font-mono text-lg text-center break-all select-all bg-white p-3 rounded border">
                    {password}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiShield className="text-indigo-600" />
              How to Use the Password Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Adjust the password length using the slider (8-64 characters recommended: 12+ for high security)</li>
                  <li>Select character types to include: uppercase, lowercase, numbers, and symbols</li>
                  <li>Choose whether to exclude similar-looking characters (i, l, 1, L, o, 0, O)</li>
                  <li>Click "Generate New Password" to create a secure password</li>
                  <li>Copy the password using the "Copy Password" button</li>
                  <li>Use the password immediately in your account registration or password change</li>
                </ol>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">🔒 Security Best Practices</h4>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>Use passwords with at least 12 characters for important accounts</li>
                  <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
                  <li>Never reuse passwords across multiple sites</li>
                  <li>Consider using a password manager to store unique passwords</li>
                  <li>Enable two-factor authentication when available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Password Security Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Security Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">✅ Strong Password Examples</h3>
                <div className="space-y-2">
                  <div className="bg-green-50 p-3 rounded border">
                    <code className="text-sm">K9$mP#eL2@vR8wQ!</code>
                    <p className="text-xs text-green-600 mt-1">16 chars, mixed case, numbers, symbols</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <code className="text-sm">Tr7$Moon&Sky95#</code>
                    <p className="text-xs text-green-600 mt-1">15 chars, memorable yet secure</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">❌ Weak Password Examples</h3>
                <div className="space-y-2">
                  <div className="bg-red-50 p-3 rounded border">
                    <code className="text-sm">password123</code>
                    <p className="text-xs text-red-600 mt-1">Too common and predictable</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded border">
                    <code className="text-sm">johnsmith1990</code>
                    <p className="text-xs text-red-600 mt-1">Personal info is easily guessed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Security Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/bcrypt-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiShield className="text-indigo-600" />
                  <h3 className="font-semibold">Bcrypt Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Hash passwords securely with bcrypt algorithm</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings safely</p>
              </Link>
              
              <Link href="/tools/qr-code-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiSmartphone className="text-indigo-600" />
                  <h3 className="font-semibold">QR Code Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate QR codes for secure sharing</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}