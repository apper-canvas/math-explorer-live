// Settings service for managing user preferences
class SettingsService {
  constructor() {
    this.storageKey = 'mathExplorerSettings';
    this.defaultSettings = {
      visualAids: {
        arrayType: 'grid', // 'grid', 'bars', 'circles'
        numberLineStyle: {
          color: '#5B4CDB',
          thickness: 2,
          tickFrequency: 1
        },
        numberGridColors: {
          positive: '#51CF66',
          negative: '#FF6B6B',
          zero: '#94a3b8'
        }
      },
      audioNarration: {
        problems: true,
        explanations: true
      }
    };
  }

  // Get all settings
  async getSettings() {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all properties exist
        return this.mergeWithDefaults(parsed);
      }
      return { ...this.defaultSettings };
    } catch (error) {
      console.error('Error loading settings:', error);
      return { ...this.defaultSettings };
    }
  }

  // Update settings
  async updateSettings(newSettings) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const merged = this.mergeWithDefaults(newSettings);
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return { ...merged };
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  // Reset to defaults
  async resetSettings() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      localStorage.removeItem(this.storageKey);
      return { ...this.defaultSettings };
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw new Error('Failed to reset settings');
    }
  }

  // Update specific setting
  async updateSetting(path, value) {
    const current = await this.getSettings();
    const updated = this.setNestedProperty(current, path, value);
    return await this.updateSettings(updated);
  }

  // Helper to merge settings with defaults
  mergeWithDefaults(settings) {
    return {
      visualAids: {
        ...this.defaultSettings.visualAids,
        ...settings.visualAids,
        numberLineStyle: {
          ...this.defaultSettings.visualAids.numberLineStyle,
          ...(settings.visualAids?.numberLineStyle || {})
        },
        numberGridColors: {
          ...this.defaultSettings.visualAids.numberGridColors,
          ...(settings.visualAids?.numberGridColors || {})
        }
      },
      audioNarration: {
        ...this.defaultSettings.audioNarration,
        ...(settings.audioNarration || {})
      }
    };
  }

  // Helper to set nested property
  setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    const result = JSON.parse(JSON.stringify(obj));
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return result;
  }
}

export default new SettingsService();