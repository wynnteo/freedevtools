'use client';
import { useState } from 'react';
import { FiCopy, FiTerminal, FiCheckCircle, FiHome, FiChevronRight, FiFile, FiSettings, FiCode, FiDatabase } from 'react-icons/fi';
import Link from 'next/link';

function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Env Parser & Formatter",
    "url": "https://freedevtools.dev/tools/env-parser",
    "description": "Free online .env file and Java properties parser. Convert environment variables between .env, properties, JSON, YAML, and key-value formats.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Parse .env files",
      "Parse Java properties files",
      "Convert to JSON format",
      "Convert to YAML format",
      "Convert to key-value pairs",
      "Validate environment variables",
      "Handle comments and empty lines",
      "Support Unicode escapes",
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
      <div className="hover:text-indigo-600 flex items-center">
        <FiHome className="w-4 h-4 mr-1" />
        Home
      </div>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <div className="hover:text-indigo-600">
        Tools
      </div>
      <FiChevronRight className="w-4 h-4 mx-2" />
      <span className="text-gray-900 font-medium">Env & Properties Parser</span>
    </nav>
  );
}

type InputFormat = 'env' | 'properties' | 'auto';
type OutputFormat = 'json' | 'yaml' | 'keyvalue' | 'env' | 'properties';

interface ParsedData {
  [key: string]: string;
}

// Main component
export default function EnvPropertiesParserClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputFormat, setInputFormat] = useState<InputFormat>('auto');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('json');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [validEntries, setValidEntries] = useState(0);

  // Sample content for demonstration
  const sampleEnv = `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD="my-secret-password"

# API Settings
API_KEY=sk-1234567890abcdef
API_URL=https://api.example.com
DEBUG=true

# Application Settings
APP_NAME="My Application"
APP_VERSION=1.0.0
PORT=3000`;

  const sampleProperties = `# Application Configuration
app.name=My Java Application
app.version=1.0.0
app.description=A sample Java application

# Database settings
database.host=localhost
database.port=5432
database.name=myapp_db
database.username=admin
database.password=secret123

# Server configuration
server.port=8080
server.context-path=/api
server.ssl.enabled=true

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.file.name=app.log

# Multi-line value with backslash continuation
app.welcome.message=Welcome to our application! \\
                    Please enjoy your stay.

# Unicode escape example
app.greeting=Hello \\u4E16\\u754C (World)`;

  // Helper function to unescape Java properties unicode sequences
  const unescapeUnicode = (str: string): string => {
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, digits) => {
      return String.fromCharCode(parseInt(digits, 16));
    });
  };

  // Helper function to handle line continuation in properties files
  const handleLineContinuation = (lines: string[]): string[] => {
    const result: string[] = [];
    let currentLine = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.endsWith('\\') && !line.endsWith('\\\\')) {
        // Line continuation - remove the backslash and continue
        currentLine += line.slice(0, -1);
      } else {
        currentLine += line;
        result.push(currentLine);
        currentLine = '';
      }
    }
    
    if (currentLine) {
      result.push(currentLine);
    }
    
    return result;
  };

  const detectFormat = (content: string): 'env' | 'properties' => {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    
    let envScore = 0;
    let propertiesScore = 0;
    
    for (const line of lines.slice(0, 10)) { // Check first 10 non-comment lines
      // Check for properties format indicators
      if (/^[a-zA-Z][a-zA-Z0-9._-]*\s*[=:]/.test(line)) {
        propertiesScore++;
      }
      
      // Check for .env format indicators (uppercase with underscores)
      if (/^[A-Z_][A-Z0-9_]*\s*=/.test(line)) {
        envScore++;
      }
      
      // Properties often use dots in keys
      if (line.includes('.') && /^[a-zA-Z][a-zA-Z0-9._-]*\s*[=:]/.test(line)) {
        propertiesScore += 2;
      }
      
      // Check for colon separator (more common in properties)
      if (line.includes(':') && !line.includes('=')) {
        propertiesScore++;
      }
      
      // Check for line continuation (properties specific)
      if (line.endsWith('\\')) {
        propertiesScore += 2;
      }
      
      // Check for unicode escapes (properties specific)
      if (/\\u[0-9a-fA-F]{4}/.test(line)) {
        propertiesScore += 3;
      }
    }
    
    return propertiesScore > envScore ? 'properties' : 'env';
  };

  const parseContent = (content: string, format: InputFormat): { parsed: ParsedData; errors: string[] } => {
    const detectedFormat = format === 'auto' ? detectFormat(content) : format;
    
    if (detectedFormat === 'properties') {
      return parsePropertiesContent(content);
    } else {
      return parseEnvContent(content);
    }
  };

  const parseEnvContent = (content: string): { parsed: ParsedData; errors: string[] } => {
    const lines = content.split('\n');
    const parsed: ParsedData = {};
    const errors: string[] = [];
    let lineNumber = 0;

    for (const line of lines) {
      lineNumber++;
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      // Check for valid key=value format
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex === -1) {
        errors.push(`Line ${lineNumber}: Invalid format - missing '=' separator`);
        continue;
      }

      const key = trimmedLine.substring(0, equalIndex).trim();
      let value = trimmedLine.substring(equalIndex + 1).trim();

      // Validate key format for .env (more strict)
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
        errors.push(`Line ${lineNumber}: Invalid key format '${key}' - must start with letter or underscore`);
        continue;
      }

      // Handle quoted values
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      parsed[key] = value;
    }

    return { parsed, errors };
  };

  const parsePropertiesContent = (content: string): { parsed: ParsedData; errors: string[] } => {
    const rawLines = content.split('\n');
    const lines = handleLineContinuation(rawLines);
    const parsed: ParsedData = {};
    const errors: string[] = [];
    let lineNumber = 0;

    for (const line of lines) {
      lineNumber++;
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('!')) {
        continue;
      }

      // Find separator (= or :)
      let separatorIndex = -1;
      let separator = '';
      
      for (let i = 0; i < trimmedLine.length; i++) {
        const char = trimmedLine[i];
        if ((char === '=' || char === ':') && (i === 0 || trimmedLine[i-1] !== '\\')) {
          separatorIndex = i;
          separator = char;
          break;
        }
      }

      if (separatorIndex === -1) {
        errors.push(`Line ${lineNumber}: Invalid format - missing '=' or ':' separator`);
        continue;
      }

      let key = trimmedLine.substring(0, separatorIndex).trim();
      let value = trimmedLine.substring(separatorIndex + 1).trim();

      // Properties allow more flexible key formats
      if (!key || !/^[a-zA-Z0-9._-]+$/.test(key)) {
        errors.push(`Line ${lineNumber}: Invalid key format '${key}'`);
        continue;
      }

      // Handle escaped characters in key
      key = key.replace(/\\(.)/g, '$1');
      
      // Handle escaped characters and unicode in value
      value = value.replace(/\\(.)/g, (match, char) => {
        switch (char) {
          case 'n': return '\n';
          case 't': return '\t';
          case 'r': return '\r';
          case '\\': return '\\';
          case '=': return '=';
          case ':': return ':';
          case '#': return '#';
          case '!': return '!';
          default: return char;
        }
      });
      
      // Handle unicode escapes
      value = unescapeUnicode(value);

      parsed[key] = value;
    }

    return { parsed, errors };
  };

  // Helper function to convert flat dot notation to nested object
  const createNestedObject = (parsed: ParsedData): any => {
    const result: any = {};
    
    Object.entries(parsed).forEach(([key, value]) => {
      if (key.includes('.')) {
        // Split by dots and create nested structure
        const parts = key.split('.');
        let current = result;
        
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!(part in current)) {
            current[part] = {};
          }
          current = current[part];
        }
        
        current[parts[parts.length - 1]] = value;
      } else {
        result[key] = value;
      }
    });
    
    return result;
  };

  // Helper function to convert nested object to YAML string
  const objectToYaml = (obj: any, indent: string = ''): string => {
    let yaml = '';
    
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        yaml += `${indent}${key}:\n`;
        yaml += objectToYaml(value, indent + '  ');
      } else {
        const stringValue = String(value);
        // Quote values that contain special characters or spaces
        const needsQuotes = /[\s"'\\]/.test(stringValue) || stringValue === '' || 
                           ['true', 'false', 'null'].includes(stringValue.toLowerCase()) ||
                           !isNaN(Number(stringValue));
        const formattedValue = needsQuotes ? `"${stringValue.replace(/"/g, '\\"')}"` : stringValue;
        yaml += `${indent}${key}: ${formattedValue}\n`;
      }
    });
    
    return yaml;
  };

  // Helper function to flatten nested object to dot notation
  const flattenObject = (obj: any, prefix: string = ''): ParsedData => {
    const result: ParsedData = {};
    
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = String(value);
      }
    });
    
    return result;
  };

  // Helper function to convert dot notation to underscore notation for env
  const dotToUnderscore = (parsed: ParsedData): ParsedData => {
    const result: ParsedData = {};
    
    Object.entries(parsed).forEach(([key, value]) => {
      const envKey = key.replace(/\./g, '_').toUpperCase();
      result[envKey] = value;
    });
    
    return result;
  };

  const formatOutput = (parsed: ParsedData, format: OutputFormat): string => {
    switch (format) {
      case 'json':
        const nestedObject = createNestedObject(parsed);
        return JSON.stringify(nestedObject, null, 2);
      
      case 'yaml':
        const nestedForYaml = createNestedObject(parsed);
        return objectToYaml(nestedForYaml).trim();
      
      case 'keyvalue':
        return Object.entries(parsed)
          .map(([key, value]) => `${key}=${value}`)
          .join('\n');
      
      case 'env':
        const envData = dotToUnderscore(parsed);
        let envOutput = '';
        Object.entries(envData).forEach(([key, value]) => {
          // Quote values with spaces or special characters
          const needsQuotes = /[\s"]/.test(value);
          const formattedValue = needsQuotes ? `"${value.replace(/"/g, '\\"')}"` : value;
          envOutput += `${key}=${formattedValue}\n`;
        });
        return envOutput.trim();
        
      case 'properties':
        let propertiesOutput = '';
        Object.entries(parsed).forEach(([key, value]) => {
          // Escape special characters in properties format
          const escapedKey = key.replace(/[\\=:# ]/g, '\\$&');
          const escapedValue = value
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t')
            .replace(/\r/g, '\\r')
            .replace(/[=:]/g, '\\$&');
          propertiesOutput += `${escapedKey}=${escapedValue}\n`;
        });
        return propertiesOutput.trim();
      
      default:
        return '';
    }
  };

  const handleParse = () => {
    if (!input.trim()) {
      setOutput('');
      setErrors(['Please enter some content to parse']);
      setValidEntries(0);
      return;
    }

    const { parsed, errors } = parseContent(input, inputFormat);
    setErrors(errors);
    setValidEntries(Object.keys(parsed).length);
    
    if (Object.keys(parsed).length > 0) {
      const formattedOutput = formatOutput(parsed, outputFormat);
      setOutput(formattedOutput);
    } else {
      setOutput('');
    }
    setCopied(false);
  };

  const loadSample = (type: 'env' | 'properties') => {
    setInput(type === 'env' ? sampleEnv : sampleProperties);
    setInputFormat(type);
    setErrors([]);
    setValidEntries(0);
    setOutput('');
    setCopied(false);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setErrors([]);
    setValidEntries(0);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Auto-parse when format changes
  const handleFormatChange = (format: OutputFormat) => {
    setOutputFormat(format);
    if (input.trim()) {
      const { parsed } = parseContent(input, inputFormat);
      if (Object.keys(parsed).length > 0) {
        const formattedOutput = formatOutput(parsed, format);
        setOutput(formattedOutput);
      }
    }
    setCopied(false);
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
              <FiFile className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              .env & Properties Parser
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Parse and convert .env files and Java properties files between different formats. 
              Convert to JSON, YAML, key-value pairs with full validation and format detection.
            </p>
          </div>

          {/* Main Tool */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Input</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadSample('env')}
                    className="text-sm bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    .env Sample
                  </button>
                  <button
                    onClick={() => loadSample('properties')}
                    className="text-sm bg-green-100 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                  >
                    Properties Sample
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Input Format Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'auto' as InputFormat, label: 'Auto-detect' },
                    { key: 'env' as InputFormat, label: '.env' },
                    { key: 'properties' as InputFormat, label: 'Properties' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setInputFormat(key)}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        inputFormat === key
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your .env or properties file content here...

Examples:
# .env format
DB_HOST=localhost
API_KEY=your-api-key

# Properties format
app.name=My App
database.host=localhost"
                className="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleParse}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Parse & Convert
                </button>
                
                {validEntries > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    ✅ {validEntries} valid entries found
                  </span>
                )}
              </div>

              {/* Errors Display */}
              {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">Validation Errors:</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Output</h2>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>

              {/* Format Selection */}
              <div className="mb-4">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { key: 'json' as OutputFormat, label: 'JSON', icon: FiCode },
                    { key: 'yaml' as OutputFormat, label: 'YAML', icon: FiSettings },
                    { key: 'keyvalue' as OutputFormat, label: 'Key=Value', icon: FiDatabase },
                    { key: 'env' as OutputFormat, label: '.env', icon: FiFile },
                    { key: 'properties' as OutputFormat, label: 'Properties', icon: FiSettings }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => handleFormatChange(key)}
                      className={`p-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        outputFormat === key
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <textarea
                value={output}
                readOnly
                placeholder="Converted output will appear here..."
                className="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Format Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Format Differences</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">.env Format</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <div><strong>Separator:</strong> = only</div>
                  <div><strong>Keys:</strong> UPPERCASE_WITH_UNDERSCORES</div>
                  <div><strong>Comments:</strong> # at line start</div>
                  <div><strong>Quotes:</strong> Optional for values</div>
                  <div><strong>Use case:</strong> Environment variables</div>
                </div>
                <div className="mt-3 bg-white p-3 rounded border font-mono text-xs">
                  <div className="text-green-600"># Database config</div>
                  <div>DB_HOST=localhost</div>
                  <div>DB_PORT=5432</div>
                  <div>DB_NAME="my app"</div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Properties Format</h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div><strong>Separator:</strong> = or :</div>
                  <div><strong>Keys:</strong> dot.notation.style</div>
                  <div><strong>Comments:</strong> # or ! at line start</div>
                  <div><strong>Features:</strong> Line continuation, Unicode</div>
                  <div><strong>Use case:</strong> Java applications</div>
                </div>
                <div className="mt-3 bg-white p-3 rounded border font-mono text-xs">
                  <div className="text-green-600"># App config</div>
                  <div>app.name=My App</div>
                  <div>database.host:localhost</div>
                  <div>message=Hello \</div>
                  <div className="ml-8">World!</div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-600" />
              How to Use the Parser
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Paste your .env or properties file content into the input textarea</li>
                  <li>Select input format (Auto-detect, .env, or Properties) - Auto-detect works great!</li>
                  <li>Click sample buttons to see examples of each format</li>
                  <li>Choose your desired output format (JSON, YAML, Key=Value, .env, or Properties)</li>
                  <li>Click "Parse & Convert" to process the content</li>
                  <li>Review any validation errors or warnings</li>
                  <li>Copy the converted output using the "Copy" button</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">✅ Supported Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>Auto-detection of file format</li>
                    <li>Comments (# or ! for properties)</li>
                    <li>Quoted values</li>
                    <li>Line continuation in properties (\)</li>
                    <li>Unicode escapes (\u0000)</li>
                    <li>Special character escaping</li>
                    <li>Multiple output formats</li>
                    <li>Validation and error reporting</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">📝 Format Guidelines</h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                    <li><strong>.env:</strong> UPPER_CASE keys, = separator only</li>
                    <li><strong>Properties:</strong> dot.notation keys, = or : separator</li>
                    <li>Properties support line continuation with \</li>
                    <li>Unicode: \u0041 becomes 'A' in properties</li>
                    <li>Escape special chars: \n, \t, \\, \=, \:</li>
                    <li>Comments start line with # (or ! for properties)</li>
                  </ul>
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
                <p className="text-sm text-gray-600">Format and validate JSON data with syntax highlighting</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiSettings className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode and decode Base64 strings for configuration</p>
              </Link>
              
              <Link href="/tools/api-code-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiTerminal className="text-indigo-600" />
                  <h3 className="font-semibold">API Code Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate API request code in multiple languages</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}