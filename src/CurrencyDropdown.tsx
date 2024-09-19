import React from "react";

type TCurrencyOption = {
  short_code: string;
};

type TCurrencyDropdown = {
  value: string;
  options: TCurrencyOption[];
  onChange: (selectedCurrency: string) => void;
  placeholder: string;
};

export const CurrencyDropdown = ({
  value,
  options,
  onChange,
  placeholder,
}: TCurrencyDropdown) => (
  <select
    defaultValue={value}
    onChange={(e) => onChange(e.target.value)}
    className="converter__dropdown"
  >
    <option value="">{placeholder}</option>
    {options.map((opt: TCurrencyOption) => (
      <option key={opt.short_code} value={opt.short_code}>
        {opt.short_code}
      </option>
    ))}
  </select>
);
