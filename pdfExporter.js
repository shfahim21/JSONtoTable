/**
 * PDF Exporter Module
 * Handles PDF generation from JSON tables
 */

/**
 * Generate and export the table as PDF
 * @returns {Promise<void>}
 */
async function generatePDF() {
    const pdfBtn = document.getElementById('pdfBtn');
    const pdfBtnText = document.getElementById('pdfBtnText');
    
    if (!currentJsonData) {
        alert('Please generate a table first!');
        return;
    }
    
    // Show loading state
    pdfBtn.disabled = true;
    pdfBtnText.innerHTML = '<span class="loading"></span> Generating PDF...';
    
    try {
        // Get settings
        const pageSize = document.getElementById('pageSize').value;
        const orientation = document.getElementById('orientation').value;
        const fileName = document.getElementById('fileName').value || 'json-table-export';
        const quality = parseInt(document.getElementById('quality').value);
        
        // Create a clean PDF container
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-container';
        pdfContainer.style.position = 'absolute';
        pdfContainer.style.left = '-9999px';
        pdfContainer.style.background = 'white';
        pdfContainer.style.padding = '20px';
        
        // Add header
        const header = document.createElement('div');
        header.className = 'pdf-header';
        header.style.textAlign = 'center';
        header.style.marginBottom = '20px';
        header.style.borderBottom = '1px solid #000';
        header.style.paddingBottom = '10px';
        header.innerHTML = `
            <h1 style="margin: 0; font-size: 18px;">JSON Data Export</h1>
            <div style="margin-top: 5px; font-size: 12px;">Generated on ${new Date().toLocaleString()}</div>
        `;
        
        // Create clean minimal table for PDF
        const tableContainer = document.createElement('div');
        tableContainer.innerHTML = createMinimalPDFTable(currentJsonData);
        
        // Add elements to container
        pdfContainer.appendChild(header);
        pdfContainer.appendChild(tableContainer);
        
        // Temporarily add to body for rendering
        document.body.appendChild(pdfContainer);
        
        // Generate canvas
        const canvas = await html2canvas(pdfContainer, {
            scale: quality,
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        
        // Remove temporary element
        document.body.removeChild(pdfContainer);
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: pageSize
        });
        
        // Get page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        
        // Calculate image dimensions
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        
        if (imgHeight <= pageHeight - (margin * 2)) {
            // Single page
            pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        } else {
            // Multiple pages handling with proper positioning
            let heightLeft = imgHeight;
            let position = 0;
            let page = 1;
            
            pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
            heightLeft -= pageHeight - (margin * 2);
            
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth, imgHeight);
                heightLeft -= (pageHeight - (margin * 2));
                page++;
            }
        }
        
        // Save PDF
        pdf.save(`${fileName}.pdf`);
        
        // Show success message
        const output = document.getElementById('output');
        const successMsg = document.createElement('div');
        successMsg.className = 'success';
        successMsg.textContent = `PDF "${fileName}.pdf" has been generated successfully!`;
        output.appendChild(successMsg);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
        
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF: ' + error.message);
    } finally {
        // Reset button state
        pdfBtn.disabled = false;
        pdfBtnText.textContent = 'Export as PDF';
    }
}
