import React, { createContext, useContext, useState, useEffect } from 'react';
import settingsService from '@/services/api/settingsService';
import { toast } from 'react-toastify';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const userSettings = await settingsService.getSettings();
      setSettings(userSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      setSaving(true);
      const updated = await settingsService.updateSettings(newSettings);
      setSettings(updated);
      toast.success('Settings saved successfully');
      return updated;
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Failed to save settings');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = async (path, value) => {
    try {
      setSaving(true);
      const updated = await settingsService.updateSetting(path, value);
      setSettings(updated);
      return updated;
    } catch (error) {
      console.error('Failed to update setting:', error);
      toast.error('Failed to save setting');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = async () => {
    try {
      setSaving(true);
      const defaults = await settingsService.resetSettings();
      setSettings(defaults);
      toast.success('Settings reset to defaults');
      return defaults;
    } catch (error) {
      console.error('Failed to reset settings:', error);
      toast.error('Failed to reset settings');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const value = {
    settings,
    loading,
    saving,
    updateSettings,
    updateSetting,
    resetSettings,
    loadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};