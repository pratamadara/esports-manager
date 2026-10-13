import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const ALLOWED_TAGS = new Set([
  "B",
  "STRONG",
  "I",
  "EM",
  "U",
  "P",
  "BR",
  "DIV",
  "SPAN",
  "UL",
  "OL",
  "LI",
  "A",
]);

const ALLOWED_ATTRS = new Set(["href", "target", "rel"]);

/**
 * Sanitizes admin-authored rich-text HTML before rendering. Only the
 * formatting tags the RichTextEditor can produce are kept; scripts, styles,
 * event handlers, and all other elements are removed.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return "";
  const template = document.createElement("template");
  template.innerHTML = html;

  const walk = (node: Node): void => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;

      const element = child as Element;
      if (!ALLOWED_TAGS.has(element.tagName)) {
        element.replaceWith(...Array.from(element.childNodes));
        continue;
      }

      for (const attr of Array.from(element.attributes)) {
        if (!ALLOWED_ATTRS.has(attr.name.toLowerCase())) {
          element.removeAttribute(attr.name);
        }
      }
      if (element.tagName === "A") {
        const href = element.getAttribute("href") ?? "";
        if (!/^(https?:|mailto:|\/)/i.test(href)) {
          element.removeAttribute("href");
        }
        element.setAttribute("rel", "noopener noreferrer");
      }
      walk(element);
    }
  };

  walk(template.content);
  return template.innerHTML;
}
