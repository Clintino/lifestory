import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface StoryData {
  profile: {
    name: string;
    birthYear?: number;
    location?: string;
    description?: string;
    coverImage?: string;
  };
  chapters: Array<{
    id: number;
    title: string;
    description?: string;
    content: string;
    images?: Array<{
      url: string;
      caption: string;
    }>;
  }>;
  metadata: {
    wordCount: number;
    totalPages: number;
    readingTime: string;
    createdDate: string;
    dedicatedTo: string;
  };
}

export const generatePDF = async (storyData: StoryData): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;

    // Helper function to add a new page
    const addNewPage = () => {
      pdf.addPage();
      currentY = margin;
    };

    // Helper function to check if we need a new page
    const checkPageBreak = (neededHeight: number) => {
      if (currentY + neededHeight > pageHeight - margin) {
        addNewPage();
      }
    };

    // Helper function to wrap text
    const wrapText = (text: string, maxWidth: number, fontSize: number) => {
      pdf.setFontSize(fontSize);
      return pdf.splitTextToSize(text, maxWidth);
    };

    // Cover Page
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    const titleLines = wrapText(`${storyData.profile.name}'s Life Story`, contentWidth, 28);
    titleLines.forEach((line: string, index: number) => {
      pdf.text(line, pageWidth / 2, 60 + (index * 12), { align: 'center' });
    });

    // Subtitle
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('A Digital Legacy', pageWidth / 2, 90, { align: 'center' });

    // Profile info
    if (storyData.profile.birthYear || storyData.profile.location) {
      const profileInfo = [
        storyData.profile.birthYear && `Born ${storyData.profile.birthYear}`,
        storyData.profile.location
      ].filter(Boolean).join(' • ');
      
      pdf.setFontSize(12);
      pdf.text(profileInfo, pageWidth / 2, 110, { align: 'center' });
    }

    // Description
    if (storyData.profile.description) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'italic');
      const descLines = wrapText(storyData.profile.description, contentWidth - 40, 14);
      descLines.forEach((line: string, index: number) => {
        pdf.text(line, pageWidth / 2, 140 + (index * 8), { align: 'center' });
      });
    }

    // Dedication
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const dedicationLines = wrapText(storyData.metadata.dedicatedTo, contentWidth - 40, 12);
    dedicationLines.forEach((line: string, index: number) => {
      pdf.text(line, pageWidth / 2, pageHeight - 60 + (index * 6), { align: 'center' });
    });

    // Creation date
    pdf.setFontSize(10);
    pdf.text(`Created ${storyData.metadata.createdDate}`, pageWidth / 2, pageHeight - 30, { align: 'center' });

    // Table of Contents
    addNewPage();
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Table of Contents', margin, currentY);
    currentY += 20;

    // Story metadata
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${storyData.metadata.wordCount.toLocaleString()} words • ${storyData.metadata.readingTime} • ${storyData.chapters.length} chapters`, margin, currentY);
    currentY += 15;

    // Chapter list
    storyData.chapters.forEach((chapter, index) => {
      checkPageBreak(15);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Chapter ${chapter.id}: ${chapter.title}`, margin, currentY);
      currentY += 8;
      
      if (chapter.description) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const descLines = wrapText(chapter.description, contentWidth - 20, 10);
        descLines.forEach((line: string) => {
          pdf.text(line, margin + 10, currentY);
          currentY += 5;
        });
      }
      currentY += 5;
    });

    // Chapters
    storyData.chapters.forEach((chapter) => {
      addNewPage();
      
      // Chapter header
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Chapter ${chapter.id}`, margin, currentY);
      currentY += 12;
      
      pdf.setFontSize(16);
      const titleLines = wrapText(chapter.title, contentWidth, 16);
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += 8;
      });
      currentY += 10;

      // Chapter description
      if (chapter.description) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'italic');
        const descLines = wrapText(chapter.description, contentWidth, 12);
        descLines.forEach((line: string) => {
          checkPageBreak(8);
          pdf.text(line, margin, currentY);
          currentY += 6;
        });
        currentY += 8;
      }

      // Chapter content
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const paragraphs = chapter.content.split('\n\n');
      
      paragraphs.forEach((paragraph) => {
        if (paragraph.trim()) {
          const lines = wrapText(paragraph.trim(), contentWidth, 11);
          
          // Check if we need a new page for this paragraph
          checkPageBreak(lines.length * 5 + 8);
          
          lines.forEach((line: string) => {
            pdf.text(line, margin, currentY);
            currentY += 5;
          });
          currentY += 8; // Space between paragraphs
        }
      });
    });

    // Save the PDF
    const fileName = `${storyData.profile.name.replace(/[^a-zA-Z0-9]/g, '_')}_Life_Story.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Alternative method using HTML to Canvas for more complex layouts
export const generateAdvancedPDF = async (elementId: string, fileName: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found for PDF generation');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating advanced PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};