<template>
  <a-list
    :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
    :data="renderData"
    :bordered="false"
  >
    <template #item="{ item }">
      <a-card hoverable>
        <template #cover>
          <img
            :style="{ width: '100%', transform: 'translateY(-20px)' }"
            alt="dessert"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </template>
        <a-card-meta :title="item.name"> </a-card-meta>
      </a-card>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import { useFileList } from '../hooks/useFileList'

const { renderData } = useFileList()
</script>
