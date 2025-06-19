'use client';
import { useState, useEffect } from 'react';
import { FiTerminal, FiColumns, FiCopy, FiRefreshCw, FiCode, FiHome, FiChevronRight, FiDownload, FiGitMerge, FiDatabase, FiType } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSS Formatter",
    "url": "https://freedevtools.dev/tools/css-formatter",
    "description": "Free online CSS formatter and beautifier. Format, minify, and validate CSS code with syntax highlighting and error detection.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Format and beautify CSS",
      "Minify CSS code",
      "Validate CSS syntax",
      "Remove comments and whitespace",
      "Syntax highlighting",
      "One-click copy to clipboard",
      "Download formatted files"
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
      <span className="text-gray-900 font-medium">CSS Formatter</span>
    </nav>
  );
}

// Main component
export default function CssFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'formatted' | 'minified' | 'validated'>('formatted');
  const [copied, setCopied] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);

  // Auto-format on input change
  useEffect(() => {
    if (!autoFormat || !input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (viewMode === 'formatted') {
        setOutput(formatCSS(input));
      } else if (viewMode === 'minified') {
        setOutput(minifyCSS(input));
      } else if (viewMode === 'validated') {
        const validation = validateCSS(input);
        if (validation.isValid) {
          setOutput(formatCSS(input));
          setError('✅ CSS is valid!');
        } else {
          setOutput('');
          setError(`❌ CSS validation errors:\n${validation.errors.join('\n')}`);
        }
      }
    } catch (e) {
      setError(`CSS processing error: ${(e as Error).message}`);
      setOutput('');
    }
  }, [input, viewMode, autoFormat]);

  // CSS formatter function
  const formatCSS = (css: string): string => {
    // Remove extra whitespace and normalize
    let formatted = css.replace(/\s+/g, ' ').trim();
    
    // Add line breaks and indentation
    formatted = formatted
      .replace(/\{/g, ' {\n')
      .replace(/\}/g, '\n}\n')
      .replace(/;/g, ';\n')
      .replace(/,/g, ',\n');
    
    // Clean up and add proper indentation
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentSize = 2;
    
    return lines
      .map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';
        
        // Decrease indent for closing braces
        if (trimmedLine === '}') {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmedLine;
        
        // Increase indent after opening braces
        if (trimmedLine.endsWith('{')) {
          indentLevel++;
        }
        
        return indentedLine;
      })
      .filter(line => line.trim())
      .join('\n');
  };

  // CSS minifier function
  const minifyCSS = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around closing braces
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .replace(/;}/g, '}') // Remove last semicolon before closing brace
      .trim();
  };

  // Simple CSS validator
  const validateCSS = (css: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Check for balanced braces
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push(`Unbalanced braces: ${openBraces} opening, ${closeBraces} closing`);
    }
    
    // Check for basic syntax issues
    const lines = css.split('\n');
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      // Check for properties without values
      if (trimmed.includes(':') && !trimmed.includes('{') && !trimmed.includes('}')) {
        const colonIndex = trimmed.indexOf(':');
        const afterColon = trimmed.substring(colonIndex + 1).trim();
        if (!afterColon || afterColon === ';') {
          errors.push(`Line ${index + 1}: Property without value`);
        }
      }
      
      // Check for missing semicolons (basic check)
      if (trimmed.includes(':') && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
        if (!trimmed.includes('@') && !trimmed.includes('/*')) {
          errors.push(`Line ${index + 1}: Missing semicolon`);
        }
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  // Download output
  const downloadOutput = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${viewMode === 'minified' ? 'minified' : 'formatted'}-styles.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiTerminal className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              CSS Formatter & Beautifier
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Format, beautify, minify, and validate CSS code with syntax highlighting. Perfect for developers 
              working with stylesheets, cleaning up CSS files, and optimizing web performance.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter CSS code:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your CSS code here...'
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none font-mono text-sm"
              />
              {error && (
                <div className={`mt-2 p-3 border rounded-lg ${
                  error.startsWith('✅') 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <pre className="text-sm whitespace-pre-wrap">{error}</pre>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Format Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => setViewMode('formatted')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'formatted'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiCode className="w-4 h-4 mx-auto mb-1" />
                  Format
                </button>
                
                <button
                  onClick={() => setViewMode('minified')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'minified'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiGitMerge className="w-4 h-4 mx-auto mb-1" />
                  Minify
                </button>
                
                <button
                  onClick={() => setViewMode('validated')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    viewMode === 'validated'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiDatabase className="w-4 h-4 mx-auto mb-1" />
                  Validate
                </button>
                
                <button
                  onClick={() => setAutoFormat(!autoFormat)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    autoFormat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FiRefreshCw className="w-4 h-4 mx-auto mb-1" />
                  Auto Format
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
            <div className="flex flex-wrap gap-4 mb-6">
              {output && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                  >
                    {copied ? <FiRefreshCw className="text-green-600" /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </button>
                  
                  <button
                    onClick={downloadOutput}
                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium cursor-pointer transition-colors"
                  >
                    <FiDownload />
                    Download CSS
                  </button>
                </>
              )}
            </div>

            {/* Result */}
            {output && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {viewMode === 'formatted' ? 'Formatted CSS:' : 
                     viewMode === 'minified' ? 'Minified CSS:' : 'Validated CSS:'}
                  </label>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {viewMode.toUpperCase()}
                  </span>
                </div>
                <div className="relative">
                  <pre className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto h-64 text-sm font-mono border">
                    <code>{output}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the CSS Formatter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste your CSS code in the input field</li>
                  <li>Choose your desired action: Format, Minify, or Validate</li>
                  <li>Enable "Auto Format" for real-time processing as you type</li>
                  <li>Copy the formatted result or download it as a CSS file</li>
                  <li>Use validation to check for syntax errors and best practices</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use minification to reduce file size for production websites</li>
                  <li>Format CSS for better readability during development</li>
                  <li>Validate CSS to catch syntax errors and improve code quality</li>
                  <li>Auto-format helps maintain consistent code style as you work</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CSS Format Examples</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">Before (Unformatted)</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`.header{background-color:#fff;padding:20px;margin:0;}.nav ul{list-style:none;display:flex;gap:10px;}.nav a{text-decoration:none;color:#333;}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">After (Formatted)</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`.header {
  background-color: #fff;
  padding: 20px;
  margin: 0;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

.nav a {
  text-decoration: none;
  color: #333;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/json-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiCode className="text-indigo-600" />
                  <h3 className="font-semibold">JSON Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format, validate, and convert JSON data with syntax highlighting</p>
              </Link>
              
              <Link href="/tools/text-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Text Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format text with options for indentation, line breaks, and more</p>
              </Link>
              
              <Link href="/tools/csv-formatter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiColumns className="text-indigo-600" />
                  <h3 className="font-semibold">CSV Formatter</h3>
                </div>
                <p className="text-sm text-gray-600">Format and validate CSV data with column alignment</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}