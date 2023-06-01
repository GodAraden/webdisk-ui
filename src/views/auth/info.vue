<template>
  <div class="login-bg">
    <div class="login-box m-auto p-8 rounded-xl shadow-xl ref-bgc">
      <a-typography-title :heading="4">
        <a-button
          type="text"
          shape="circle"
          class="text-btn"
          @click="$router.push('/file')"
        >
          <template #icon> <icon-left /> </template>
        </a-button>
        {{ $t('userinfo.title') }}
      </a-typography-title>
      <a-descriptions style="margin-top: 20px" size="large" :column="1">
        <a-descriptions-item
          v-for="item in listItems"
          :key="item.key"
          :label="$t(`userinfo.label.${item.key}`)"
        >
          <template v-if="UNFORMATTED_TIME.includes(item.key)">
            {{ new Date(item.value).toLocaleString() }}
          </template>
          <template v-else-if="ENABLE_EDIT.includes(item.key)">
            <a-input-search
              v-if="focusedItem === item.key"
              :style="{ width: '320px' }"
              size="small"
              :default-value="item.value"
              :button-text="$t('userinfo.value.save')"
              search-button
              @search="onUpdateData"
            />
            <template v-else>
              {{ item.value }}
              <a-link @click="focusedItem = item.key">
                {{ $t('userinfo.value.edit') }} <icon-edit />
              </a-link>
            </template>
          </template>
          <template v-else>
            {{ item.value }}
          </template>
        </a-descriptions-item>
      </a-descriptions>

      <a-row class="login-tool">
        <a-col flex="auto"> </a-col>
        <a-col flex="100px" class="flex justify-around">
          <a-button type="text" class="text-btn" @click="changeLocale">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
          <a-button type="text" class="text-btn" @click="changeTheme">
            <template #icon>
              <icon-sun />
            </template>
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { getUserInfo, updateUserInfo } from '@/api/user'
import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import { Message } from '@arco-design/web-vue'

interface ListItem {
  key: string
  value: string
}

const ENABLE_EDIT = ['username', 'password', 'email']
const UNFORMATTED_TIME = ['registerTime', 'loginTime']

const { t } = useI18n()
const { changeLocale } = useLocale()
const { changeTheme } = useTheme()

const userinfo = ref<User>()
const listItems = ref<ListItem[]>()
const focusedItem = ref<string>()

const formatData = (data: User) => {
  const formatedData: ListItem[] = []
  for (const [key, value] of Object.entries(data)) {
    formatedData.push({ key, value })
  }
  return formatedData
}

const onFetchData = async () => {
  const { data } = await getUserInfo()
  if (!data) return
  userinfo.value = data
  listItems.value = formatData(data)
}

const onUpdateData = async (newValue: string) => {
  if (newValue === userinfo.value[focusedItem.value]) {
    focusedItem.value = ''
    return
  }

  const { data, message } = await updateUserInfo({
    [focusedItem.value]: newValue
  })
  if (!data) return

  Message.success(t(`tips.userinfo.${message}`))

  userinfo.value = data
  listItems.value = formatData(data)
  focusedItem.value = ''
}

onFetchData()
</script>

<style lang="less">
.login-bg {
  width: 100vw;
  height: 100vh;
  background: url(/login-bg.svg);
}

.login-box {
  position: relative;
  top: 10%;
  height: 70%;
  width: 38.2%;
  .login-tool {
    position: absolute;
    width: calc(100% - 64px);
    bottom: 10px;
  }
}
</style>
