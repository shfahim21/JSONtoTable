/**
 * Table Generator Module
 * Handles conversion of JSON to HTML tables
 */

// Shared state for current JSON data
let currentJsonData = null;

/**
 * Format primitive values with appropriate styling
 * @param {any} value - The primitive value to format
 * @returns {string} HTML string with formatted value
 */
function formatPrimitiveValue(value) {
    if (value === null) {
        return '<span class="primitive-value null-value">null</span>';
    }
    if (typeof value === 'string') {
        return `<span class="primitive-value string-value">${value}</span>`;
    }
    if (typeof value === 'number') {
        return `<span class="primitive-value number-value">${value}</span>`;
    }
    if (typeof value === 'boolean') {
        return `<span class="primitive-value boolean-value">${value}</span>`;
    }
    return `<span class="primitive-value">${value}</span>`;
}

/**
 * Create a nested table for object values
 * @param {object} obj - The object to display as a table
 * @returns {string} HTML string with nested table
 */
function createNestedTable(obj) {
    let html = '<table class="nested-table">';
    
    for (const [key, value] of Object.entries(obj)) {
        html += '<tr>';
        html += `<td class="nested-key">${key}</td>`;
        html += '<td class="nested-value">';
        
        if (value === null || typeof value !== 'object') {
            html += formatPrimitiveValue(value);
        } else if (Array.isArray(value)) {
            html += createArrayDisplay(value);
        } else {
            html += createNestedTable(value);
        }
        
        html += '</td>';
        html += '</tr>';
    }
    
    html += '</table>';
    return html;
}

/**
 * Create display for array values
 * @param {array} arr - The array to display
 * @returns {string} HTML string with array display
 */
function createArrayDisplay(arr) {
    if (arr.length === 0) {
        return '<span class="primitive-value null-value">empty array</span>';
    }
    
    const allPrimitives = arr.every(item => 
        item === null || typeof item !== 'object'
    );
    
    if (allPrimitives) {
        let html = '<div class="array-container">';
        arr.forEach(item => {
            html += `<div class="array-item">${formatPrimitiveValue(item)}</div>`;
        });
        html += '</div>';
        return html;
    }
    
    let html = '<div class="array-container">';
    arr.forEach((item) => {
        html += '<div class="array-item">';
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                html += createArrayDisplay(item);
            } else {
                html += createNestedTable(item);
            }
        } else {
            html += formatPrimitiveValue(item);
        }
        html += '</div>';
    });
    html += '</div>';
    return html;
}

/**
 * Create the main table for the top level object
 * @param {object} data - The JSON data object
 * @returns {string} HTML string with main table
 */
function createMainTable(data) {
    let html = '<table class="main-table">';
    
    for (const [key, value] of Object.entries(data)) {
        html += '<tr>';
        html += `<td class="key-column">${key}</td>`;
        html += '<td class="value-column">';
        
        if (value === null || typeof value !== 'object') {
            html += formatPrimitiveValue(value);
        } else if (Array.isArray(value)) {
            html += createArrayDisplay(value);
        } else {
            html += createNestedTable(value);
        }
        
        html += '</td>';
        html += '</tr>';
    }
    
    html += '</table>';
    return html;
}

/**
 * Create simplified table for PDF export
 * @param {any} data - The JSON data to convert to a table
 * @returns {string} HTML string with simplified table for PDF export
 */
function createMinimalPDFTable(data) {
    if (data === null || data === undefined) {
        return '<div>No data</div>';
    }
    
    // For primitive values
    if (typeof data !== 'object') {
        return `<table style="width:100%; border-collapse:collapse; border:1px solid #000;">
            <tr>
                <td style="border:1px solid #000; padding:8px; width:30%;">Value</td>
                <td style="border:1px solid #000; padding:8px;">${data}</td>
            </tr>
        </table>`;
    }
    
    // For arrays
    if (Array.isArray(data)) {
        let html = '<table style="width:100%; border-collapse:collapse; border:1px solid #000;">';
        html += '<tr><th style="border:1px solid #000; padding:8px;">Index</th><th style="border:1px solid #000; padding:8px;">Value</th></tr>';
        
        data.forEach((item, index) => {
            html += '<tr>';
            html += `<td style="border:1px solid #000; padding:8px;">${index}</td>`;
            html += '<td style="border:1px solid #000; padding:8px;">';
            
            if (item === null) {
                html += 'null';
            } else if (typeof item !== 'object') {
                html += item;
            } else {
                html += createMinimalPDFTable(item);
            }
            
            html += '</td>';
            html += '</tr>';
        });
        
        html += '</table>';
        return html;
    }
    
    // For objects
    let html = '<table style="width:100%; border-collapse:collapse; border:1px solid #000;">';
    
    for (const [key, value] of Object.entries(data)) {
        html += '<tr>';
        html += `<td style="border:1px solid #000; padding:8px; width:30%; font-weight:bold;">${key}</td>`;
        html += '<td style="border:1px solid #000; padding:8px;">';
        
        if (value === null) {
            html += 'null';
        } else if (typeof value !== 'object') {
            html += value;
        } else {
            html += createMinimalPDFTable(value);
        }
        
        html += '</td>';
        html += '</tr>';
    }
    
    html += '</table>';
    return html;
}
