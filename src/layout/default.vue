<template>
  <a-space>
    <p>这是默认布局</p>
    <router-link to="/file">file</router-link>
    <router-link to="/contact">contact</router-link>
    <router-link to="/shared">shared</router-link>
    <router-link to="/transport">tarnsport</router-link>
  </a-space>
  <hr />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup></script>
