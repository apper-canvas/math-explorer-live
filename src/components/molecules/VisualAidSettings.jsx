import React from 'react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ColorPicker from '@/components/atoms/ColorPicker';
import { useSettings } from '@/contexts/SettingsContext';

const VisualAidSettings = () => {
  const { settings, updateSetting, saving } = useSettings();

  if (!settings) return null;

  const arrayTypes = [
    { id: 'grid', label: 'Grid', description: 'Display as grid pattern' },
    { id: 'bars', label: 'Bar Chart', description: 'Display as bar graphs' },
    { id: 'circles', label: 'Circles', description: 'Display as circular arrays' }
  ];

  const handleArrayTypeChange = (type) => {
    updateSetting('visualAids.arrayType', type);
  };

  const handleNumberLineColorChange = (color) => {
    updateSetting('visualAids.numberLineStyle.color', color);
  };

  const handleNumberLineThicknessChange = (thickness) => {
    updateSetting('visualAids.numberLineStyle.thickness', thickness);
  };

  const handleTickFrequencyChange = (frequency) => {
    updateSetting('visualAids.numberLineStyle.tickFrequency', frequency);
  };

  const handleGridColorChange = (type, color) => {
    updateSetting(`visualAids.numberGridColors.${type}`, color);
  };

  return (
    <div className="space-y-6">
      {/* Array Types */}
      <div>
        <Text type="h3" className="text-lg font-semibold text-surface-800 mb-4">
          Array Display Type
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {arrayTypes.map((type) => (
            <div key={type.id} className="relative">
              <Button
                onClick={() => handleArrayTypeChange(type.id)}
                disabled={saving}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                  settings.visualAids.arrayType === type.id
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-surface-300 hover:border-surface-400 bg-white'
                }`}
              >
                <div className="text-center">
                  <Text type="span" className="font-medium text-surface-800 block mb-1">
                    {type.label}
                  </Text>
                  <Text type="span" className="text-sm text-surface-600">
                    {type.description}
                  </Text>
                </div>
              </Button>
              
              {/* Preview */}
              <div className="mt-2 h-12 bg-surface-50 rounded-lg flex items-center justify-center">
                {type.id === 'grid' && (
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-primary rounded-sm" />
                    ))}
                  </div>
                )}
                {type.id === 'bars' && (
                  <div className="flex items-end space-x-1">
                    {[4, 6, 3, 5].map((height, i) => (
                      <div 
                        key={i} 
                        className="w-2 bg-primary rounded-t-sm" 
                        style={{ height: `${height * 2}px` }}
                      />
                    ))}
                  </div>
                )}
                {type.id === 'circles' && (
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-primary rounded-full" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Number Line Style */}
      <div>
        <Text type="h3" className="text-lg font-semibold text-surface-800 mb-4">
          Number Line Style
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorPicker
            label="Line Color"
            value={settings.visualAids.numberLineStyle.color}
            onChange={handleNumberLineColorChange}
          />
          
          <div>
            <Text type="label" className="text-sm font-medium text-surface-700 mb-2 block">
              Line Thickness
            </Text>
            <select
              value={settings.visualAids.numberLineStyle.thickness}
              onChange={(e) => handleNumberLineThicknessChange(Number(e.target.value))}
              disabled={saving}
              className="w-full p-3 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value={1}>Thin (1px)</option>
              <option value={2}>Medium (2px)</option>
              <option value={3}>Thick (3px)</option>
              <option value={4}>Extra Thick (4px)</option>
            </select>
          </div>
          
          <div>
            <Text type="label" className="text-sm font-medium text-surface-700 mb-2 block">
              Tick Frequency
            </Text>
            <select
              value={settings.visualAids.numberLineStyle.tickFrequency}
              onChange={(e) => handleTickFrequencyChange(Number(e.target.value))}
              disabled={saving}
              className="w-full p-3 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value={1}>Every Number</option>
              <option value={2}>Every 2 Numbers</option>
              <option value={5}>Every 5 Numbers</option>
              <option value={10}>Every 10 Numbers</option>
            </select>
          </div>
        </div>
        
        {/* Number Line Preview */}
        <div className="mt-4 p-4 bg-surface-50 rounded-lg">
          <Text type="span" className="text-sm text-surface-600 mb-2 block">Preview:</Text>
          <div className="relative h-8 flex items-center">
            <div 
              className="h-full w-48 relative"
              style={{ 
                backgroundColor: settings.visualAids.numberLineStyle.color,
                height: `${settings.visualAids.numberLineStyle.thickness}px`
              }}
            >
              {[...Array(11)].map((_, i) => {
                if (i % settings.visualAids.numberLineStyle.tickFrequency === 0) {
                  return (
                    <div
                      key={i}
                      className="absolute w-0.5 h-4 bg-surface-800"
                      style={{ 
                        left: `${(i / 10) * 100}%`,
                        top: `-6px`
                      }}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Number Grid Colors */}
      <div>
        <Text type="h3" className="text-lg font-semibold text-surface-800 mb-4">
          Number Grid Colors
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorPicker
            label="Positive Numbers"
            value={settings.visualAids.numberGridColors.positive}
            onChange={(color) => handleGridColorChange('positive', color)}
          />
          <ColorPicker
            label="Negative Numbers"
            value={settings.visualAids.numberGridColors.negative}
            onChange={(color) => handleGridColorChange('negative', color)}
          />
          <ColorPicker
            label="Zero"
            value={settings.visualAids.numberGridColors.zero}
            onChange={(color) => handleGridColorChange('zero', color)}
          />
        </div>
        
        {/* Grid Preview */}
        <div className="mt-4 p-4 bg-surface-50 rounded-lg">
          <Text type="span" className="text-sm text-surface-600 mb-2 block">Preview:</Text>
          <div className="grid grid-cols-5 gap-2 w-fit">
            {[-2, -1, 0, 1, 2].map((num) => (
              <div
                key={num}
                className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-medium"
                style={{
                  backgroundColor: num > 0 
                    ? settings.visualAids.numberGridColors.positive
                    : num < 0 
                      ? settings.visualAids.numberGridColors.negative 
                      : settings.visualAids.numberGridColors.zero
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualAidSettings;