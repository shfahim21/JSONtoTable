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

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

/**
 * Initialize theme from localStorage or default to dark
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Initialize resize functionality for the input section
 */
function initializeResize() {
    const resizeHandle = document.getElementById('resizeHandle');
    const inputSection = document.querySelector('.input-section');
    const mainContent = document.querySelector('.main-content');
    
    if (!resizeHandle || !inputSection || !mainContent) return;
    
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(getComputedStyle(inputSection).width, 10);
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        
        e.preventDefault();
    });
    
    function handleResize(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = startWidth + deltaX;
        const containerWidth = mainContent.clientWidth;
        const minWidth = 300;
        const maxWidth = containerWidth * 0.6;
        
        const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        inputSection.style.flexBasis = clampedWidth + 'px';
    }
    
    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
    
    // Touch support for mobile
    resizeHandle.addEventListener('touchstart', (e) => {
        isResizing = true;
        startX = e.touches[0].clientX;
        startWidth = parseInt(getComputedStyle(inputSection).width, 10);
        
        document.addEventListener('touchmove', handleTouchResize);
        document.addEventListener('touchend', stopTouchResize);
        
        e.preventDefault();
    });
    
    function handleTouchResize(e) {
        if (!isResizing) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const newWidth = startWidth + deltaX;
        const containerWidth = mainContent.clientWidth;
        const minWidth = 300;
        const maxWidth = containerWidth * 0.6;
        
        const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        inputSection.style.flexBasis = clampedWidth + 'px';
    }
    
    function stopTouchResize() {
        isResizing = false;
        document.removeEventListener('touchmove', handleTouchResize);
        document.removeEventListener('touchend', stopTouchResize);
    }
}

// Initialize the application when the page loads
window.onload = function() {
    initializeTheme();
    initializeResize();
    generateTable();
};
