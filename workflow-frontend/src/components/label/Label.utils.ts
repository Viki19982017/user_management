import { LabelColorConfig, DynamicColorOptions } from './Label.types';

// Predefined color palette for consistent theming
export const LABEL_COLORS: Record<string, LabelColorConfig> = {
  default: {
    background: '#f3f4f6',
    text: '#374151',
    border: '#d1d5db'
  },
  primary: {
    background: '#dbeafe',
    text: '#1e40af',
    border: '#93c5fd'
  },
  secondary: {
    background: '#f1f5f9',
    text: '#475569',
    border: '#cbd5e1'
  },
  success: {
    background: '#dcfce7',
    text: '#166534',
    border: '#86efac'
  },
  warning: {
    background: '#fef3c7',
    text: '#92400e',
    border: '#fcd34d'
  },
  error: {
    background: '#fee2e2',
    text: '#dc2626',
    border: '#fca5a5'
  },
  info: {
    background: '#e0f2fe',
    text: '#0369a1',
    border: '#7dd3fc'
  }
};

// Generate a consistent color based on string hash
export const generateColorFromString = (
  str: string, 
  options: DynamicColorOptions = {}
): LabelColorConfig => {
  const { saturation = 70, lightness = 85, alpha = 1 } = options;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert hash to hue (0-360)
  const hue = Math.abs(hash) % 360;
  
  // Generate background color
  const backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  
  // Generate text color (darker version)
  const textLightness = Math.max(lightness - 50, 20);
  const textColor = `hsla(${hue}, ${Math.min(saturation + 10, 100)}%, ${textLightness}%, 1)`;
  
  // Generate border color (slightly darker than background)
  const borderLightness = Math.max(lightness - 15, 30);
  const borderColor = `hsla(${hue}, ${saturation}%, ${borderLightness}%, ${alpha})`;
  
  return {
    background: backgroundColor,
    text: textColor,
    border: borderColor
  };
};

// Generate multiple distinct colors for a list of items
export const generateDistinctColors = (
  items: string[], 
  options: DynamicColorOptions = {}
): Record<string, LabelColorConfig> => {
  const colors: Record<string, LabelColorConfig> = {};
  
  items.forEach((item, index) => {
    // Add index to ensure different colors even for similar strings
    const seedString = `${item}_${index}`;
    colors[item] = generateColorFromString(seedString, options);
  });
  
  return colors;
};

// Predefined color palette for quick selection
export const DYNAMIC_COLOR_PALETTE: LabelColorConfig[] = [
  { background: '#fef2f2', text: '#991b1b', border: '#fca5a5' }, // Red
  { background: '#fff7ed', text: '#9a3412', border: '#fed7aa' }, // Orange
  { background: '#fefce8', text: '#a16207', border: '#fde047' }, // Yellow
  { background: '#f0fdf4', text: '#166534', border: '#86efac' }, // Green
  { background: '#ecfdf5', text: '#065f46', border: '#6ee7b7' }, // Emerald
  { background: '#f0fdfa', text: '#134e4a', border: '#5eead4' }, // Teal
  { background: '#ecfeff', text: '#155e75', border: '#67e8f9' }, // Cyan
  { background: '#eff6ff', text: '#1e40af', border: '#93c5fd' }, // Blue
  { background: '#eef2ff', text: '#3730a3', border: '#a5b4fc' }, // Indigo
  { background: '#f5f3ff', text: '#5b21b6', border: '#c4b5fd' }, // Violet
  { background: '#fdf4ff', text: '#86198f', border: '#d8b4fe' }, // Purple
  { background: '#fdf2f8', text: '#be185d', border: '#f9a8d4' }, // Pink
];

// Get color from palette by index
export const getColorFromPalette = (index: number): LabelColorConfig => {
  return DYNAMIC_COLOR_PALETTE[index % DYNAMIC_COLOR_PALETTE.length];
};
