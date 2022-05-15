declare global {
  /** Blob 파일 타입 */
  export type BlobFile = {
    objectURL: string;
    name: string;
    type: string;
  };
}
