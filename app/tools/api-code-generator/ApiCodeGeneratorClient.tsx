'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiCheckCircle, FiHome, FiChevronRight, FiCode, FiGlobe, FiSettings, FiPlus, FiTrash2, FiClock, FiShield, FiZap, FiTerminal  } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "API Request Code Snippet Generator",
    "url": "https://freedevtools.dev/tools/api-code-generator",
    "description": "Free online tool to generate API request code snippets in multiple programming languages with authentication and error handling.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate code in 10+ programming languages",
      "Support for multiple HTTP methods",
      "Authentication headers support",
      "Error handling included",
      "TypeScript type definitions",
      "One-click copy to clipboard",
      "Real-time code preview"
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
      <span className="text-gray-900 font-medium">API Code Generator</span>
    </nav>
  );
}

interface Header {
  key: string;
  value: string;
}

interface RequestConfig {
  url: string;
  method: string;
  headers: Header[];
  body: string;
  authType: string;
  authValue: string;
}

// Code generators for different languages
const generateCode = (config: RequestConfig, language: string): string => {
  const { url, method, headers, body, authType, authValue } = config;
  
  // Helper function to format headers
  const formatHeaders = (lang: string) => {
    const allHeaders = [...headers];
    if (authType === 'bearer' && authValue) {
      allHeaders.push({ key: 'Authorization', value: `Bearer ${authValue}` });
    } else if (authType === 'apikey' && authValue) {
      allHeaders.push({ key: 'X-API-Key', value: authValue });
    }
    
    switch (lang) {
      case 'javascript':
      case 'typescript':
        return allHeaders.length > 0 
          ? `{\n    ${allHeaders.map(h => `'${h.key}': '${h.value}'`).join(',\n    ')}\n  }`
          : '{}';
      case 'python':
        return allHeaders.length > 0
          ? `{\n    ${allHeaders.map(h => `'${h.key}': '${h.value}'`).join(',\n    ')}\n}`
          : '{}';
      case 'curl':
        return allHeaders.map(h => `-H "${h.key}: ${h.value}"`).join(' ');
      default:
        return '';
    }
  };

  switch (language) {
    case 'javascript':
      return `// JavaScript Fetch API
async function makeApiRequest() {
  try {
    const response = await fetch('${url}', {
      method: '${method}',
      headers: ${formatHeaders('javascript')},${method !== 'GET' && body ? `\n      body: JSON.stringify(${body || '{}'}),` : ''}
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Call the function
makeApiRequest();`;

    case 'typescript':
      return `// TypeScript Fetch API with types
interface ApiResponse {
  // Define your expected response type here
  [key: string]: any;
}

interface ApiError {
  message: string;
  status: number;
}

async function makeApiRequest(): Promise<ApiResponse> {
  try {
    const response: Response = await fetch('${url}', {
      method: '${method}' as const,
      headers: ${formatHeaders('typescript')},${method !== 'GET' && body ? `\n      body: JSON.stringify(${body || '{}'}),` : ''}
    });

    if (!response.ok) {
      const error: ApiError = {
        message: \`HTTP error! status: \${response.status}\`,
        status: response.status
      };
      throw error;
    }

    const data: ApiResponse = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Call the function
makeApiRequest()
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    case 'axios':
      return `// Axios HTTP Client
import axios from 'axios';

async function makeApiRequest() {
  try {
    const response = await axios({
      method: '${method.toLowerCase()}',
      url: '${url}',
      headers: ${formatHeaders('javascript')},${method !== 'GET' && body ? `\n      data: ${body || '{}'},` : ''}
      timeout: 10000, // 10 seconds timeout
    });

    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    throw error;
  }
}

// Call the function
makeApiRequest();`;

    case 'python':
      return `# Python requests library
import requests
import json

def make_api_request():
    try:
        headers = ${formatHeaders('python')}
        ${method !== 'GET' && body ? `data = ${body || '{}'}` : ''}
        
        response = requests.${method.toLowerCase()}(
            '${url}',
            headers=headers,${method !== 'GET' && body ? `\n            json=data,` : ''}
            timeout=10  # 10 seconds timeout
        )
        
        # Raise an exception for HTTP errors
        response.raise_for_status()
        
        # Parse JSON response
        data = response.json()
        print('Success:', data)
        return data
        
    except requests.exceptions.RequestException as error:
        print(f'Error: {error}')
        raise error

# Call the function
if __name__ == "__main__":
    make_api_request()`;

    case 'curl':
      return `# cURL command
curl -X ${method} \\
  '${url}' \\
  ${formatHeaders('curl')} \\${method !== 'GET' && body ? `\n  -d '${body || '{}'}' \\` : ''}
  -w "\\nHTTP Status: %{http_code}\\n" \\
  --connect-timeout 10 \\
  --max-time 30`;

    case 'node':
      return `// Node.js with built-in https/http module
const https = require('https');
const http = require('http');
const url = require('url');

function makeApiRequest() {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL('${url}');
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: '${method}',
      headers: ${formatHeaders('javascript')},
      timeout: 10000
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('Success:', jsonData);
          resolve(jsonData);
        } catch (error) {
          console.error('Parse Error:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request Error:', error);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    ${method !== 'GET' && body ? `req.write(JSON.stringify(${body || '{}'}));` : ''}
    req.end();
  });
}

// Call the function
makeApiRequest()
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    case 'php':
      return `<?php
// PHP cURL request
function makeApiRequest() {
    $curl = curl_init();
    
    $headers = [${headers.map(h => `\n        '${h.key}: ${h.value}'`).join(',')}${authType === 'bearer' && authValue ? `,\n        'Authorization: Bearer ${authValue}'` : ''}${authType === 'apikey' && authValue ? `,\n        'X-API-Key: ${authValue}'` : ''}
    ];

    curl_setopt_array($curl, [
        CURLOPT_URL => '${url}',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CUSTOMREQUEST => '${method}',
        CURLOPT_HTTPHEADER => $headers,${method !== 'GET' && body ? `\n        CURLOPT_POSTFIELDS => json_encode(${body || '[]'}),` : ''}
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    
    curl_close($curl);

    if ($error) {
        throw new Exception("cURL Error: " . $error);
    }

    if ($httpCode >= 400) {
        throw new Exception("HTTP Error: " . $httpCode);
    }

    $data = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON Parse Error: " . json_last_error_msg());
    }

    return $data;
}

// Call the function
try {
    $result = makeApiRequest();
    echo "Success: " . json_encode($result, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>`;

    case 'go':
      return `// Go HTTP request
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

func makeApiRequest() (map[string]interface{}, error) {
    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    ${method !== 'GET' && body ? `jsonData, err := json.Marshal(${body || 'map[string]interface{}{}'})
    if err != nil {
        return nil, fmt.Errorf("error marshaling JSON: %v", err)
    }

    req, err := http.NewRequest("${method}", "${url}", bytes.NewBuffer(jsonData))` : `req, err := http.NewRequest("${method}", "${url}", nil)`}
    if err != nil {
        return nil, fmt.Errorf("error creating request: %v", err)
    }

    // Set headers${headers.map(h => `\n    req.Header.Set("${h.key}", "${h.value}")`).join('')}${authType === 'bearer' && authValue ? `\n    req.Header.Set("Authorization", "Bearer ${authValue}")` : ''}${authType === 'apikey' && authValue ? `\n    req.Header.Set("X-API-Key", "${authValue}")` : ''}

    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("error making request: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("HTTP error: %d", resp.StatusCode)
    }

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("error reading response: %v", err)
    }

    var result map[string]interface{}
    if err := json.Unmarshal(body, &result); err != nil {
        return nil, fmt.Errorf("error parsing JSON: %v", err)
    }

    return result, nil
}

func main() {
    result, err := makeApiRequest()
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }

    fmt.Printf("Success: %+v\\n", result)
}`;

    case 'java':
      return `// Java HTTP request (Java 11+)
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

public class ApiRequest {
    private static final HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .build();
    
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static Map<String, Object> makeApiRequest() throws Exception {
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
            .uri(URI.create("${url}"))
            .timeout(Duration.ofSeconds(30))${headers.map(h => `\n            .header("${h.key}", "${h.value}")`).join('')}${authType === 'bearer' && authValue ? `\n            .header("Authorization", "Bearer ${authValue}")` : ''}${authType === 'apikey' && authValue ? `\n            .header("X-API-Key", "${authValue}")` : ''};

        ${method !== 'GET' && body ? `String jsonBody = objectMapper.writeValueAsString(${body || 'Map.of()'});
        HttpRequest request = requestBuilder
            .${method.toLowerCase()}(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();` : `HttpRequest request = requestBuilder
            .${method.toLowerCase()}()
            .build();`}

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() >= 400) {
            throw new RuntimeException("HTTP error: " + response.statusCode());
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> result = objectMapper.readValue(response.body(), Map.class);
        
        return result;
    }

    public static void main(String[] args) {
        try {
            Map<String, Object> result = makeApiRequest();
            System.out.println("Success: " + result);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`;

    case 'ruby':
      return `# Ruby HTTP request
require 'net/http'
require 'json'
require 'uri'

def make_api_request
  uri = URI('${url}')
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = uri.scheme == 'https'
  http.read_timeout = 30
  http.open_timeout = 10

  request = Net::HTTP::${method.charAt(0) + method.slice(1).toLowerCase()}.new(uri)
  
  # Set headers${headers.map(h => `\n  request['${h.key}'] = '${h.value}'`).join('')}${authType === 'bearer' && authValue ? `\n  request['Authorization'] = 'Bearer ${authValue}'` : ''}${authType === 'apikey' && authValue ? `\n  request['X-API-Key'] = '${authValue}'` : ''}

  ${method !== 'GET' && body ? `request.body = (${body || '{}'}).to_json` : ''}

  begin
    response = http.request(request)
    
    unless response.is_a?(Net::HTTPSuccess)
      raise "HTTP error: #{response.code} #{response.message}"
    end

    data = JSON.parse(response.body)
    puts "Success: #{data}"
    data
  rescue JSON::ParserError => e
    puts "JSON Parse Error: #{e.message}"
    raise e
  rescue StandardError => e
    puts "Error: #{e.message}"
    raise e
  end
end

# Call the function
begin
  result = make_api_request
rescue StandardError => e
  puts "Failed: #{e.message}"
end`;

    default:
      return '// Language not supported yet';
  }
};

// Main component
export default function ApiCodeGeneratorClient() {
  const [config, setConfig] = useState<RequestConfig>({
    url: 'https://api.example.com/users',
    method: 'GET',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '',
    authType: 'none',
    authValue: ''
  });

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript (Fetch)', icon: '🟨' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'axios', name: 'Axios', icon: '🟣' },
    { id: 'python', name: 'Python (Requests)', icon: '🐍' },
    { id: 'curl', name: 'cURL', icon: '📡' },
    { id: 'node', name: 'Node.js (Native)', icon: '🟢' },
    { id: 'php', name: 'PHP (cURL)', icon: '🐘' },
    { id: 'go', name: 'Go', icon: '🔵' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'ruby', name: 'Ruby', icon: '💎' }
  ];

  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const authTypes = [
    { value: 'none', label: 'No Authentication' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'apikey', label: 'API Key' }
  ];

  const addHeader = () => {
    setConfig({
      ...config,
      headers: [...config.headers, { key: '', value: '' }]
    });
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...config.headers];
    newHeaders[index][field] = value;
    setConfig({ ...config, headers: newHeaders });
  };

  const removeHeader = (index: number) => {
    setConfig({
      ...config,
      headers: config.headers.filter((_, i) => i !== index)
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const code = generateCode(config, selectedLanguage);
    setGeneratedCode(code);
  }, [config, selectedLanguage]);

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiTerminal className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Request Code Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate ready-to-use API request code snippets in 10+ programming languages. 
              Include authentication, error handling, and TypeScript types automatically.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiSettings className="text-indigo-600" />
                Request Configuration
              </h2>
              
              {/* URL Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API URL
                </label>
                <input
                  type="url"
                  value={config.url}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                  placeholder="https://api.example.com/endpoint"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* HTTP Method */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTTP Method
                </label>
                <select
                  value={config.method}
                  onChange={(e) => setConfig({ ...config, method: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {httpMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Authentication */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authentication
                </label>
                <select
                  value={config.authType}
                  onChange={(e) => setConfig({ ...config, authType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                >
                  {authTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                
                {config.authType !== 'none' && (
                  <input
                    type="text"
                    value={config.authValue}
                    onChange={(e) => setConfig({ ...config, authValue: e.target.value })}
                    placeholder={config.authType === 'bearer' ? 'Enter bearer token' : 'Enter API key'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>

              {/* Headers */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Headers
                  </label>
                  <button
                    onClick={addHeader}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Header
                  </button>
                </div>
                
                <div className="space-y-2">
                  {config.headers.map((header, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) => updateHeader(index, 'key', e.target.value)}
                        placeholder="Header name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) => updateHeader(index, 'value', e.target.value)}
                        placeholder="Header value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => removeHeader(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Body */}
              {config.method !== 'GET' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Body (JSON)
                  </label>
                  <textarea
                    value={config.body}
                    onChange={(e) => setConfig({ ...config, body: e.target.value })}
                    placeholder='{"key": "value"}'
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  />
                </div>
              )}
            </div>

            {/* Code Output Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Language Selector */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Generated Code</h2>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`p-2 text-left rounded-md text-sm transition-colors ${
                        selectedLanguage === lang.id
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Display */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center gap-2"
                  >
                    {copied ? <FiCheckCircle className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto rounded-b-lg" style={{ minHeight: '400px' }}>
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          </div>

       

          {/* How to Use Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-600" />
              How to Use the API Code Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter your API endpoint URL in the URL field</li>
                  <li>Select the appropriate HTTP method (GET, POST, PUT, PATCH, DELETE)</li>
                  <li>Configure authentication if required (Bearer token or API key)</li>
                  <li>Add any custom headers needed for your API</li>
                  <li>Add request body data for POST/PUT/PATCH requests</li>
                  <li>Choose your preferred programming language from the options</li>
                  <li>Copy the generated code and integrate it into your project</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Test your API endpoints with tools like Postman before generating code</li>
                  <li>Always include proper error handling in production applications</li>
                  <li>Set appropriate timeout values for your API calls</li>
                  <li>Use environment variables for API keys and sensitive data</li>
                  <li>Consider rate limiting and retry logic for robust applications</li>
                </ul>
              </div>
            </div>
          </div>

             {/* Features Section */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Our API Code Generator?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiTerminal className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">10+ Languages</h3>
                <p className="text-gray-600 text-sm">
                  Generate code snippets in JavaScript, TypeScript, Python, Go, Java, PHP, Ruby, cURL, and more.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiShield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Authentication Support</h3>
                <p className="text-gray-600 text-sm">
                  Built-in support for Bearer tokens, API keys, and custom authentication headers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiZap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Error Handling</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive error handling and timeout configuration included in all generated code.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiClock className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Generation</h3>
                <p className="text-gray-600 text-sm">
                  Code updates instantly as you modify the request configuration.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiCopy className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">One-Click Copy</h3>
                <p className="text-gray-600 text-sm">
                  Copy generated code to clipboard with a single click for immediate use.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiGlobe className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">TypeScript Support</h3>
                <p className="text-gray-600 text-sm">
                  Generated TypeScript code includes proper type definitions and interfaces.
                </p>
              </div>
            </div>
          </div>
{/* Related Tools */}
<div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
  <div className="grid md:grid-cols-3 gap-4">
    <Link href="/tools/json-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-2">
        <FiCode className="text-indigo-600" />
        <h3 className="font-semibold">JSON Generator</h3>
      </div>
      <p className="text-sm text-gray-600">Generate mock JSON data for API testing</p>
    </Link>
    
    <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-2">
        <FiGlobe className="text-indigo-600" />
        <h3 className="font-semibold">Base64 Encoder</h3>
      </div>
      <p className="text-sm text-gray-600">Encode API credentials and data safely</p>
    </Link>
    
    <Link href="/tools/password-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-2">
        <FiShield className="text-indigo-600" />
        <h3 className="font-semibold">Password Generator</h3>
      </div>
      <p className="text-sm text-gray-600">Generate secure API keys and tokens</p>
    </Link>
  </div>
</div>

        </div>
      </div>
    </>
  );
}