import React, { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <label className={`toggle ${checked ? 'checked' : ''}`}>
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
      />
      <span className="toggle-switch"></span>
    </label>
  );
};

export default ToggleSwitch;
