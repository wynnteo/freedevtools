'use client';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { FiDownload, FiCheckCircle, FiRefreshCw, FiCopy, FiHome, FiChevronRight, FiSmartphone, FiSettings, FiKey, FiDroplet, FiWifi, FiLink, FiUser, FiAlignLeft } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QR Code Generator",
    "url": "https://freedevtools.dev/tools/qr-generator",
    "description": "Free online QR code generator to create custom QR codes for URLs, text, WiFi, and more with customizable options.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate QR codes for URLs, text, WiFi",
      "Customizable colors and sizes",
      "Multiple error correction levels",
      "Download in PNG, JPEG, SVG formats",
      "Copy QR code to clipboard",
      "Instant preview generation"
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
      <span className="text-gray-900 font-medium">QR Code Generator</span>
    </nav>
  );
}

// QR Code templates
const qrTemplates = [
  {
    name: 'Website URL',
    icon: <FiLink />,
    template: 'https://example.com',
    description: 'Link to a website or webpage'
  },
  {
    name: 'WiFi Network',
    icon: <FiWifi />,
    template: 'WIFI:S:NetworkName;T:WPA;P:password;;',
    description: 'Share WiFi credentials'
  },
  {
    name: 'Contact Card',
    icon: <FiUser />,
    template: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD',
    description: 'Share contact information'
  }
];

// Main component
export default function QrGeneratorClient() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('');

  const downloadQR = async (format: 'png' | 'jpeg' | 'svg') => {
    const qrElement = document.getElementById('qr-code');
    if (!qrElement || !text.trim()) return;
    
    setDownloading(true);
    setDownloadFormat(format);
    
    try {
      const downloadFn = format === 'png' ? toPng : format === 'jpeg' ? toJpeg : toSvg;
      const dataUrl = await downloadFn(qrElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: bgColor
      });
      
      const link = document.createElement('a');
      link.download = `qr-code.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download:', error);
      alert('Failed to download QR code');
    } finally {
      setDownloading(false);
      setDownloadFormat('');
    }
  };

  const copyToClipboard = async () => {
    const qrElement = document.getElementById('qr-code');
    if (!qrElement || !text.trim()) return;
    
    try {
      const dataUrl = await toPng(qrElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: bgColor
      });
      const blob = await fetch(dataUrl).then((res) => res.blob());
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy QR code');
    }
  };

  const resetFields = () => {
    setText('');
    setSize(256);
    setFgColor('#000000');
    setBgColor('#ffffff');
    setErrorCorrection('H');
  };

  const useTemplate = (template: string) => {
    setText(template);
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
              <FiSmartphone className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              QR Code Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create custom QR codes for URLs, text, WiFi networks, and more. 
              Free online tool with customizable colors, sizes, and error correction levels.
            </p>
          </div>

          {/* Quick Templates */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiSettings className="text-indigo-600" />
              Quick Templates
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {qrTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template.template)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-indigo-600 group-hover:text-indigo-700">
                      {template.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content to encode:
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL, text, WiFi details, or other data..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
                  />
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiSettings className="w-4 h-4" />
                    QR Code Settings
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size (100-500px)
                      </label>
                      <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Math.min(500, Math.max(100, Number(e.target.value))))}
                        min="100"
                        max="500"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Error Correction
                      </label>
                      <select
                        value={errorCorrection}
                        onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="L">Low (7%)</option>
                        <option value="M">Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiDroplet className="w-4 h-4" />
                      Colors
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foreground Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetFields}
                    className="w-full p-3 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Reset All Settings
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="flex flex-col items-center justify-center">
                {text.trim() ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">QR Code Preview</h3>
                      <div 
                        id="qr-code" 
                        className="inline-block p-4 bg-white rounded-lg shadow-sm border"
                        style={{ backgroundColor: bgColor }}
                      >
                        <QRCodeCanvas 
                          value={text}
                          size={size}
                          bgColor={bgColor}
                          fgColor={fgColor}
                          level={errorCorrection}
                          includeMargin={true}
                        />
                      </div>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => downloadQR('png')}
                        disabled={downloading && downloadFormat === 'png'}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
                      >
                        {downloading && downloadFormat === 'png' ? (
                          <FiRefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <FiDownload className="w-4 h-4" />
                        )}
                        PNG
                      </button>
                      
                      <button
                        onClick={() => downloadQR('jpeg')}
                        disabled={downloading && downloadFormat === 'jpeg'}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
                      >
                        {downloading && downloadFormat === 'jpeg' ? (
                          <FiRefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <FiDownload className="w-4 h-4" />
                        )}
                        JPEG
                      </button>
                      
                      <button
                        onClick={() => downloadQR('svg')}
                        disabled={downloading && downloadFormat === 'svg'}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
                      >
                        {downloading && downloadFormat === 'svg' ? (
                          <FiRefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <FiDownload className="w-4 h-4" />
                        )}
                        SVG
                      </button>
                      
                      <button
                        onClick={copyToClipboard}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-colors"
                      >
                        {copied ? (
                          <>
                            <FiCheckCircle className="w-4 h-4 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FiSmartphone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg mb-2">Enter content to generate QR code</p>
                    <p className="text-sm">Your QR code will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiSmartphone className="text-indigo-600" />
              How to Use the QR Code Generator
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter the content you want to encode (URL, text, WiFi details, etc.)</li>
                  <li>Choose a quick template or create your own content</li>
                  <li>Customize the QR code settings:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Size:</strong> Adjust dimensions from 100px to 500px</li>
                    <li><strong>Error Correction:</strong> Higher levels allow the QR code to be read even if partially damaged</li>
                    <li><strong>Colors:</strong> Customize foreground and background colors (ensure good contrast)</li>
                  </ul>
                  <li>Preview your QR code in real-time</li>
                  <li>Download in your preferred format (PNG, JPEG, or SVG)</li>
                  <li>Test the QR code with a scanner before using it</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Use high contrast colors (dark on light) for better scanning</li>
                  <li>Choose higher error correction for QR codes that might get damaged</li>
                  <li>Keep URLs short to generate smaller, cleaner QR codes</li>
                  <li>Test your QR codes on multiple devices before distribution</li>
                  <li>SVG format is best for scalable designs and print materials</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">QR Code Examples</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700 flex items-center gap-2">
                  <FiLink className="w-5 h-5" />
                  Website URL
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Format:</div>
                    <code className="text-sm">https://example.com</code>
                  </div>
                  <div className="text-sm text-gray-600">
                    Simple URL format - users will be redirected to the website when scanned.
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2">
                  <FiWifi className="w-5 h-5" />
                  WiFi Network
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Format:</div>
                    <code className="text-sm text-wrap break-all">
                      WIFI:S:NetworkName;T:WPA;P:password;;
                    </code>
                  </div>
                  <div className="text-sm text-gray-600">
                    Allows automatic WiFi connection. Replace NetworkName and password with actual values.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-700 flex items-center gap-2">
                  <FiUser className="w-5 h-5" />
                  Contact Card
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-1">Format:</div>
                    <code className="text-sm text-wrap break-all">
                      BEGIN:VCARD<br />
                      VERSION:3.0<br />
                      FN:John Doe<br />
                      TEL:+1234567890<br />
                      END:VCARD
                    </code>
                  </div>
                  <div className="text-sm text-gray-600">
                    vCard format for sharing contact information that can be saved directly to contacts.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Generator Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/password-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiKey className="text-indigo-600" />
                  <h3 className="font-semibold">Password Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate secure passwords with custom options</p>
              </Link>
              
              <Link href="/tools/color-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiDroplet className="text-indigo-600" />
                  <h3 className="font-semibold">Color Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert between HEX, RGB, HSL color formats</p>
              </Link>
              
              <Link href="/tools/lorem-ipsum" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiAlignLeft className="text-indigo-600" />
                  <h3 className="font-semibold">Lorem Ipsum Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate placeholder text for design projects</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
