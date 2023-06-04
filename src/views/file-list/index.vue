<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <a-upload draggable action="/" @before-upload="beforeUpload" />
    <a-divider></a-divider>
    <a-button type="primary" size="large" long @click="onDownloadFile"
      >下载</a-button
    >
  </div>
</template>

<script lang="ts" setup>
import {
  createFile,
  downloadChunk,
  downloadFile,
  uploadChunk,
  mergeBlobChunk,
  saveAs
} from '@/api/file'
import breadcrumb from '@/components/breadcrumb.vue'
import { MD5 } from 'crypto-js'
import { ref } from 'vue'

const currentPath = ref()

const MAX_CHUNK_SIZE = 20 * 1024
function createChunk(file: File) {
  const chunkList: Blob[] = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push(file.slice(cur, cur + MAX_CHUNK_SIZE))
    cur += MAX_CHUNK_SIZE
  }
  return chunkList
}

const beforeUpload = async (file: File) => {
  const { data } = await createFile({
    path: currentPath.value ?? '/',
    name: file.name,
    size: file.size,
    type: file.type,
    sign: MD5(await file.text()).toString()
  })
  if (!data) return

  const chunkList = createChunk(file)

  const res = await Promise.all(
    chunkList.map(async (chunk, i) => {
      return uploadChunk({
        chunk,
        md5: MD5(await chunk.text()).toString(),
        order: i,
        size: chunk.size,
        fileId: data.id
      })
    })
  )

  console.log(res)

  return true
}

const onDownloadFile = async () => {
  const { data } = await downloadFile({
    id: '0c9b8453-416f-4408-8ce5-c00eac329f8f'
  })
  console.log(data)

  const buffers: Uint8Array[] = new Array(data.chunks.length)

  for (const chunk of data.chunks) {
    const data = await downloadChunk(chunk.md5)
    buffers[chunk.order] = new Uint8Array(data)
  }

  const res = mergeBlobChunk(buffers)

  saveAs(data.name, res)
}
</script>
