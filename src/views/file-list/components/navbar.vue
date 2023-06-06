<template>
  <a-row :align="'center'">
    <!-- 设置1px但是这里面只有一个元素，所以不会截断换行，这样能把a-col撑开到此元素应有的宽度 -->
    <a-col flex="1px">
      <a-button-group type="text">
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
            <a-doption
              v-for="item in history"
              :key="item.timestamp"
              @click="currentPath = item.snapshot"
            >
              {{
                item.snapshot[item.snapshot.length - 1] ||
                $t('filelist.path.home')
              }}
            </a-doption>
          </template>
        </a-dropdown>
        <a-button class="file-nav-btn" @click="fetchData">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-button-group>
    </a-col>

    <a-divider direction="vertical"></a-divider>

    <a-col flex="auto" style="overflow-x: scroll">
      <a-breadcrumb :max-count="5">
        <template #separator>
          <icon-right />
        </template>
        <a-breadcrumb-item
          class="breadcrumb-item cursor-pointer"
          v-for="(item, idx) in currentPath"
          @click="currentPath = currentPath.slice(0, idx + 1)"
          :key="idx"
        >
          {{ item || $t('filelist.path.home') }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-col>

    <a-divider direction="vertical"></a-divider>

    <a-col flex="300px">
      <a-row>
        <a-dropdown>
          <a-button type="text" class="file-nav-btn">
            <template #icon>
              <icon-sort />
            </template>
          </a-button>
          <template #content>
            <a-dgroup :title="$t('filelist.navbar.filter.sortBy')">
              <a-doption
                v-for="key in ['name', 'size', 'updatedAt']"
                :key="key"
                @click="sortBy = key"
              >
                {{ $t(`filelist.navbar.filter.${key}`) }}
                <icon-check v-if="sortBy === key" />
              </a-doption>
            </a-dgroup>
            <a-dgroup :title="$t('filelist.navbar.filter.orderBy')">
              <a-doption
                v-for="key in ['asc', 'desc']"
                :key="key"
                @click="orderBy = key"
              >
                {{ $t(`filelist.navbar.filter.${key}`) }}
                <icon-check v-if="orderBy === key" />
              </a-doption>
            </a-dgroup>
          </template>
        </a-dropdown>

        <a-tooltip :content="$t(`filelist.navbar.view.${currentView}`)">
          <a-button
            type="text"
            class="file-nav-btn"
            @click="currentView = next()"
          >
            <template #icon>
              <icon-list v-if="currentView === 'card'" />
              <icon-apps v-else-if="currentView === 'list'" />
            </template>
          </a-button>
        </a-tooltip>

        <a-col flex="auto">
          <a-input-search
            size="small"
            placeholder="在本文件夹下检索"
            @search="(v) => currentPath.push(v)"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { useRefHistory, useCycleList } from '@vueuse/core'
import { useFileList } from '../hooks/useFileList'

const { currentPath, fetchData, sortBy, orderBy, currentView } = useFileList()

const { history, undo, redo, canUndo, canRedo } = useRefHistory(currentPath, {
  capacity: 10,
  deep: true
})

const { next } = useCycleList(['list', 'card'], { initialValue: currentView })
</script>

<style lang="less" scoped>
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

.breadcrumb-item {
  cursor: pointer;
  user-select: none;
  &:hover {
    transition: color 0.1s linear;
    color: rgb(var(--arcoblue-5));
  }
}

:deep(.arco-input-search) {
  background-color: var(--color-menu-light-bg);
  border-color: var(--color-neutral-3);
}

:deep(.arco-input-focus) {
  background-color: var(--color-menu-light-bg);
  border-color: rgb(var(--arcoblue-5));
}
</style>
