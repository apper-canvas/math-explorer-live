import React, { useState } from 'react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import VisualAidSettings from '@/components/molecules/VisualAidSettings';
import AudioSettings from '@/components/molecules/AudioSettings';
import { useSettings } from '@/contexts/SettingsContext';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { settings, resetSettings, saving, loading } = useSettings();
  const [activeTab, setActiveTab] = useState('visual');
  const [resetting, setResetting] = useState(false);

  const tabs = [
    {
      id: 'visual',
      label: 'Visual Aids',
      icon: 'Eye',
      description: 'Customize how math problems are displayed visually'
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: 'Volume2',
      description: 'Control audio narration and sound preferences'
    }
  ];

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
      try {
        setResetting(true);
        await resetSettings();
      } catch (error) {
        console.error('Reset failed:', error);
      } finally {
        setResetting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <Text type="p" className="text-surface-600">Loading settings...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary bg-opacity-10 rounded-xl">
              <ApperIcon name="Settings" size={24} className="text-primary" />
            </div>
            <div>
              <Text type="h1" className="text-3xl font-display text-surface-800">
                Settings
              </Text>
              <Text type="p" className="text-surface-600 mt-1">
                Customize your learning experience
              </Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6 sticky top-8">
              <Text type="h3" className="font-semibold text-surface-800 mb-4">
                Categories
              </Text>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-surface-700 hover:bg-surface-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name={tab.icon} size={20} />
                      <div>
                        <Text type="span" className="font-medium block">
                          {tab.label}
                        </Text>
                        <Text 
                          type="span" 
                          className={`text-xs ${
                            activeTab === tab.id ? 'text-blue-100' : 'text-surface-500'
                          }`}
                        >
                          {tab.description}
                        </Text>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Reset Button */}
              <div className="mt-8 pt-6 border-t border-surface-200">
                <Button
                  onClick={handleReset}
                  disabled={resetting || saving}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name="RotateCcw" size={16} />
                  <Text type="span" className="text-sm font-medium">
                    {resetting ? 'Resetting...' : 'Reset All'}
                  </Text>
                </Button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-8">
              {/* Tab Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <ApperIcon 
                    name={tabs.find(t => t.id === activeTab)?.icon} 
                    size={24} 
                    className="text-primary" 
                  />
                  <Text type="h2" className="text-2xl font-semibold text-surface-800">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </Text>
                </div>
                <Text type="p" className="text-surface-600">
                  {tabs.find(t => t.id === activeTab)?.description}
                </Text>
              </div>

              {/* Settings Content */}
              <div className="relative">
                {(saving || resetting) && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
                    <div className="text-center">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <Text type="span" className="text-sm text-surface-600">
                        {resetting ? 'Resetting settings...' : 'Saving changes...'}
                      </Text>
                    </div>
                  </div>
                )}

                {activeTab === 'visual' && <VisualAidSettings />}
                {activeTab === 'audio' && <AudioSettings />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;