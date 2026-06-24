<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { docsPageUrl, faviconUrl, navPages, repoUrl } from './content/site'
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="OpenGMS-Jupyter-Agent">
        <span class="brand-mark" aria-hidden="true">
          <img class="brand-icon" :src="faviconUrl" alt="">
        </span>
        <span class="brand-copy">
          <strong>OpenGMS-Jupyter-Agent</strong>
          <span>AI sidebar</span>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary">
        <RouterLink
          v-for="item in navPages"
          :key="item.to"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <a
            :href="href"
            class="nav-link"
            :class="{ 'is-active': isExactActive }"
            @click="navigate"
          >
            {{ item.label }}
          </a>
        </RouterLink>

        <a class="nav-link" :href="docsPageUrl">Docs</a>
      </nav>

      <div class="header-actions">
        <a class="ghost-button" :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>
        <RouterLink class="primary-button" to="/download">Download</RouterLink>
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>
