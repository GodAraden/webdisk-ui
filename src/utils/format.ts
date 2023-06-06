export function bytesToSize(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

export function typeToIcon(type: string) {
  // TODO: 格式 - Icon 名转换函数
  if (type === 'folder') return 'folder'
  else if (type.startsWith('image')) return 'image'
  else if (type.startsWith('audio')) return 'audio'
  else if (type.startsWith('video')) return 'video'

  return 'unknown'
}
