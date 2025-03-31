import { useState } from "react";

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

  if (x >= left && x <= left + width && y >= top && y <= top + height) {
    return true;
  }

  return false;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  return +element.style.lineHeight;
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
  const [hoveredElementInfo, setHoveredElementInfo] =
    useState<HoveredElementInfo | null>(null);

  parsedElements.forEach((parsedElement) => {
    const elementBounds = getElementBounds(parsedElement);

    const elementInfo = {
      element: parsedElement,
      top: elementBounds.top,
      left: elementBounds.left,
      heightOfFirstLine: getLineHeightOfFirstLine(parsedElement),
    };

    parsedElement.addEventListener("mouseout", (e) => {
      setHoveredElementInfo(null);
    });

    parsedElement.addEventListener("mouseover", (e) => {
      setHoveredElementInfo(elementInfo);
    });
  });

  return hoveredElementInfo;
}
