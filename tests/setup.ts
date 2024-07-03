import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;
// previously had error: ResizeObserver is not defined
// ResizeObserver is a browser api that isn't available in node env we use for testing...
// ResizeObserver is needed for observing changes to element sizes and is used in responsive design/dynamic component rendering...
// to fix this issue we use resize-observer-polyfill library which provides a polyfill for this api, ensuring tests can run smoothly without relying on browser-specific implementations

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
// mocking these fxns bc again, more browser apis not available in node environment we use for testing

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
// always restart vitest after editing this file
