import React, { useState } from "react";
import { Dropdown } from "./index";

const DropdownExample: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string | number>("");
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>([]);
  const [searchableValue, setSearchableValue] = useState<string | number>("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true },
    { value: "option4", label: "Option 4" },
    {
      value: "option5",
      label: "Very Long Option Name That Should Be Truncated",
    },
  ];

  const iconOptions = [
    {
      value: "user",
      label: "User",
      icon: <span>👤</span>,
    },
    {
      value: "settings",
      label: "Settings",
      icon: <span>⚙️</span>,
    },
    {
      value: "help",
      label: "Help",
      icon: <span>❓</span>,
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Dropdown Examples</h1>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Basic Dropdown */}
        <div>
          <h3>Basic Dropdown</h3>
          <Dropdown
            options={options}
            value={singleValue}
            onChange={(value) => setSingleValue(value as string)}
            placeholder="Select an option..."
            label="Basic Selection"
            helperText="Choose one option from the list"
          />
          <p>Selected: {singleValue}</p>
        </div>

        {/* Multiple Selection */}
        <div>
          <h3>Multiple Selection</h3>
          <Dropdown
            options={options}
            value={multipleValues as any}
            onChange={(value) =>
              setMultipleValues(value as (string | number)[])
            }
            placeholder="Select multiple options..."
            label="Multiple Selection"
            multiple
            clearable
            size="large"
          />
          <p>Selected: {JSON.stringify(multipleValues)}</p>
        </div>

        {/* Searchable Dropdown */}
        <div>
          <h3>Searchable Dropdown</h3>
          <Dropdown
            options={options}
            value={searchableValue}
            onChange={(value) => setSearchableValue(value as string)}
            placeholder="Search and select..."
            label="Searchable Dropdown"
            searchable
            clearable
            variant="outlined"
          />
          <p>Selected: {searchableValue}</p>
        </div>

        {/* With Icons */}
        <div>
          <h3>Dropdown with Icons</h3>
          <Dropdown
            options={iconOptions}
            placeholder="Select with icon..."
            label="Icon Dropdown"
            size="small"
            variant="filled"
          />
        </div>

        {/* Error State */}
        <div>
          <h3>Error State</h3>
          <Dropdown
            options={options}
            placeholder="This has an error..."
            label="Required Field"
            required
            error="This field is required"
          />
        </div>

        {/* Disabled State */}
        <div>
          <h3>Disabled State</h3>
          <Dropdown
            options={options}
            placeholder="This is disabled..."
            label="Disabled Dropdown"
            disabled
            value="option1"
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownExample;
