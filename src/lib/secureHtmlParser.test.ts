import {
  secureHtmlParserOptions,
  sanitizeHtmlForEditor,
  sanitizeHtmlServer,
  ALLOWED_TAGS,
  ALLOWED_ATTRIBUTES,
} from "./secureHtmlParser";
import { expect } from "@jest/globals";

describe("secureHtmlParser", () => {
  describe("secureHtmlParserOptions", () => {
    it("should have replace function defined", () => {
      expect(secureHtmlParserOptions.replace).toBeDefined();
      expect(typeof secureHtmlParserOptions.replace).toBe("function");
    });

    it("should have correct allowed tags", () => {
      expect(ALLOWED_TAGS).toContain("p");
      expect(ALLOWED_TAGS).toContain("div");
      expect(ALLOWED_TAGS).toContain("strong");
      expect(ALLOWED_TAGS).not.toContain("script");
      expect(ALLOWED_TAGS).not.toContain("iframe");
    });

    it("should have correct allowed attributes", () => {
      expect(ALLOWED_ATTRIBUTES).toContain("class");
      expect(ALLOWED_ATTRIBUTES).toContain("href");
      expect(ALLOWED_ATTRIBUTES).toContain("src");
      expect(ALLOWED_ATTRIBUTES).not.toContain("onclick");
      expect(ALLOWED_ATTRIBUTES).not.toContain("onload");
    });
  });

  describe("sanitizeHtmlForEditor", () => {
    it("should remove script tags", () => {
      const html = '<p>Safe content</p><script>alert("xss")</script><div>More content</div>';
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("<script>");
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<div>More content</div>");
    });

    it("should remove iframe tags", () => {
      const html =
        '<p>Safe content</p><iframe src="http://evil.com"></iframe><div>More content</div>';
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("<iframe>");
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<div>More content</div>");
    });

    it("should remove dangerous attributes", () => {
      const html = '<p onclick="alert(\'xss\')" class="safe-class">Content</p>';
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("onclick");
      expect(result).toContain('class="safe-class"');
    });

    it("should remove javascript: URLs", () => {
      const html =
        "<a href=\"javascript:alert('xss')\">Link</a><img src=\"javascript:alert('xss')\" />";
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("javascript:");
    });

    it("should preserve safe HTML", () => {
      const html = "<p>Safe content</p><strong>Bold text</strong><ul><li>List item</li></ul>";
      const result = sanitizeHtmlForEditor(html);
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<strong>Bold text</strong>");
      expect(result).toContain("<ul><li>List item</li></ul>");
    });

    it("should handle empty HTML", () => {
      const result = sanitizeHtmlForEditor("");
      expect(result).toBe("");
    });

    it("should handle HTML with only dangerous content", () => {
      const html = '<script>alert("xss")</script><iframe src="http://evil.com"></iframe>';
      const result = sanitizeHtmlForEditor(html);
      expect(result).toBe("");
    });

    it("should remove unknown tags", () => {
      const html = "<p>Safe content</p><unknown>Unknown tag</unknown><div>More content</div>";
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("<unknown>");
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<div>More content</div>");
    });

    it("should remove unknown attributes", () => {
      const html = '<p unknownattr="value" class="safe-class">Content</p>';
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("unknownattr");
      expect(result).toContain('class="safe-class"');
    });

    it("should remove data: URLs", () => {
      const html = "<a href=\"data:text/html,<script>alert('xss')</script>\">Link</a>";
      const result = sanitizeHtmlForEditor(html);
      expect(result).not.toContain("data:");
    });

    it("should handle complex nested HTML", () => {
      const html = `
        <div class="container">
          <h1>Title</h1>
          <p>Safe paragraph with <strong>bold text</strong></p>
          <script>alert('xss')</script>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
          <iframe src="http://evil.com"></iframe>
        </div>
      `;
      const result = sanitizeHtmlForEditor(html);
      expect(result).toContain('<div class="container">');
      expect(result).toContain("<h1>Title</h1>");
      expect(result).toContain("<p>Safe paragraph with <strong>bold text</strong></p>");
      expect(result).toContain("<ul>");
      expect(result).toContain("<li>List item 1</li>");
      expect(result).toContain("<li>List item 2</li>");
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("<iframe>");
    });
  });

  describe("sanitizeHtmlServer", () => {
    it("should remove script tags", async () => {
      const html = '<p>Safe content</p><script>alert("xss")</script><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("</script>");
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<div>More content</div>");
    });

    it("should remove iframe tags", async () => {
      const html =
        '<p>Safe content</p><iframe src="http://evil.com"></iframe><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<iframe>");
      expect(result).not.toContain("</iframe>");
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<div>More content</div>");
    });

    it("should remove object tags", async () => {
      const html = '<p>Safe content</p><object data="evil.swf"></object><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<object>");
      expect(result).not.toContain("</object>");
      expect(result).toContain("<p>Safe content</p>");
    });

    it("should remove embed tags", async () => {
      const html = '<p>Safe content</p><embed src="evil.swf"><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<embed>");
      expect(result).toContain("<p>Safe content</p>");
    });

    it("should remove form tags", async () => {
      const html = '<p>Safe content</p><form><input type="text"></form><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<form>");
      expect(result).not.toContain("</form>");
      expect(result).toContain("<p>Safe content</p>");
    });

    it("should remove input tags", async () => {
      const html = '<p>Safe content</p><input type="text" value="test"><div>More content</div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<input>");
      expect(result).toContain("<p>Safe content</p>");
    });

    it("should remove dangerous event handlers", async () => {
      const html = '<p onclick="alert(\'xss\')" onload="evil()" class="safe">Content</p>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("onclick");
      expect(result).not.toContain("onload");
      expect(result).toContain('class="safe"');
    });

    it("should remove javascript: URLs from href", async () => {
      const html = "<a href=\"javascript:alert('xss')\">Link</a>";
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("javascript:");
      // DOMPurify removes the dangerous href attribute entirely
      expect(result).toContain("<a>");
      expect(result).toContain("Link");
      expect(result).toContain("</a>");
    });

    it("should remove javascript: URLs from src", async () => {
      const html = "<img src=\"javascript:alert('xss')\">";
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("javascript:");
      // DOMPurify removes the dangerous src attribute entirely
      expect(result).toContain("<img>");
    });

    it("should remove data: URLs from href", async () => {
      const html = "<a href=\"data:text/html,<script>alert('xss')</script>\">Link</a>";
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("data:");
      // DOMPurify removes the dangerous href attribute entirely
      expect(result).toContain("<a>");
      expect(result).toContain("Link");
      expect(result).toContain("</a>");
    });

    it("should remove data: URLs from src", async () => {
      const html = '<img src="data:image/png;base64,evil">';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("data:");
      // DOMPurify removes the dangerous src attribute entirely
      expect(result).toContain("<img>");
    });

    it("should remove style attributes with javascript", async () => {
      const html = "<p style=\"background: javascript:alert('xss')\">Content</p>";
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("javascript");
      expect(result).toContain("<p>");
      expect(result).toContain("Content");
      expect(result).toContain("</p>");
    });

    it("should remove style attributes with expression", async () => {
      const html = "<p style=\"width: expression(alert('xss'))\">Content</p>";
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("expression");
      expect(result).toContain("<p>");
      expect(result).toContain("Content");
      expect(result).toContain("</p>");
    });

    it("should preserve safe HTML", async () => {
      const html = "<p>Safe content</p><strong>Bold text</strong><ul><li>List item</li></ul>";
      const result = await sanitizeHtmlServer(html);
      expect(result).toContain("<p>Safe content</p>");
      expect(result).toContain("<strong>Bold text</strong>");
      expect(result).toContain("<ul><li>List item</li></ul>");
    });

    it("should handle null input", async () => {
      const result = await sanitizeHtmlServer(null);
      expect(result).toBe("");
    });

    it("should handle undefined input", async () => {
      const result = await sanitizeHtmlServer(undefined);
      expect(result).toBe("");
    });

    it("should handle empty string", async () => {
      const result = await sanitizeHtmlServer("");
      expect(result).toBe("");
    });

    it("should handle HTML with only dangerous content", async () => {
      const html = '<script>alert("xss")</script><iframe src="http://evil.com"></iframe>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("<iframe>");
    });

    it("should handle nested script tags", async () => {
      const html = '<div><script>alert("xss")</script></div>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<script>");
      expect(result).toContain("<div>");
      expect(result).toContain("</div>");
    });

    it("should handle script tags with attributes", async () => {
      const html = '<script type="text/javascript">alert("xss")</script>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("<script");
      expect(result).not.toContain("</script>");
    });

    it("should handle multiple dangerous attributes", async () => {
      const html =
        '<p onclick="evil1()" onload="evil2()" onerror="evil3()" class="safe">Content</p>';
      const result = await sanitizeHtmlServer(html);
      expect(result).not.toContain("onclick");
      expect(result).not.toContain("onload");
      expect(result).not.toContain("onerror");
      expect(result).toContain('class="safe"');
    });
  });
});
