import React from 'react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { useSettings } from '@/contexts/SettingsContext';

const AudioSettings = () => {
  const { settings, updateSetting, saving } = useSettings();

  if (!settings) return null;

  const handleAudioToggle = (type) => {
    const currentValue = settings.audioNarration[type];
    updateSetting(`audioNarration.${type}`, !currentValue);
  };

  const audioOptions = [
    {
      key: 'problems',
      label: 'Problem Narration',
      description: 'Read math problems aloud when they appear',
      icon: 'Volume2'
    },
    {
      key: 'explanations',
      label: 'Explanation Narration',
      description: 'Read solution explanations and feedback aloud',
      icon: 'MessageSquare'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Text type="h3" className="text-lg font-semibold text-surface-800 mb-2">
          Audio Narration
        </Text>
        <Text type="p" className="text-surface-600 mb-6">
          Control when the app reads content aloud to support different learning preferences.
        </Text>
      </div>

      <div className="space-y-4">
        {audioOptions.map((option) => (
          <div 
            key={option.key}
            className="bg-white border border-surface-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-2 bg-surface-100 rounded-lg">
                  <ApperIcon name={option.icon} size={20} className="text-surface-600" />
                </div>
                <div className="flex-1">
                  <Text type="h4" className="font-medium text-surface-800 mb-1">
                    {option.label}
                  </Text>
                  <Text type="p" className="text-surface-600 text-sm">
                    {option.description}
                  </Text>
                </div>
              </div>
              
              <Button
                onClick={() => handleAudioToggle(option.key)}
                disabled={saving}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  settings.audioNarration[option.key]
                    ? 'bg-success text-white hover:bg-green-600'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon 
                  name={settings.audioNarration[option.key] ? "Volume2" : "VolumeX"} 
                  size={16} 
                />
                <Text type="span" className="text-sm font-medium">
                  {settings.audioNarration[option.key] ? 'On' : 'Off'}
                </Text>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Test Section */}
      <div className="bg-surface-50 border border-surface-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ApperIcon name="TestTube" size={20} className="text-primary" />
          <Text type="h4" className="font-medium text-surface-800">
            Test Audio
          </Text>
        </div>
        
        <Text type="p" className="text-surface-600 text-sm mb-4">
          Test your audio settings with a sample narration to ensure everything works correctly.
        </Text>
        
        <Button
          onClick={() => {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(
                "This is a test of the audio narration feature. If you can hear this, your audio settings are working correctly."
              );
              utterance.rate = 0.8;
              utterance.pitch = 1;
              utterance.volume = 0.8;
              speechSynthesis.speak(utterance);
            } else {
              alert('Speech synthesis is not supported in your browser.');
            }
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Play" size={16} />
          <Text type="span" className="text-sm font-medium">
            Test Audio
          </Text>
        </Button>
      </div>

      {/* Browser Support Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <Text type="h5" className="font-medium text-blue-800 mb-1">
              Browser Compatibility
            </Text>
            <Text type="p" className="text-blue-700 text-sm">
              Audio narration requires a modern browser with speech synthesis support. 
              Most current versions of Chrome, Firefox, Safari, and Edge are supported.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;