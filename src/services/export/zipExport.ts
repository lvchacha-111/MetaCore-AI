import JSZip from 'jszip'
import type { CodeFile } from '@/types/project'

export async function exportZip(projectName: string, files: CodeFile[]): Promise<void> {
  const zip = new JSZip()
  const folder = zip.folder(projectName)!
  for (const file of files) {
    folder.file(file.path, file.content)
  }
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${projectName}.zip`
  a.click()
  URL.revokeObjectURL(url)
}
