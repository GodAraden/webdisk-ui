<template>
  <a-row :align="'center'" class="mb-1" :gutter="6">
    <a-col flex="200px">
      {{ $t('filelist.footer.total', { count: renderData.length }) }}
      {{ $t('filelist.footer.selected', { count: selectedFiles.length }) }}
    </a-col>
    <a-col flex="auto">
      <a-space size="large">
        <a-popconfirm
          type="warning"
          :content="
            $t(`filelist.footer.operations.delete`, {
              count: selectedFiles.length
            })
          "
          @ok="onDeleteFile"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            status="danger"
            :disabled="pasteBoardDisabled"
          >
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          :content="
            $t(`filelist.footer.operations.cut`, {
              count: selectedFiles.length
            })
          "
          @ok="onCutFile"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            :disabled="pasteBoardDisabled"
          >
            <template #icon>
              <icon-scissor />
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          :content="
            $t(`filelist.footer.operations.copy`, {
              count: selectedFiles.length
            })
          "
          @ok="onCopyFile"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            :disabled="pasteBoardDisabled"
          >
            <template #icon>
              <icon-copy />
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          :content="
            $t(`filelist.footer.operations.paste`, {
              count: pasteBoard?.files.length ?? 0
            })
          "
          @ok="onPasteFile"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            :disabled="!pasteBoard"
          >
            <template #icon>
              <icon-paste />
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          :content="
            $t(`filelist.footer.operations.download`, {
              count: selectedFiles.length
            })
          "
          @ok="onDownloadFile"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            :disabled="selectedFiles.length === 0"
          >
            <template #icon>
              <icon-download />
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          :content="
            $t(`filelist.footer.operations.share`, {
              count: selectedFiles.length
            })
          "
          @ok="() => onClickShare(...selectedFiles)"
        >
          <a-button
            size="small"
            shape="round"
            type="text"
            :disabled="selectedFiles.length === 0"
          >
            <template #icon>
              <icon-share-alt />
            </template>
          </a-button>
        </a-popconfirm>
      </a-space>
    </a-col>
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
</template>

<script lang="ts" setup>
import { useFileList } from '../hooks/useFileList'

const {
  onUploadFile,
  renderData,
  pasteBoard,
  shareForm,
  selectedFiles,
  pasteBoardDisabled,
  onCreateFolder,
  onCutFile,
  onCopyFile,
  onDeleteFile,
  onPasteFile,
  onDownloadFile,
  onClickShare
} = useFileList()
</script>
