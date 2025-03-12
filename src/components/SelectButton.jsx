import React, { useState } from 'react';

const Select = ({ 
  id = "countries",
  label = "Select an option",
  defaultOption = "Choose a country",
  options = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" }
  ],
  onChange = () => {},
  className = "",
  size = "md" // 'sm', 'md', 'lg'
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onChange(e.target.value);
  };
  
  // Label classes
  const labelClass = "block mb-2 text-sm font-medium text-gray-900";
  
  // Size classes
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base"
  };
  
  // Width classes - responsive
  const widthClass = "w-full ";
  
  // Select classes
  const selectClass = `bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
    focus:ring-blue-500 focus:border-blue-500 block p-2.5 
    ${sizeClasses[size] || sizeClasses.md} 
    ${widthClass} 
    ${className}`;
  
  return (
    <div className="w-full max-w-sm mx-auto">
      {label && <label htmlFor={id} className={labelClass}>{label}</label>}
      <select 
        id={id} 
        className={selectClass}
        value={selectedValue}
        onChange={handleChange}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;