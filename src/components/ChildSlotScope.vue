<template>
  <slot :text="message" :count="count" />
</template>

<script setup>
  const message = "자식 데이터"
  const count = 1
</script>