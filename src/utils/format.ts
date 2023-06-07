export function bytesToSize(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

export function typeToIcon(type: string, filename: string) {
  if (type === 'folder') {
    return 'folder'
  } else if (type.startsWith('image')) {
    return 'image'
  } else if (type.startsWith('audio')) {
    return 'audio'
  } else if (type.startsWith('video')) {
    return 'video'
  } else if (type.startsWith('application')) {
    if (type.endsWith('pdf')) {
      return 'pdf'
    } else if (type.endsWith('json')) {
      return 'json'
    } else if (type.endsWith('.document') || type.endsWith('msword')) {
      return 'word'
    } else if (
      type.endsWith('.presentation') ||
      type.endsWith('ms-powerpoint')
    ) {
      return 'ppt'
    } else if (type.endsWith('.sheet') || type.endsWith('ms-excel')) {
      return 'excel'
    } else if (type.endsWith('x-zip-compressed')) {
      return 'zip'
    } else if (type.endsWith('x-javascript')) {
      return 'javascript'
    }
  } else if (type.startsWith('text')) {
    if (type.endsWith('html')) {
      return 'html'
    } else if (type.endsWith('css')) {
      return 'css'
    } else if (filename.endsWith('.ts')) {
      return 'typescript'
    } else if (type.endsWith('plain')) {
      return 'txt'
    }
  }

  return 'unknown'
}
