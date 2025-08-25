import { HTMLReactParserOptions } from "html-react-parser";

// Define safe HTML tags that are allowed (whitelist approach)
export const ALLOWED_TAGS = [
  "p",
  "div",
  "span",
  "br",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "a",
  "img",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "sup",
  "sub",
  "small",
  "mark",
  "del",
  "ins",
];

// Define safe HTML attributes that are allowed (whitelist approach)
export const ALLOWED_ATTRIBUTES = [
  "href",
  "src",
  "alt",
  "title",
  "target",
  "rel",
  "class",
  "id",
  "style",
  "width",
  "height",
  "align",
  "valign",
  "colspan",
  "rowspan",
];

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Secure HTML parsing options for html-react-parser
 * Only allows safe HTML tags and attributes, blocks everything else
 */
export const secureHtmlParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    // Only run in browser environment
    if (!isBrowser) {
      return domNode;
    }

    if (domNode && domNode.type === "tag") {
      const tagName = domNode.tagName.toLowerCase();

      // Only allow specified tags - everything else is blocked
      if (!ALLOWED_TAGS.includes(tagName)) {
        return null;
      }

      // Filter attributes to only allow safe ones
      if (domNode.attributes) {
        const safeAttributes: { [key: string]: string } = {};

        for (let i = 0; i < domNode.attributes.length; i++) {
          const attr = domNode.attributes[i];
          const attrName = attr.name.toLowerCase();
          const attrValue = attr.value;

          // Only allow safe attributes - everything else is blocked
          if (ALLOWED_ATTRIBUTES.includes(attrName)) {
            // Additional security checks for specific attributes
            if (attrName === "href" && attrValue.startsWith("javascript:")) {
              continue; // Block javascript: URLs
            }
            if (attrName === "src" && attrValue.startsWith("javascript:")) {
              continue; // Block javascript: URLs
            }
            if (attrName === "style" && attrValue.includes("javascript:")) {
              continue; // Block javascript in styles
            }
            if (attrName === "href" && attrValue.startsWith("data:")) {
              continue; // Block data: URLs
            }
            if (attrName === "src" && attrValue.startsWith("data:")) {
              continue; // Block data: URLs
            }

            safeAttributes[attrName] = attrValue;
          }
        }

        // Create a new element with only safe attributes
        const safeElement = document.createElement(tagName);
        Object.entries(safeAttributes).forEach(([name, value]) => {
          safeElement.setAttribute(name, value);
        });

        // Copy the content
        if ("innerHTML" in domNode) {
          safeElement.innerHTML = String((domNode as Record<string, unknown>).innerHTML);
        }
        return safeElement;
      }
    }

    return domNode;
  },
};

/**
 * Sanitize HTML string before parsing with DOMParser
 * Useful for Lexical editor initialization
 */
export function sanitizeHtmlForEditor(html: string): string {
  // Only run in browser environment
  if (!isBrowser) {
    return html;
  }

  // Create a temporary div to parse and sanitize HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Remove all elements that are not in the allowed tags list
  const allElements = tempDiv.querySelectorAll("*");
  allElements.forEach((el) => {
    if (el instanceof Element) {
      const tagName = el.tagName.toLowerCase();
      if (!ALLOWED_TAGS.includes(tagName)) {
        el.remove();
      }
    }
  });

  // Remove all attributes that are not in the allowed attributes list
  const remainingElements = tempDiv.querySelectorAll("*");
  remainingElements.forEach((el) => {
    if (el instanceof Element) {
      // Remove blocked attributes
      Array.from(el.attributes).forEach((attr) => {
        const attrName = attr.name.toLowerCase();
        if (!ALLOWED_ATTRIBUTES.includes(attrName)) {
          el.removeAttribute(attrName);
        }
      });

      // Remove javascript: and data: URLs
      if (el.hasAttribute("href")) {
        const href = el.getAttribute("href");
        if (href && (href.startsWith("javascript:") || href.startsWith("data:"))) {
          el.removeAttribute("href");
        }
      }

      if (el.hasAttribute("src")) {
        const src = el.getAttribute("src");
        if (src && (src.startsWith("javascript:") || src.startsWith("data:"))) {
          el.removeAttribute("src");
        }
      }
    }
  });

  return tempDiv.innerHTML;
}
