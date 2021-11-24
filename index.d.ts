declare module "react-s3-uploader" {
  import { Component } from "react";

  export interface ReactS3UploaderProps<Response> {
    signingUrl?: string;
    signingUrlMethod?: "GET" | "POST";
    getSignedUrl?: (file: File, callback: (params: Response) => void) => void;
    accept?: string;
    s3path?: string;
    preprocess?: (file: File, next: (file: File) => void) => void;
    onSignedUrl?: (response: Response) => void;
    onProgress?: (percent: number, status: string, file: File) => void;
    onError?: (message: string, file: File) => void;
    onFinish?: (result: Response, file: File) => void;
    signingUrlHeaders?: Object | (() => Object);
    signingUrlQueryParams?: Object | (() => Object);
    signingUrlWithCredentials?: boolean;
    uploadRequestHeaders?: object;
    contentDisposition?: string;
    server?: string;
    inputRef?: (ref: HTMLInputElement) => any;
    autoUpload?: boolean;
    scrubFilename?: (filename: string) => string;
    [key: string]: any;
  }

  class ReactS3Uploader<Response> extends Component<
    ReactS3UploaderProps<Response>
  > {}

  export default ReactS3Uploader;
}

declare module "react-s3-uploader/s3upload" {
  import { ReactS3UploaderProps } from "react-s3-uploader";

  export interface S3UploadOptions<Response>
    extends Pick<
      ReactS3UploaderProps<Response>,
      | "contentDisposition"
      | "getSignedUrl"
      | "onProgress"
      | "onError"
      | "onSignedUrl"
      | "preprocess"
      | "s3path"
      | "server"
      | "signingUrl"
      | "signingUrlHeaders"
      | "signingUrlMethod"
      | "signingUrlQueryParams"
      | "signingUrlWithCredentials"
      | "uploadRequestHeaders"
    > {
    fileElement?: HTMLInputElement | null;
    files?: HTMLInputElement["files"] | null;
    onFinishS3Put?: ReactS3UploaderProps<Response>["onFinish"];
    successResponses?: number[];
    scrubFilename?: (filename: string) => string;
  }

  class S3Upload<Response> {
    constructor(options: ReactS3UploaderProps<Response>);
    abortUpload(): void;
    uploadFile(file: File): Promise<Response>;
    uploadToS3(file: File, signResult: Response): void;
  }

  export default S3Upload;
}
