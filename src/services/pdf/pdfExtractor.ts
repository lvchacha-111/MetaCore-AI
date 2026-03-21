/**
 * PDF 文本提取服务 — 使用 pdfjs-dist 在浏览器端从 PDF 文件中提取纯文本
 *
 * 用于"AI 识图"和"AI 助填"模式，从芯片数据手册中提取文本供 AI 解析。
 */

import * as pdfjsLib from 'pdfjs-dist'

// 配置 worker（pdfjs-dist v4+ 使用 ESM worker）
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

/**
 * 从 PDF 文件中提取全部文本内容
 *
 * @param file - 用户上传的 PDF File 对象
 * @param maxPages - 最多提取的页数（默认 30，避免超大文档卡死）
 * @returns 提取的纯文本，各页以换行分隔
 */
export async function extractTextFromPdf(file: File, maxPages = 30): Promise<string> {
  // 将 File 转为 ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()

  // 加载 PDF 文档
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const totalPages = Math.min(pdf.numPages, maxPages)
  const textParts: string[] = []

  // 逐页提取文本
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()

    // 拼接每个文本项
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ')

    if (pageText.trim()) {
      textParts.push(`--- 第 ${i} 页 ---\n${pageText}`)
    }
  }

  return textParts.join('\n\n')
}

/**
 * 获取 PDF 文件的基本信息
 *
 * @param file - PDF File 对象
 * @returns 页数和文件大小
 */
export async function getPdfInfo(file: File): Promise<{ pages: number; sizeMB: string }> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  return {
    pages: pdf.numPages,
    sizeMB: (file.size / 1024 / 1024).toFixed(1),
  }
}
