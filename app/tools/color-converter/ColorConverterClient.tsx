'use client';
import { useState } from 'react';
import { FiCopy, FiDroplet, FiHome, FiChevronRight, FiEye, FiType, FiSmartphone, FiLock } from 'react-icons/fi';
import Link from 'next/link';

// Schema markup component
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Converter",
    "url": "https://freedevtools.dev/tools/color-converter",
    "description": "Free online color converter tool to convert between HEX, RGB, HSL, and CMYK color formats with visual color picker.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert HEX to RGB, HSL, CMYK",
      "Convert RGB to HEX, HSL, CMYK",
      "Convert HSL to HEX, RGB, CMYK",
      "Convert CMYK to HEX, RGB, HSL",
      "Visual color picker",
      "Live color preview",
      "One-click copy to clipboard",
      "Support for all major color formats"
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
      <span className="text-gray-900 font-medium">Color Converter</span>
    </nav>
  );
}

// Simple color picker component (replacing react-colorful dependency)
function ColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  return (
    <div className="space-y-4">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 rounded-lg border-2 border-gray-300 cursor-pointer"
      />
    </div>
  );
}

// Main component
export default function ColorConverterClient() {
  const [color, setColor] = useState('#3b82f6');
  const [inputFormat, setInputFormat] = useState<'hex' | 'rgb' | 'hsl' | 'cmyk'>('hex');
  const [copied, setCopied] = useState(false);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, string: `rgb(${r}, ${g}, ${b})` };
  };

  // Convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    const hDeg = Math.round(h * 360);
    const sPerc = Math.round(s * 100);
    const lPerc = Math.round(l * 100);
    return { h: hDeg, s: sPerc, l: lPerc, string: `hsl(${hDeg}, ${sPerc}%, ${lPerc}%)` };
  };

  // Convert HEX to CMYK
  const hexToCmyk = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    const cPerc = Math.round(c * 100);
    const mPerc = Math.round(m * 100);
    const yPerc = Math.round(y * 100);
    const kPerc = Math.round(k * 100);
    return { c: cPerc, m: mPerc, y: yPerc, k: kPerc, string: `cmyk(${cPerc}%, ${mPerc}%, ${yPerc}%, ${kPerc}%)` };
  };

  // Convert RGB to HEX
  const rgbToHex = (rgb: string) => {
    const matches = rgb.match(/\d+/g);
    if (!matches || matches.length < 3) return '#000000';
    const [r, g, b] = matches.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
  };

  // Convert HSL to HEX
  const hslToHex = (hsl: string) => {
    const matches = hsl.match(/\d+/g);
    if (!matches || matches.length < 3) return '#000000';
    const [h, s, l] = matches.map(Number);
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    const rVal = Math.round((r + m) * 255);
    const gVal = Math.round((g + m) * 255);
    const bVal = Math.round((b + m) * 255);
    return `#${rVal.toString(16).padStart(2, '0')}${gVal.toString(16).padStart(2, '0')}${bVal.toString(16).padStart(2, '0')}`;
  };

  // Convert CMYK to HEX
  const cmykToHex = (cmyk: string) => {
    const matches = cmyk.match(/\d+/g);
    if (!matches || matches.length < 4) return '#000000';
    const [c, m, y, k] = matches.map(Number);
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    try {
      switch (inputFormat) {
        case 'hex':
          if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
            setColor(value.length === 4 ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value);
          }
          break;
        case 'rgb':
          if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(value)) {
            setColor(rgbToHex(value));
          }
          break;
        case 'hsl':
          if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value)) {
            setColor(hslToHex(value));
          }
          break;
        case 'cmyk':
          if (/^cmyk\(\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value)) {
            setColor(cmykToHex(value));
          }
          break;
      }
    } catch (e) {
      console.error('Invalid color format');
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rgbValues = hexToRgb(color);
  const hslValues = hexToHsl(color);
  const cmykValues = hexToCmyk(color);

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FiDroplet className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Color Converter Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Perfect for web designers, 
              developers, and graphic artists who need accurate color conversions.
            </p>
          </div>

          {/* Main Tool */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Picker and Input */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Color Picker & Input</h3>
                <ColorPicker color={color} onChange={setColor} />
                <div className="flex items-center gap-2">
                  <select
                    value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value as 'hex' | 'rgb' | 'hsl' | 'cmyk')}
                    className="p-2 border rounded-lg"
                  >
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                    <option value="cmyk">CMYK</option>
                  </select>
                  <input
                    value={
                      inputFormat === 'hex' ? color :
                      inputFormat === 'rgb' ? rgbValues.string :
                      inputFormat === 'hsl' ? hslValues.string :
                      cmykValues.string
                    }
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder={`Enter ${inputFormat.toUpperCase()} color`}
                  />
                </div>
              </div>

              {/* Color Formats Output */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Converted Formats</h3>
                
                {/* Color Preview */}
                <div className="p-6 rounded-lg border-2 border-gray-300" style={{ backgroundColor: color }}>
                  <div className="flex items-center justify-center">
                    <span className="text-white bg-black bg-opacity-50 px-3 py-1 rounded font-medium">
                      Color Preview
                    </span>
                  </div>
                </div>

                {/* Format Outputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">HEX</label>
                    <div className="flex items-center gap-2">
                      <input
                        value={color.toUpperCase()}
                        readOnly
                        className="flex-1 p-2 border rounded-lg bg-gray-50 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(color.toUpperCase())}
                        className="bg-gray-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        title="Copy HEX"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">RGB</label>
                    <div className="flex items-center gap-2">
                      <input
                        value={rgbValues.string}
                        readOnly
                        className="flex-1 p-2 border rounded-lg bg-gray-50 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(rgbValues.string)}
                        className="bg-gray-200 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-300 transition-colors"
                        title="Copy RGB"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">HSL</label>
                    <div className="flex items-center gap-2">
                      <input
                        value={hslValues.string}
                        readOnly
                        className="flex-1 p-2 border rounded-lg bg-gray-50 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(hslValues.string)}
                        className="bg-gray-200 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-300 transition-colors"
                        title="Copy HSL"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">CMYK</label>
                    <div className="flex items-center gap-2">
                      <input
                        value={cmykValues.string}
                        readOnly
                        className="flex-1 p-2 border rounded-lg bg-gray-50 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(cmykValues.string)}
                        className="bg-gray-200 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-300 transition-colors"
                        title="Copy CMYK"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Values Breakdown */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3">Color Values Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">RGB Values</p>
                  <p className="font-mono">R: {rgbValues.r}</p>
                  <p className="font-mono">G: {rgbValues.g}</p>
                  <p className="font-mono">B: {rgbValues.b}</p>
                </div>
                <div>
                  <p className="text-gray-600">HSL Values</p>
                  <p className="font-mono">H: {hslValues.h}°</p>
                  <p className="font-mono">S: {hslValues.s}%</p>
                  <p className="font-mono">L: {hslValues.l}%</p>
                </div>
                <div>
                  <p className="text-gray-600">CMYK Values</p>
                  <p className="font-mono">C: {cmykValues.c}%</p>
                  <p className="font-mono">M: {cmykValues.m}%</p>
                  <p className="font-mono">Y: {cmykValues.y}%</p>
                  <p className="font-mono">K: {cmykValues.k}%</p>
                </div>
                <div>
                  <p className="text-gray-600">HEX Value</p>
                  <p className="font-mono">{color.toUpperCase()}</p>
                  <p className="text-xs text-gray-500 mt-1">Web Safe: {/^#([0369CF])\1([0369CF])\2([0369CF])\3$/.test(color.toUpperCase()) ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Guide */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiEye className="text-indigo-600" />
              How to Use the Color Converter
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Choose your input method: use the visual color picker or enter a color value directly</li>
                  <li>If entering manually, select the input format (HEX, RGB, HSL, or CMYK) from the dropdown</li>
                  <li>Enter or paste your color value in the selected format</li>
                  <li>View the converted values in all supported formats automatically</li>
                  <li>Copy any format to your clipboard using the copy buttons</li>
                  <li>Use the detailed breakdown to understand individual color components</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🎨 Supported Color Formats</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li><strong>HEX:</strong> #FF5733 or #F53 (web colors)</li>
                    <li><strong>RGB:</strong> rgb(255, 87, 51) (screen colors)</li>
                    <li><strong>HSL:</strong> hsl(14, 100%, 60%) (hue, saturation, lightness)</li>
                    <li><strong>CMYK:</strong> cmyk(0%, 66%, 80%, 0%) (print colors)</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Pro Tips</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>Use HEX for web development and CSS</li>
                    <li>Use RGB for digital screens and monitors</li>
                    <li>Use CMYK for print design and materials</li>
                    <li>Use HSL for intuitive color adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Color Theory Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Color Formats</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Digital Formats</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium">HEX (Hexadecimal)</h4>
                      <p className="text-sm text-gray-600">Used in web design. Format: #RRGGBB where each pair represents red, green, and blue values in hexadecimal (00-FF).</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">RGB (Red, Green, Blue)</h4>
                      <p className="text-sm text-gray-600">Additive color model used by screens. Each value ranges from 0-255, representing the intensity of each color channel.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium">HSL (Hue, Saturation, Lightness)</h4>
                      <p className="text-sm text-gray-600">Intuitive color model. Hue (0-360°), Saturation (0-100%), Lightness (0-100%). Great for color adjustments.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-orange-700 mb-2">Print Format</h3>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium">CMYK (Cyan, Magenta, Yellow, Key/Black)</h4>
                    <p className="text-sm text-gray-600">Subtractive color model used in printing. Each value is a percentage (0-100%) representing the amount of each ink.</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                    <li>Colors may appear different between screen and print</li>
                    <li>Not all RGB colors can be accurately reproduced in CMYK</li>
                    <li>Always test print colors with actual printing materials</li>
                    <li>Web-safe colors use specific HEX values for browser compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Design Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/qr-generator" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiSmartphone className="text-indigo-600" />
                  <h3 className="font-semibold">QR Code Generator</h3>
                </div>
                <p className="text-sm text-gray-600">Generate QR codes with custom colors and styling</p>
              </Link>
              
              <Link href="/tools/base64-tool" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiLock className="text-indigo-600" />
                  <h3 className="font-semibold">Base64 Encoder</h3>
                </div>
                <p className="text-sm text-gray-600">Encode images and files for web use</p>
              </Link>
              
              <Link href="/tools/case-converter" className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FiType className="text-indigo-600" />
                  <h3 className="font-semibold">Case Converter</h3>
                </div>
                <p className="text-sm text-gray-600">Convert text to uppercase, lowercase, title case</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}