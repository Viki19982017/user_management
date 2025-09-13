import React, { useState } from 'react';
import { Label } from './index';
import { generateDistinctColors, getColorFromPalette } from './Label.utils';

const LabelExample: React.FC = () => {
  const [tags, setTags] = useState([
    'React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python'
  ]);
  
  const [selectedTags, setSelectedTags] = useState<string[]>(['React', 'TypeScript']);
  
  // Generate distinct colors for all tags
  const tagColors = generateDistinctColors(tags);

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleToggleSelection = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const UserIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M10 10.5v-1A2.5 2.5 0 0 0 7.5 7h-3A2.5 2.5 0 0 0 2 9.5v1M6 5.5A2 2 0 1 0 6 1.5a2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const StarIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1l1.545 3.13L11 4.635 8.5 7.07l.59 3.44L6 8.885 2.91 10.51l.59-3.44L1 4.635l3.455-.505L6 1Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>Label Examples</h1>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Basic Labels with Variants */}
        <div>
          <h3>Basic Label Variants</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Label variant="default">Default</Label>
            <Label variant="primary">Primary</Label>
            <Label variant="secondary">Secondary</Label>
            <Label variant="success">Success</Label>
            <Label variant="warning">Warning</Label>
            <Label variant="error">Error</Label>
            <Label variant="info">Info</Label>
          </div>
        </div>

        {/* Different Sizes */}
        <div>
          <h3>Label Sizes</h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Label size="small" variant="primary">Small</Label>
            <Label size="medium" variant="primary">Medium</Label>
            <Label size="large" variant="primary">Large</Label>
          </div>
        </div>

        {/* Removable Labels */}
        <div>
          <h3>Removable Tags</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <Label
                key={tag}
                removable
                onRemove={() => handleRemoveTag(tag)}
                backgroundColor={tagColors[tag].background}
                color={tagColors[tag].text}
              >
                {tag}
              </Label>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Click the × to remove tags. Colors are automatically generated based on tag names.
          </p>
        </div>

        {/* Clickable Labels */}
        <div>
          <h3>Clickable Selection Tags</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <Label
                key={tag}
                variant={selectedTags.includes(tag) ? 'primary' : 'default'}
                onClick={() => handleToggleSelection(tag)}
                removable
                onRemove={() => handleRemoveTag(tag)}
              >
                {tag}
              </Label>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Click to select/deselect. Selected: {selectedTags.join(', ')}
          </p>
        </div>

        {/* Labels with Icons */}
        <div>
          <h3>Labels with Icons</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Label variant="success" icon={<UserIcon />}>
              Admin User
            </Label>
            <Label variant="warning" icon={<StarIcon />} removable onRemove={() => {}}>
              Featured
            </Label>
            <Label 
              variant="info" 
              icon={<span>🚀</span>}
              onClick={() => alert('Clicked!')}
            >
              New Feature
            </Label>
          </div>
        </div>

        {/* Custom Colors */}
        <div>
          <h3>Custom Colors</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Label backgroundColor="#ff6b6b" color="white">
              Custom Red
            </Label>
            <Label backgroundColor="#4ecdc4" color="white" removable onRemove={() => {}}>
              Custom Teal
            </Label>
            <Label backgroundColor="#45b7d1" color="white" icon={<span>💎</span>}>
              Custom Blue
            </Label>
          </div>
        </div>

        {/* Dynamic Color Generation */}
        <div>
          <h3>Dynamic Color Generation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'].map((fruit) => (
              <Label key={fruit} removable onRemove={() => {}}>
                {fruit}
              </Label>
            ))}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Colors are automatically generated based on the text content.
          </p>
        </div>

        {/* Palette Colors */}
        <div>
          <h3>Predefined Color Palette</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Design', 'Development', 'Marketing', 'Sales', 'Support', 'HR', 'Finance'].map((dept, index) => {
              const colors = getColorFromPalette(index);
              return (
                <Label
                  key={dept}
                  backgroundColor={colors.background}
                  color={colors.text}
                  removable
                  onRemove={() => {}}
                >
                  {dept}
                </Label>
              );
            })}
          </div>
        </div>

        {/* Disabled State */}
        <div>
          <h3>Disabled State</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Label variant="primary" disabled>
              Disabled
            </Label>
            <Label variant="success" disabled removable onRemove={() => {}}>
              Disabled Removable
            </Label>
            <Label variant="warning" disabled onClick={() => {}}>
              Disabled Clickable
            </Label>
          </div>
        </div>

        {/* Long Text Truncation */}
        <div>
          <h3>Text Truncation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '400px' }}>
            <Label variant="primary" removable onRemove={() => {}}>
              This is a very long label that should be truncated when it exceeds the container width
            </Label>
            <Label variant="secondary" size="small">
              Another long label for small size testing
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelExample;
