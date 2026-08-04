import React from 'react';

const SettingsSection = ({ title, settings, onChange }) => {
  return (
    <section className="settings-section">
      <h2>{title}</h2>
      <div className="settings-fields">
        {settings.map((setting) => (
          <div key={setting.key} className="setting-field">
            <label htmlFor={setting.key}>{setting.label}</label>
            {setting.type === 'checkbox' ? (
              <input
                type="checkbox"
                id={setting.key}
                checked={setting.value}
                onChange={(e) => onChange(setting.key, e.target.checked)}
              />
            ) : (
              <input
                type={setting.type}
                id={setting.key}
                value={setting.value}
                onChange={(e) => onChange(setting.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SettingsSection;
