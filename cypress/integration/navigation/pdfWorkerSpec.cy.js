/**
 * The PDF.js worker file is used to parse PDFs. It is a required file for the application's
 * import functionality to work.
 */
describe("PDF.js worker file", () => {
  it("should be accessible at /pdf.worker.min.mjs", () => {
    cy.request("/pdf.worker.min.mjs").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("javascript");
    });
  });
});
