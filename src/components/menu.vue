<template>
  <a-menu :default-selected-keys="['FileList']">
    <a-menu-item
      v-for="item in sortedAppRoutes"
      :key="(item.name as string)"
      @click="$router.push(item.path)"
    >
      <template #icon>
        <icon-font :type="(item.meta.icon as string)" />
      </template>
      {{ $t(item.meta.locale as string) }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
import { Icon } from '@arco-design/web-vue'
import { appRoutes } from '@/router/routes'
import { useUserStore } from '@/store'

const { userInfo } = useUserStore()

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_4096434_zt5nsqfg8h7.js'
})

function sortRoutes(appRoutes: RouteRecordRaw[]) {
  const res: RouteRecordRaw[] = []
  for (const route of appRoutes) {
    const copyedRoute = Object.assign({}, route)
    if (copyedRoute.meta.hideChildrenInMenu) {
      delete copyedRoute.children
    } else {
      if (copyedRoute.children) {
        copyedRoute.children = sortRoutes(route.children)
      }
    }

    // 当前登录的用户权限不在此路由许可的范围内
    if (
      Array.isArray(copyedRoute.meta?.roles) &&
      !copyedRoute.meta?.roles.includes(userInfo.role)
    ) {
      continue
    }

    res.push(copyedRoute)
  }
  return res.sort(
    (a, b) => ((a.meta.order || 0) as number) - ((b.meta.order || 0) as number)
  )
}

const sortedAppRoutes = sortRoutes(appRoutes)

console.log(appRoutes, sortedAppRoutes)
</script>
