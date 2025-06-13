/**
 * Main Application Module
 * Handles the main application logic and initialization
 */

/**
 * Generate HTML table from JSON input and display on page
 */
function generateTable() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('output');
    const pdfBtn = document.getElementById('pdfBtn');
    
    if (!input) {
        output.innerHTML = '<div class="error">Please enter JSON data</div>';
        pdfBtn.disabled = true;
        return;
    }
    
    try {
        const jsonData = JSON.parse(input);
        currentJsonData = jsonData;
        
        let html = '<div id="tableContent">';
        
        if (Array.isArray(jsonData)) {
            html += '<div class="value-column">' + createArrayDisplay(jsonData) + '</div>';
        } else if (typeof jsonData === 'object' && jsonData !== null) {
            html += createMainTable(jsonData);
        } else {
            html += `<table class="main-table">
                <tr>
                    <td class="key-column">Value</td>
                    <td class="value-column">${formatPrimitiveValue(jsonData)}</td>
                </tr>
            </table>`;
        }
        
        html += '</div>';
        output.innerHTML = html;
        
        // Enable PDF button
        pdfBtn.disabled = false;
        
    } catch (error) {
        output.innerHTML = `<div class="error">Invalid JSON: ${error.message}</div>`;
        pdfBtn.disabled = true;
    }
}

// Initialize the application when the page loads
window.onload = function() {
    generateTable();
};
