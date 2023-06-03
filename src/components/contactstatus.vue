<template>
  <a-typography-text v-if="status === 'pending'" type="primary">
    {{ $t('contactlist.operations.invitations.pending') }}
  </a-typography-text>
  <a-typography-text v-if="status === 'resolve'" type="success">
    {{ $t('contactlist.operations.invitations.resolved') }}
  </a-typography-text>
  <a-typography-text v-if="status === 'reject'" type="warning">
    {{ $t('contactlist.operations.invitations.rejected') }}
  </a-typography-text>
</template>

<script lang="ts" setup>
defineProps<{ status: 'pending' | 'resolve' | 'reject' }>()
</script>
