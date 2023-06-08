<template>
  <a-list :loading="loading" :bordered="false">
    <a-list-item v-for="item in renderData" :key="item.id">
      <a-list-item-meta
        :description="
          $t('sharelist.tab.send.includeFiles') +
          item.files.map((file) => file.name).join('，')
        "
        :title="
          $t('sharelist.tab.send.shareTo') +
            item.receiver.map((user) => user.username).join('，') ||
          $t('sharelist.tab.send.public')
        "
      >
        <template #avatar>
          <a-avatar shape="square">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </template>
      </a-list-item-meta>
      <template #actions>
        <a-tooltip :content="$t('sharelist.list.actions.copy')">
          <span v-if="copied">{{ $t('sharelist.list.actions.copied') }}</span>
          <a-button type="text" @click="() => copy(item.code)">
            <template #icon>
              <icon-copy />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="$t('sharelist.list.actions.update')">
          <a-button type="text">
            <template #icon>
              <icon-upload />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="$t('sharelist.list.actions.delete')">
          <a-button type="text" status="danger">
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-tooltip>
      </template>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { useShareList } from '../hooks/useShareList'

const { loading, renderData } = useShareList()
const { copy, copied } = useClipboard()
</script>
