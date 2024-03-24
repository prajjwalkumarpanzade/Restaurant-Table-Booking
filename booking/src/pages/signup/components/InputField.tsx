import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  minLength?: number;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  type,
  name,
  placeholder,
  value,
  minLength,
  required,
  onChange,
}:InputFieldProps) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
