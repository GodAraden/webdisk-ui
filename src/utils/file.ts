const MAX_CHUNK_SIZE = 20 * 1024

// 文件切片
export function createChunk(file: File) {
  const chunkList: Blob[] = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push(file.slice(cur, cur + MAX_CHUNK_SIZE))
    cur += MAX_CHUNK_SIZE
  }
  return chunkList
}

// 文件合并
export function mergeBlobChunk(arrays: Uint8Array[]) {
  if (!arrays.length) return
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0)
  const result = new Uint8Array(totalLength)
  let length = 0
  for (const array of arrays) {
    result.set(array, length)
    length += array.length
  }
  return result
}

// 文件下载
export function saveAs(filename = '', buffers: BlobPart) {
  const blob = new Blob([buffers], { type: 'application/octet-stream' })
  const blobUrl = URL.createObjectURL(blob)
  const a: HTMLAnchorElement = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  a.click()
  URL.revokeObjectURL(blobUrl)
}
