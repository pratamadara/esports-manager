import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom's File does not always expose `arrayBuffer`, which the team logo
// uploader calls. Provide it so the upload journey can run without a browser.
if (typeof File !== "undefined" && !File.prototype.arrayBuffer) {
  File.prototype.arrayBuffer = function arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(new ArrayBuffer(this.size));
  };
}

afterEach(() => {
  cleanup();
});
