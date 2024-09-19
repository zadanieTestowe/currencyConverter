import React from "react";

export const CurrencyDropdown = ({ value, options, onChange, placeholder }) => (
  <select
    defaultValue={value}
    onChange={(e) => onChange(e.target.value)}
    className="converter__dropdown"
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.short_code} value={opt.short_code}>
        {opt.short_code}
      </option>
    ))}
  </select>
);
