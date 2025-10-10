import StreamSaver from 'streamsaver';
import { errorCodeRecord } from '@/constants/common';
import { localStg } from '@/utils/storage';
import { getServiceBaseURL } from '@/utils/service';
import { transformToURLSearchParams } from '@/utils/common';

interface RequestConfig {
  method: 'GET' | 'POST';
  url: string;
  params?: Record<string, any>;
  filename?: string;
  contentType?: string;
}

export function useDownload() {
  const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
  const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

  const isHttps = () => {
    const protocol = document.location.protocol;
    const hostname = document.location.hostname;
    return protocol === 'https' || hostname === 'localhost' || hostname === '127.0.0.1';
  };

  /** 获取通用请求头 */
  const getCommonHeaders = (contentType = 'application/octet-stream') => ({
    Authorization: `Bearer ${localStg.get('token')}`,
    Clientid: import.meta.env.VITE_APP_CLIENT_ID!,
    'Content-Type': contentType
  });

  /** 通用下载方法 */
  function downloadByData(data: BlobPart, filename: string, type = 'application/octet-stream') {
    const blob = new Blob([data], { type });
    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = Object.assign(document.createElement('a'), {
      style: { display: 'none' },
      href: blobURL,
      download: filename
    });

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }

  /** 流式下载 */
  async function downloadByStream(
    readableStream: ReadableStream<Uint8Array>,
    filename: string,
    contentLength?: number
  ): Promise<void> {
    window.$loading?.endLoading();
    StreamSaver.mitm = '/streamsaver/mitm.html?version=2.0.0';
    const fileStream = StreamSaver.createWriteStream(filename, { size: contentLength });

    if (window.WritableStream && readableStream?.pipeTo) {
      await readableStream.pipeTo(fileStream);
      window.$message?.success('下载完成');
      return;
    }

    // 降级处理
    const writer = fileStream.getWriter();
    const reader = readableStream.getReader();

    const pump = async (): Promise<void> => {
      const { done, value } = await reader.read();
      if (done) return writer.close();
      await writer.write(value);
      return pump();
    };

    await pump();
  }

  /** 处理响应 */
  async function handleResponse(response: Response) {
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const res = await response.json();
      const code = res.code as CommonType.ErrorCode;
      throw new Error(errorCodeRecord[code] || res.msg || errorCodeRecord.default);
    }
  }

  /** 根据文件名获取 MIME 类型 */
  function getMimeTypeByFilename(filename: string, responseContentType?: string | null): string {
    const lowerFilename = filename.toLowerCase();

    // 文件扩展名到 MIME 类型的映射
    const mimeTypeMap: Record<string, string> = {
      '.zip': 'application/zip',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xls': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.doc': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif'
    };

    // 查找匹配的扩展名
    for (const [ext, mimeType] of Object.entries(mimeTypeMap)) {
      if (lowerFilename.endsWith(ext)) {
        return mimeType;
      }
    }

    // 如果没有匹配的扩展名，使用响应头的 Content-Type
    if (responseContentType) {
      return responseContentType.split(';')[0]?.trim() || 'application/octet-stream';
    }

    return 'application/octet-stream';
  }

  /** 核心下载逻辑 */
  async function executeDownload(
    config: RequestConfig & { disableStream?: boolean; streamThreshold?: number }
  ): Promise<void> {
    const {
      method,
      url,
      params,
      filename,
      contentType,
      disableStream = false,
      streamThreshold = 50 * 1024 * 1024
    } = config; // 默认 50MB 以上使用流式下载
    const timestamp = Date.now();
    const fullUrl = `${baseURL}${url}${url.includes('?') ? '&' : '?'}t=${timestamp}`;

    window.$loading?.startLoading('正在下载数据，请稍候...');

    try {
      const requestOptions: RequestInit = {
        method,
        headers: getCommonHeaders(contentType)
      };

      if (method === 'POST' && params) {
        requestOptions.body = transformToURLSearchParams(params);
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      }

      const response = await fetch(fullUrl, requestOptions);

      if (response.status !== 200) {
        throw new Error(errorCodeRecord.default);
      }

      await handleResponse(response);
      const rawHeader = response.headers.get('Download-Filename');
      let finalFilename = filename || (rawHeader ? decodeURIComponent(rawHeader) : '') || `download-${timestamp}`;

      finalFilename = finalFilename.replace(/[<>:"/\\|?*]/g, '_');

      // 获取文件大小
      const contentLength = Number(response.headers.get('Content-Length')) || 0;

      // 智能选择下载方式：仅在文件大于阈值且满足条件时使用流式下载
      const shouldUseStream = !disableStream && response.body && isHttps() && contentLength > streamThreshold;

      if (shouldUseStream && response.body) {
        await downloadByStream(response.body, finalFilename, contentLength);
        return;
      }

      // 确定文件的 MIME 类型
      const responseContentType = response.headers.get('Content-Type');
      const mimeType = getMimeTypeByFilename(finalFilename, responseContentType);

      downloadByData(await response.blob(), finalFilename, mimeType);
    } catch (error: any) {
      window.$message?.error(error.message);
    } finally {
      window.$loading?.endLoading();
    }
  }

  /** 公共下载接口 */
  const download = (url: string, params: Record<string, any>, filename: string) =>
    executeDownload({ method: 'POST', url, params, filename });

  /** OSS文件下载 */
  const oss = (ossId: CommonType.IdType) =>
    executeDownload({
      method: 'GET',
      url: `/resource/oss/download/${ossId}`,
      streamThreshold: 100 * 1024 * 1024 // OSS 文件 100MB 以上才使用流式下载，避免小文件损坏
    });

  /** ZIP文件下载 */
  const zip = (url: string, filename: string) =>
    executeDownload({
      method: 'GET',
      url,
      filename,
      contentType: 'application/octet-stream',
      streamThreshold: 200 * 1024 * 1024 // ZIP 压缩文件 200MB 以上才使用流式下载
    });

  return {
    oss,
    zip,
    download
  };
}
