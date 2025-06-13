# JsonToTable - Technical Documentation

## Project Overview
JsonToTable is a minimalist web application that converts JSON data into clean, readable HTML tables with the ability to export as PDF. The application features a dark/light theme toggle, resizable interface, and responsive design for both mobile and desktop usage.

## Core Functionalities

### 1. JSON Parsing & Validation
- Parses user input as JSON with try/catch error handling
- Validates JSON structure before processing
- Displays human-readable error messages for invalid JSON
- Supports all JSON data types: objects, arrays, strings, numbers, booleans, and null

### 2. Table Generation
- Recursively processes JSON structure to generate nested HTML tables
- Differentiates between objects, arrays, and primitive values
- Handles nested objects with subtables
- Formats arrays with left-border styling
- Type-specific styling for different data types (numbers, booleans, null, strings)
- Clean border system with hover effects

### 3. PDF Export Functionality
- Converts HTML tables to PDF using html2canvas and jsPDF
- Customizable export settings:
  - Page size (A4, Letter, Legal, A3)
  - Orientation (Portrait, Landscape)
  - File name customization
  - Quality settings (High, Medium, Low)
- Adds header with title and date to PDF exports
- Optimized for print with forced light theme

### 4. Theme System
- Dark/light theme toggle with persistent user preference
- Complete CSS variable-based theming system
- Smooth transitions between themes
- Theme-specific styling for all UI elements
- Print-optimized light theme for PDF exports

### 5. Responsive UI
- Adapts to mobile and desktop viewports
- Single column layout on mobile, two-column layout on desktop
- Touch-friendly buttons and controls (minimum 44px touch targets)
- Font size adjustments for different screen sizes

### 6. Resizable Interface
- Horizontally resizable panels using mouse/touch drag
- Minimum and maximum width constraints
- Visual feedback during resize operations
- Resize handle with hover effects
- Mobile-responsive (hidden on smaller screens)

## Technical Implementation

### Core Components:

1. **HTML Structure (index.html)**
   - Semantic HTML5 markup
   - Organized container structure
   - Input section with textarea and controls
   - Output section for rendered tables
   - PDF settings panel with export options
   - Theme toggle button

2. **CSS Styling (styles.css)**
   - CSS variables for theming
   - Mobile-first responsive design
   - Minimalist aesthetic with essential styling only
   - Three core spacing units (8px, 16px, 32px)
   - Three typography sizes (32px, 16px, 14px)
   - Clean table borders with hover states
   - Print media queries for PDF export

3. **JavaScript Modules**
   - **app.js**: Core application logic, event handlers, theme toggle, resize functionality
   - **tableGenerator.js**: JSON parsing and HTML table generation
   - **pdfExporter.js**: PDF generation using html2canvas and jsPDF

### JSON to Table Conversion Logic:
1. User inputs JSON in the textarea
2. System parses JSON using `JSON.parse()`
3. Recursive function processes each JSON level:
   - Objects → HTML tables with key-value rows
   - Arrays → Vertically stacked items with left border
   - Nested objects → Subtables with proper hierarchy
   - Primitive values → Styled based on data type
4. Generated HTML injected into output container

### PDF Generation Process:
1. User configures export settings
2. System creates hidden container with optimized table styling
3. html2canvas converts the table to canvas
4. jsPDF creates PDF document based on canvas
5. Document saved with user-specified filename

### Theme System Implementation:
1. CSS variables define color scheme for both themes
2. Theme preference stored in localStorage
3. `data-theme` attribute on HTML controls active theme
4. Toggle button switches between themes
5. System respects user's preferred color scheme on first visit

### Resize Implementation:
1. Resize handle positioned between input and output sections
2. Mouse/touch down event initializes resize operation
3. Mouse/touch move calculates new width based on pointer position
4. Width constraints prevent breaking layout
5. Mouse/touch up finalizes resize operation

## Browser Compatibility
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- CSS variables with fallbacks for older browsers
- Touch events for mobile devices
- Responsive design for all screen sizes

## Performance Optimizations
- Minimal DOM operations during table generation
- Throttled resize events for smooth performance
- Optimized PDF rendering with quality settings
- CSS transitions only on necessary properties
- Proper cleanup of event listeners

## Accessibility Features
- Semantic HTML structure
- Keyboard navigable interface
- Proper color contrast in both themes
- Minimum touch target sizes (44px)
- Screen reader friendly markup
- Alt text for all images

## Future Enhancement Possibilities
- JSON schema validation
- Table filtering and sorting
- CSV export option
- JSON path navigation
- Collapsible nested objects
- Syntax highlighting in JSON input
- Custom theme editor
- Table of contents for complex JSON