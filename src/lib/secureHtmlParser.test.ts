import {
  secureHtmlParserOptions,
  sanitizeHtmlForEditor,
  ALLOWED_TAGS,
  ALLOWED_ATTRIBUTES,
} from "./secureHtmlParser";

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
});
