import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Palette, Type, Box, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StylePanelProps {
  onClose?: () => void;
}

interface StyleState {
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
  borderRadius: string;
  boxShadow: string;
}

export const StylePanel: React.FC<StylePanelProps> = ({ onClose }) => {
  const [styles, setStyles] = useState<StyleState>({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontSize: "16",
    fontWeight: "400",
    padding: "16",
    borderRadius: "8",
    boxShadow: "none",
  });

  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    typography: true,
    spacing: false,
    effects: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateStyle = (key: keyof StyleState, value: string) => {
    setStyles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-valasys-orange" />
          <h2 className="font-bold text-gray-900">Styling</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Colors Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("colors")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-valasys-orange" />
              <span className="font-semibold text-sm text-gray-900">Colors</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-600 transition-transform",
                expandedSections.colors && "rotate-180"
              )}
            />
          </button>

          {expandedSections.colors && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Background Color */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Background Color
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.backgroundColor}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.backgroundColor}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="flex-1 text-xs"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Text Color
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="flex-1 text-xs"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Typography Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("typography")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-valasys-orange" />
              <span className="font-semibold text-sm text-gray-900">Typography</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-600 transition-transform",
                expandedSections.typography && "rotate-180"
              )}
            />
          </button>

          {expandedSections.typography && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Font Size */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Font Size: {styles.fontSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={styles.fontSize}
                  onChange={(e) => updateStyle("fontSize", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Font Weight */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Font Weight
                </label>
                <select
                  value={styles.fontWeight}
                  onChange={(e) => updateStyle("fontWeight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-valasys-orange focus:border-valasys-orange"
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extrabold (800)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Spacing Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("spacing")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-valasys-orange" />
              <span className="font-semibold text-sm text-gray-900">Spacing</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-600 transition-transform",
                expandedSections.spacing && "rotate-180"
              )}
            />
          </button>

          {expandedSections.spacing && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Padding */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Padding: {styles.padding}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={styles.padding}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Border Radius: {styles.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={styles.borderRadius}
                  onChange={(e) => updateStyle("borderRadius", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Effects Section */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("effects")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-valasys-orange" />
              <span className="font-semibold text-sm text-gray-900">Effects</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-600 transition-transform",
                expandedSections.effects && "rotate-180"
              )}
            />
          </button>

          {expandedSections.effects && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Shadow */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Shadow
                </label>
                <select
                  value={styles.boxShadow}
                  onChange={(e) => updateStyle("boxShadow", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-valasys-orange focus:border-valasys-orange"
                >
                  <option value="none">None</option>
                  <option value="0 1px 2px rgba(0,0,0,0.05)">Small</option>
                  <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                  <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
                  <option value="0 20px 25px rgba(0,0,0,0.15)">Extra Large</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2">
        <Button className="w-full bg-valasys-orange hover:bg-valasys-orange/90 text-white rounded-lg">
          Apply Styles
        </Button>
        <Button variant="outline" className="w-full rounded-lg">
          Reset
        </Button>
      </div>
    </div>
  );
};
