<template>
  <a-upload @before-upload="onUploadFile">
    <template #icon>
      <icon-upload />
    </template>
    上传文件
  </a-upload>
  <!--     <a-button-group size="small" shape="round" type="outline">
      <a-button>
        <template #icon>
          <icon-plus />
        </template>
        新建文件夹
      </a-button>
      <a-button>新建文件</a-button>
    </a-button-group> -->

  <a-row :align="'center'">
    <a-col flex="1px">
      <a-button-group type="text" class="file-nav-btns">
        <a-button class="file-nav-btn" :disabled="!canUndo" @click="undo">
          <template #icon>
            <icon-arrow-left />
          </template>
        </a-button>
        <a-button class="file-nav-btn" :disabled="!canRedo" @click="redo">
          <template #icon>
            <icon-arrow-right />
          </template>
        </a-button>
        <a-dropdown>
          <a-button class="file-nav-btn">
            <template #icon>
              <icon-down />
            </template>
          </a-button>
          <template #content>
            <a-doption v-for="item in history" :key="item.timestamp">
              {{ item.snapshot[item.snapshot.length - 1] || '我的网盘' }}
            </a-doption>
          </template>
        </a-dropdown>
        <a-button class="file-nav-btn">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-button-group>
    </a-col>

    <a-divider direction="vertical"></a-divider>

    <a-col flex="auto" style="overflow-x: scroll">
      <a-breadcrumb>
        <template #separator>
          <icon-right />
        </template>
        <a-breadcrumb-item
          class="breadcrumb-item"
          v-for="(item, idx) in currentPath"
          :key="idx"
        >
          {{ item || '我的网盘' }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-col>
    <a-divider direction="vertical"></a-divider>
    <a-col flex="240px">
      <a-input-search
        size="small"
        placeholder="在本文件夹下检索"
        @search="(v) => currentPath.push(v)"
      />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { useRefHistory } from '@vueuse/core'
import { useFilesList } from '../hooks/useFilesList'

const { currentPath, onUploadFile } = useFilesList()

const { history, undo, redo, canUndo, canRedo } = useRefHistory(currentPath, {
  capacity: 10,
  deep: true
})
</script>

<style lang="less">
.file-nav-btns {
  .file-nav-btn {
    color: rgb(var(--gray-8));
  }
  .file-nav-btn[disabled] {
    color: rgb(var(--gray-4));
  }
  .file-nav-btn:hover {
    color: rgb(var(--gray-10));
    background-color: rgb(var(--gray-2));
  }
  .file-nav-btn[disabled]:hover {
    color: rgb(var(--gray-4));
    background-color: initial;
  }
}

.breadcrumb-item {
  cursor: pointer;
  user-select: none;
  &:hover {
    transition: color 0.1s linear;
    color: rgb(var(--arcoblue-5));
  }
}
</style>
