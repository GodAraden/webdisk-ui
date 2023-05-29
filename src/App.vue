<template>
  <a-space id="space">
    <a-button type="primary">Primary</a-button>
    <a-button>Secondary</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="outline">Outline</a-button>
    <a-button type="text">Text</a-button>
    {{ msg }}
  </a-space>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const msg = ref('Null')

const init = async function () {
  const { data } = await axios.get('/api')
  msg.value = data.msg
}

init()
</script>

<style lang="less" scoped>
#space {
  margin: 10px;
}
</style>
