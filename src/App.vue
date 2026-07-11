<script setup lang="ts">
import { ref } from 'vue';
const navbarOpen = ref(false);
</script>

<template>
  <nav class="navbar px-4">
    <div class="navbar-brand is-flex is-align-items-center">
      <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <span class="mr-5 has-text-white ml-2">Simple Tools</span>

      <a role="button" class="navbar-burger" @click="navbarOpen = !navbarOpen;">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': navbarOpen }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="./" @click="navbarOpen = false;">Home</RouterLink>
        <RouterLink class="navbar-item" to="./about" @click="navbarOpen = false;">About</RouterLink>
        <RouterLink class="navbar-item" to="./scrape-site" @click="navbarOpen = false;">Scrape Sites</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-link" to="./" @click="navbarOpen = false;"><string>Learn more</string></RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="container py-6 px-5">
    <RouterView />
  </main>
</template>

<style scoped>
a:not(.button).router-link-active {
  border-bottom: 2px solid var(--bulma-info);
  color: var(--bulma-info);
}

.navbar {
  border-bottom: 1px solid var(--bulma-border);
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
