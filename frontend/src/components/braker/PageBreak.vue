<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="text">
    {{msg}}
  </div>
</template>

<style scoped>
.text {
  z-index: 3;
  padding: 100px 20px;
  color: var(--vt-c-white-soft);
  line-height: 2;
  text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
