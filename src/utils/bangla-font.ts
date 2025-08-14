// Utility to automatically apply Anek Bangla font to elements containing Bangla text

// Function to detect if text contains Bengali characters
export const containsBengali = (text: string): boolean => {
  const bengaliRegex = /[\u0980-\u09FF]/;
  return bengaliRegex.test(text);
};

// Function to apply Anek Bangla font to an element if it contains Bangla text
export const applyBanglaFont = (element: HTMLElement): void => {
  if (element.textContent && containsBengali(element.textContent)) {
    element.style.fontFamily = 'var(--font-anek-bangla), var(--font-poppins), sans-serif';
  }
};

// Function to apply Anek Bangla font to all elements on the page
export const applyBanglaFontToAll = (): void => {
  // Get all elements that might contain text
  const elements = document.querySelectorAll('label, div, span, p, h1, h2, h3, h4, h5, h6, li, td, th');
  
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      applyBanglaFont(element);
    }
  });
};

// Function to observe DOM changes and apply font to new elements
export const observeAndApplyFont = (): void => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          applyBanglaFont(node);
          // Also check child elements
          const childElements = node.querySelectorAll('label, div, span, p, h1, h2, h3, h4, h5, h6, li, td, th');
          childElements.forEach((child) => {
            if (child instanceof HTMLElement) {
              applyBanglaFont(child);
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Initialize font application when DOM is ready
export const initBanglaFont = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyBanglaFontToAll();
      observeAndApplyFont();
    });
  } else {
    applyBanglaFontToAll();
    observeAndApplyFont();
  }
};
