import React, { useState, useRef, useEffect } from "react";
import { DropdownProps, DropdownOption } from "./Dropdown.types";
import "./index.css";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  placeholder = "Select an option...",
  disabled = false,
  required = false,
  error,
  label,
  helperText,
  className = "",
  size = "medium",
  variant = "default",
  searchable = false,
  clearable = false,
  multiple = false,
  maxHeight = 200,
  onChange,
  onFocus,
  onBlur,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    () => {
      if (multiple) {
        return Array.isArray(value) ? value : [];
      }
      return value !== undefined
        ? [value]
        : defaultValue !== undefined
        ? [defaultValue]
        : [];
    }
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  const selectedOption = multiple
    ? null
    : options.find((opt) => opt.value === selectedValues[0]);
  const displayValue = multiple
    ? selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : placeholder
    : selectedOption?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      onFocus?.();
    } else {
      onBlur?.();
    }
  };

  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled) return;

    let newSelectedValues: (string | number)[];

    if (multiple) {
      const isSelected = selectedValues.includes(option.value);
      newSelectedValues = isSelected
        ? selectedValues.filter((val) => val !== option.value)
        : [...selectedValues, option.value];
    } else {
      newSelectedValues = [option.value];
      setIsOpen(false);
      setSearchQuery("");
    }

    setSelectedValues(newSelectedValues);
    onChange?.(multiple ? newSelectedValues : newSelectedValues[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(multiple ? [] : "");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className={`dropdown-container ${className}`}>
      {label && (
        <label className={`dropdown-label ${required ? "required" : ""}`}>
          {label}
        </label>
      )}

      <div
        ref={dropdownRef}
        className={`dropdown dropdown-${size} dropdown-${variant} ${
          disabled ? "disabled" : ""
        } ${error ? "error" : ""} ${isOpen ? "open" : ""}`}
      >
        <div
          className="dropdown-trigger"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-required={required}
          aria-invalid={!!error}
        >
          <span
            className={`dropdown-value ${
              selectedValues.length === 0 ? "placeholder" : ""
            }`}
          >
            {displayValue}
          </span>

          <div className="dropdown-actions">
            {clearable && selectedValues.length > 0 && !disabled && (
              <button
                className="dropdown-clear"
                onClick={handleClear}
                type="button"
                aria-label="Clear selection"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-menu" style={{ maxHeight }}>
            {searchable && (
              <div className="dropdown-search">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search options..."
                  className="dropdown-search-input"
                />
              </div>
            )}

            <div className="dropdown-options" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="dropdown-no-options">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.label}
                    className={`dropdown-option ${
                      selectedValues.includes(option.value) ? "selected" : ""
                    } ${option.disabled ? "disabled" : ""}`}
                    onClick={() => handleOptionSelect(option)}
                    role="option"
                    aria-selected={selectedValues.includes(option.value)}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={() => {}}
                        className="dropdown-checkbox"
                      />
                    )}
                    {option.icon && (
                      <span className="dropdown-option-icon">
                        {option.icon}
                      </span>
                    )}
                    <span className="dropdown-option-label">
                      {option.label}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div className={`dropdown-helper ${error ? "error" : ""}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
