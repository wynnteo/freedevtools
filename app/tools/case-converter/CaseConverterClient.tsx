'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiCheckCircle, FiHome, FiChevronRight, FiCode, FiRotateCcw, FiHash } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Case Converter",
    "url": "https://freedevtools.dev/tools/case-converter",
    "description": "Free online case converter tool to transform text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert to uppercase and lowercase",
      "Title case and sentence case conversion",
      "CamelCase, snake_case, kebab-case support",
      "Alternating case transformation",
      "Real-time conversion",
      "Character and word count",
      "Preserve spacing option",
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
      <span className="text-gray-900 font-medium">Case Converter</span>
    </nav>
  );
}

// Main component
export default function CaseConverterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState<
    'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'alternating'
  >('upper');
  const [options, setOptions] = useState({
    autoConvert: true,
    preserveSpacing: true,
  });
  const [copied, setCopied] = useState(false);

  const caseTypes = [
    { key: 'upper', label: 'UPPERCASE', color: 'bg-indigo-600', example: 'HELLO WORLD' },
    { key: 'lower', label: 'lowercase', color: 'bg-gray-600', example: 'hello world' },
    { key: 'title', label: 'Title Case', color: 'bg-green-600', example: 'Hello World' },
    { key: 'sentence', label: 'Sentence case', color: 'bg-blue-600', example: 'Hello world' },
    { key: 'camel', label: 'camelCase', color: 'bg-purple-600', example: 'helloWorld' },
    { key: 'pascal', label: 'PascalCase', color: 'bg-indigo-500', example: 'HelloWorld' },
    { key: 'snake', label: 'snake_case', color: 'bg-orange-600', example: 'hello_world' },
    { key: 'kebab', label: 'kebab-case', color: 'bg-pink-600', example: 'hello-world' },
    { key: 'alternating', label: 'AlTeRnAtInG', color: 'bg-teal-600', example: 'hElLo WoRlD' },
  ];

  useEffect(() => {
    if (!options.autoConvert || !input) {
      setOutput('');
      return;
    }

    let processedInput = input;
    if (!options.preserveSpacing) {
      processedInput = processedInput.replace(/\s+/g, ' ').trim();
    }

    const convert = () => {
      switch (activeCase) {
        case 'upper':
          return processedInput.toUpperCase();
        case 'lower':
          return processedInput.toLowerCase();
        case 'title':
          return processedInput.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          );
        case 'sentence':
          return processedInput.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => 
            match.toUpperCase()
          );
        case 'camel':
          return processedInput
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
              return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, '');
        case 'pascal':
          return processedInput
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
            .replace(/\s+/g, '');
        case 'snake':
          return processedInput
            .replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('_');
        case 'kebab':
          return processedInput
            .replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('-');
        case 'alternating':
          return processedInput
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join('');
        default:
          return processedInput;
      }
    };

    setOutput(convert());
  }, [input, activeCase, options]);

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = output;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  const handleManualConvert = () => {
    if (!input) return;
    
    let processedInput = input;
    if (!options.preserveSpacing) {
      processedInput = processedInput.replace(/\s+/g, ' ').trim();
    }

    // Same conversion logic as in useEffect
    const convert = () => {
      switch (activeCase) {
        case 'upper':
          return processedInput.toUpperCase();
        case 'lower':
          return processedInput.toLowerCase();
        case 'title':
          return processedInput.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          );
        case 'sentence':
          return processedInput.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => 
            match.toUpperCase()
          );
        case 'camel':
          return processedInput
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
              return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, '');
        case 'pascal':
          return processedInput
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
            .replace(/\s+/g, '');
        case 'snake':
          return processedInput
            .replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('_');
        case 'kebab':
          return processedInput
            .replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('-');
        case 'alternating':
          return processedInput
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join('');
        default:
          return processedInput;
      }
    };

    setOutput(convert());
  };

  const getCharCount = (text: string) => text.length;
  const getWordCount = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;

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
              Advanced Case Converter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform text between different cases instantly. Convert to uppercase, lowercase, title case, 
              camelCase, snake_case, kebab-case, and more with our free online case converter.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to convert..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Characters: {getCharCount(input)} | Words: {getWordCount(input)}</span>
                {input && (
                  <button
                    onClick={resetFields}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiRotateCcw className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Case Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Case Type:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {caseTypes.map((caseType) => (
                  <button
                    key={caseType.key}
                    onClick={() => setActiveCase(caseType.key as any)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeCase === caseType.key 
                        ? `${caseType.color} text-white shadow-md` 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="font-medium text-sm">{caseType.label}</div>
                    <div className="text-xs opacity-75 mt-1">{caseType.example}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Conversion Options:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOptions(p => ({...p, autoConvert: !p.autoConvert}))}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    options.autoConvert 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {options.autoConvert ? '✓ Auto Convert' : 'Enable Auto Convert'}
                </button>
                <button
                  onClick={() => setOptions(p => ({...p, preserveSpacing: !p.preserveSpacing}))}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    options.preserveSpacing 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {options.preserveSpacing ? '✓ Preserve Spacing' : 'Trim Extra Spaces'}
                </button>
              </div>
            </div>

            {/* Convert Button (for manual mode) */}
            {!options.autoConvert && (
              <div className="mb-6">
                <button
                  onClick={handleManualConvert}
                  disabled={!input}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  <FiRefreshCw />
                  Convert Text
                </button>
              </div>
            )}

            {/* Output */}
            {output && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Converted Text:
                    </label>
                    <div className="text-sm text-gray-500 mt-1">
                      Characters: {getCharCount(output)} | Words: {getWordCount(output)}
                    </div>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium transition-all duration-200"
                  >
                    {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <textarea
                    value={output}
                    readOnly
                    className="w-full p-3 bg-white border rounded-lg h-32 resize-none cursor-text select-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the Case Converter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter or paste your text in the input field above</li>
                  <li>Select the desired case type from the available options</li>
                  <li>Toggle "Auto Convert" for real-time conversion or use manual mode</li>
                  <li>Choose "Preserve Spacing" to maintain original formatting</li>
                  <li>Copy the converted text using the "Copy" button</li>
                  <li>Use the converted text wherever needed</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Case Types Explained</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li><strong>UPPERCASE:</strong> ALL LETTERS CAPITAL</li>
                    <li><strong>lowercase:</strong> all letters small</li>
                    <li><strong>Title Case:</strong> First Letter Of Each Word</li>
                    <li><strong>Sentence case:</strong> First letter of sentence</li>
                    <li><strong>camelCase:</strong> firstWordLowercaseRestCapital</li>
                    <li><strong>PascalCase:</strong> AllWordsStartWithCapital</li>
                    <li><strong>snake_case:</strong> words_separated_by_underscores</li>
                    <li><strong>kebab-case:</strong> words-separated-by-hyphens</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🚀 Pro Tips</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>Use camelCase for JavaScript variables</li>
                    <li>Use PascalCase for class names</li>
                    <li>Use snake_case for Python variables</li>
                    <li>Use kebab-case for CSS classes and URLs</li>
                    <li>Enable "Preserve Spacing" for code formatting</li>
                    <li>Disable auto-convert for better control</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Case Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Conversion Examples</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-semibold">Case Type</th>
                    <th className="text-left p-3 font-semibold">Example</th>
                    <th className="text-left p-3 font-semibold">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">UPPERCASE</td>
                    <td className="p-3 font-mono bg-gray-50">HELLO WORLD EXAMPLE</td>
                    <td className="p-3 text-gray-600">Constants, headings, emphasis</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">lowercase</td>
                    <td className="p-3 font-mono bg-gray-50">hello world example</td>
                    <td className="p-3 text-gray-600">General text, file names</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Title Case</td>
                    <td className="p-3 font-mono bg-gray-50">Hello World Example</td>
                    <td className="p-3 text-gray-600">Titles, headings, names</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">camelCase</td>
                    <td className="p-3 font-mono bg-gray-50">helloWorldExample</td>
                    <td className="p-3 text-gray-600">JavaScript variables, methods</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">snake_case</td>
                    <td className="p-3 font-mono bg-gray-50">hello_world_example</td>
                    <td className="p-3 text-gray-600">Python variables, database fields</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">kebab-case</td>
                    <td className="p-3 font-mono bg-gray-50">hello-world-example</td>
                    <td className="p-3 text-gray-600">CSS classes, URLs, file names</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Text Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/text-reverser" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiRotateCcw className="text-indigo-600" />
                  <h3 className="font-semibold">Text Reverser</h3>
                </div>
                <p className="text-sm text-gray-600">Reverse text, words, or characters instantly</p>
              </Link>
              
              <Link href="/tools/word-counter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiHash className="text-indigo-600" />
                  <h3 className="font-semibold">Word Counter</h3>
                </div>
                <p className="text-sm text-gray-600">Count words, characters, and paragraphs</p>
              </Link>
              
              <Link href="/tools/text-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">JSON Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and beautify JSON content</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}