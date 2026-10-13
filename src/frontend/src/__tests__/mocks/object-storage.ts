/**
 * Test double for `@caffeineai/object-storage`.
 *
 * `ExternalBlob.fromBytes` normally uploads to platform file storage. The mock
 * keeps the bytes locally and reports progress synchronously so the upload
 * journey can assert the progress feedback and the resulting direct URL without
 * any network call.
 */

export class ExternalBlob {
  private bytes: Uint8Array;
  private contentType?: string;
  private filename?: string;
  private onProgress?: (percentage: number) => void;
  private url: string;

  private constructor(
    bytes: Uint8Array,
    contentType?: string,
    filename?: string,
  ) {
    this.bytes = bytes;
    this.contentType = contentType;
    this.filename = filename;
    this.url = `mock://blob/${filename ?? "blob"}`;
  }

  static fromURL(url: string): ExternalBlob {
    const blob = new ExternalBlob(new Uint8Array(), undefined, undefined);
    blob.url = url;
    return blob;
  }

  static fromBytes(
    bytes: Uint8Array,
    contentType?: string,
    filename?: string,
  ): ExternalBlob {
    return new ExternalBlob(bytes, contentType, filename);
  }

  getBytes(): Promise<Uint8Array> {
    return Promise.resolve(this.bytes);
  }

  getDirectURL(): string {
    return this.url;
  }

  withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
    this.onProgress = onProgress;
    this.onProgress(100);
    return this;
  }
}

export class StorageClient {}
