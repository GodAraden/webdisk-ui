<template>
  <a-affix>
    <a-row :align="'center'" class="mb-1" :gutter="6">
      <a-col flex="100px">
        {{ $t('filelist.footer.total', { total: renderData.length }) }}
      </a-col>
      <a-col flex="auto"> </a-col>

      <a-col flex="1px">
        <a-button
          size="small"
          shape="round"
          type="dashed"
          @click="onCreateFolder"
        >
          <template #icon>
            <icon-folder-add />
          </template>
          {{ $t('filelist.footer.newFolder') }}
        </a-button>
      </a-col>
      <a-col flex="1px">
        <a-upload @before-upload="onUploadFile" directory>
          <template #upload-button>
            <a-button size="small" type="outline" shape="round">
              <template #icon>
                <icon-folder />
              </template>
              {{ $t('filelist.footer.uploadFolder') }}
            </a-button>
          </template>
        </a-upload>
      </a-col>

      <a-col flex="1px">
        <a-upload @before-upload="onUploadFile" multiple>
          <template #upload-button>
            <a-button size="small" type="primary" shape="round">
              <template #icon>
                <icon-upload />
              </template>
              {{ $t('filelist.footer.upload') }}
            </a-button>
          </template>
        </a-upload>
      </a-col>
    </a-row>
  </a-affix>
</template>

<script lang="ts" setup>
import { provideFileList } from '../hooks/useFileList'

const { onUploadFile, renderData, onCreateFolder } = provideFileList()
</script>
