/**
 * PDF download and opening utilities
 */

export const openOrDownloadPdf = (url: string, filename: string) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (err) {
    console.error('Failed to trigger PDF download', err);
    window.location.href = url;
  }
};

export const openBrochurePdf = () => {
  openOrDownloadPdf('/brochure-tarieven-golden-light-stories.pdf', 'Brochure-Tarieven-Golden-Light-Stories.pdf');
};

export const openTermsPdf = () => {
  openOrDownloadPdf('/algemene-voorwaarden-golden-light-stories.pdf', 'Algemene-Voorwaarden-Golden-Light-Stories.pdf');
};
