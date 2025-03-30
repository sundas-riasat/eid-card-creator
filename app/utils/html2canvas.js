// File: utils/html2canvas.js
import html2canvas from "html2canvas";

export const captureCardAsImage = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error("Element not found");

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing card as image:", error);
    return null;
  }
};
