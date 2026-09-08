import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url&inline'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const TEXT_EXTENSIONS = new Set(['txt', 'md', 'markdown'])

function extensionOf(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ')
    pages.push(text.trim())
  }
  return pages.join('\n\n').trim()
}

export async function extractFileText(file: File): Promise<string> {
  const ext = extensionOf(file.name)

  if (ext === 'pdf' || file.type === 'application/pdf') {
    const text = await extractPdfText(file)
    if (!text) {
      throw new Error(
        `Couldn't find any selectable text in "${file.name}" — it may be a scanned/image PDF. Copy the text out manually and paste it in instead.`,
      )
    }
    return text
  }

  if (TEXT_EXTENSIONS.has(ext) || file.type.startsWith('text/')) {
    return file.text()
  }

  throw new Error(
    `Can't read "${file.name}" yet — PDF, .txt, and .md are supported. For Word docs or slides, copy the text and paste it into the box instead.`,
  )
}
