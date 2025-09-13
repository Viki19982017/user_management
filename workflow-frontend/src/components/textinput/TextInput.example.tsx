import React, { useState } from 'react';
import { TextInput } from './index';

const TextInputExample: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333a2.667 2.667 0 0 0-2.667 2.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>TextInput Examples</h1>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Basic Text Input */}
        <div>
          <h3>Basic Text Input</h3>
          <TextInput
            value={basicValue}
            onChange={(value) => setBasicValue(value)}
            placeholder="Enter some text..."
            label="Basic Input"
            helperText="This is a basic text input field"
            clearable
          />
          <p>Value: {basicValue}</p>
        </div>

        {/* Email Input with Icon */}
        <div>
          <h3>Email Input with Icon</h3>
          <TextInput
            type="email"
            value={emailValue}
            onChange={(value) => setEmailValue(value)}
            placeholder="Enter your email..."
            label="Email Address"
            leftIcon={<UserIcon />}
            required
            size="large"
            variant="outlined"
          />
          <p>Email: {emailValue}</p>
        </div>

        {/* Password Input */}
        <div>
          <h3>Password Input</h3>
          <TextInput
            type="password"
            value={passwordValue}
            onChange={(value) => setPasswordValue(value)}
            placeholder="Enter your password..."
            label="Password"
            required
            helperText="Password must be at least 8 characters"
            maxLength={50}
            showCharCount
          />
        </div>

        {/* Search Input */}
        <div>
          <h3>Search Input</h3>
          <TextInput
            type="search"
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            placeholder="Search..."
            leftIcon={<SearchIcon />}
            clearable
            size="small"
            variant="filled"
          />
          <p>Search: {searchValue}</p>
        </div>

        {/* Number Input */}
        <div>
          <h3>Number Input</h3>
          <TextInput
            type="number"
            value={numberValue}
            onChange={(value) => setNumberValue(value)}
            placeholder="Enter a number..."
            label="Age"
            helperText="Enter your age in years"
          />
          <p>Number: {numberValue}</p>
        </div>

        {/* Error State */}
        <div>
          <h3>Error State</h3>
          <TextInput
            placeholder="This has an error..."
            label="Required Field"
            required
            error="This field is required"
            value=""
            onChange={() => {}}
          />
        </div>

        {/* Disabled State */}
        <div>
          <h3>Disabled State</h3>
          <TextInput
            placeholder="This is disabled..."
            label="Disabled Input"
            disabled
            value="Cannot edit this"
            onChange={() => {}}
          />
        </div>

        {/* Read-only State */}
        <div>
          <h3>Read-only State</h3>
          <TextInput
            label="Read-only Input"
            readOnly
            value="This is read-only content"
            onChange={() => {}}
            helperText="This field cannot be edited"
          />
        </div>

        {/* With Character Count */}
        <div>
          <h3>With Character Count</h3>
          <TextInput
            placeholder="Type something..."
            label="Bio"
            maxLength={100}
            showCharCount
            helperText="Tell us about yourself"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInputExample;
