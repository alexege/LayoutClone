<script setup>
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePostStore } from '../stores/post'

  const { posts, loading, error } = storeToRefs(usePostStore())
  const { fetchPosts } = usePostStore()

  fetchPosts()
</script>

<template>
  <main>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <div v-for="(post, idx) in posts" :key="post.id" class="post">
      <span>{{ idx + 1 }}</span>:
      <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
      <p>{{ post.body }}</p>
    </div>
  </main>
</template>

<style scoped>
.post {
  padding: 1em;
  margin: 10px;
  background-color:black;
  color: lime;
  outline: 1px solid lime;
}
</style>