<template>
  <div id="app">
    <login/>
    <displayPosts/>
    <post/>
  </div>
</template>

<script>
import displayPosts from './components/displayPosts.vue'
import login from './components/login.vue'
import post from './components/post.vue'

export default {
  name: 'app',
  components: {
    displayPosts,
    login,
    post
  }
}
</script>

<style>

</style>
