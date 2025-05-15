import { useEffect, useState } from "react";

/**
 * Gets bounding boxes for an element. This is implemented for you
 */
export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}

/**
 * **TBD:** Implement a function that checks if a point is inside an element
 */
export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement,
): boolean {
  const { x, y } = coordinate;
  const { top, left, width, height } = getElementBounds(element);

  return x >= left && x <= left + width && y >= top && y <= top + height;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  const hasDirectText = Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
  );

  const target = hasDirectText
    ? element
    : findFirstElementWithText(element) ?? element;

  const computedStyle = window.getComputedStyle(target);
  return parseInt(computedStyle.fontSize, 10);
}

/**
 * Helper function to find the first element containing text within the parent element
 */
function findFirstElementWithText(element: HTMLElement): HTMLElement | null {
  if (element.childNodes.length === 0) return null;

  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const trimmedText = node.textContent?.trim();
      if (trimmedText) return element;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const result = findFirstElementWithText(node as HTMLElement);
      if (result) return result;
    }
  }

  return null;
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

/**
 * **TBD:** Implement a React hook to be used to help to render hover player
 * Return the absolute coordinates on where to render the hover player
 * Returns null when there is no active hovered paragraph
 * Note: If using global event listeners, attach them window instead of document to ensure tests pass
 */
export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[],
): HoveredElementInfo | null {
  const [hoveredInfo, setHoveredInfo] = useState<HoveredElementInfo | null>(
    null,
  );

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;

      for (const element of parsedElements) {
        if (isPointInsideElement({ x, y }, element)) {
          const bounds = getElementBounds(element);
          const height = getLineHeightOfFirstLine(element);
          setHoveredInfo({
            element,
            top: bounds.top,
            left: bounds.left,
            heightOfFirstLine: height,
          });
          return;
        }
      }

      setHoveredInfo(null);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parsedElements]);

  return hoveredInfo;
}
