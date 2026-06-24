<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { docsPages } from '../content/docs'
import { quickStartUrl, repoUrl, withBase } from '../content/site'

const props = defineProps({
  slug: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const activeAnchor = ref('')

const currentPage = computed(
  () => docsPages.find(page => page.slug === props.slug) || docsPages[0]
)

const tocItems = computed(() =>
  currentPage.value.sections.map(section => ({
    id: section.id,
    title: section.title
  }))
)

const setHash = id => {
  if (typeof window === 'undefined') {
    return
  }

  window.history.replaceState(null, '', `${window.location.pathname}#${id}`)
}

const scrollToAnchor = async id => {
  await nextTick()

  const element = document.getElementById(id)

  if (!element) {
    return
  }

  const top = element.getBoundingClientRect().top + window.scrollY - 42
  window.scrollTo({ top, behavior: 'smooth' })
  activeAnchor.value = id
  setHash(id)
}

const syncActiveAnchor = () => {
  if (typeof window === 'undefined' || tocItems.value.length === 0) {
    return
  }

  const offset = 100
  let current = tocItems.value[0].id

  tocItems.value.forEach(item => {
    const element = document.getElementById(item.id)

    if (element && window.scrollY + offset >= element.offsetTop) {
      current = item.id
    }
  })

  activeAnchor.value = current
}

watch(
  () => route.fullPath,
  async () => {
    await nextTick()

    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    const hashExists = tocItems.value.some(item => item.id === hash)

    if (hash && hashExists) {
      scrollToAnchor(hash)
      return
    }

    activeAnchor.value = tocItems.value[0]?.id || ''
    window.scrollTo({ top: 0, behavior: 'auto' })
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', syncActiveAnchor, { passive: true })
  window.addEventListener('resize', syncActiveAnchor)
})

onUnmounted(() => {
  window.removeEventListener('scroll', syncActiveAnchor)
  window.removeEventListener('resize', syncActiveAnchor)
})
</script>

<template>
  <main class="docs-main">
    <div class="docs-article">
      <header class="docs-hero">
        <h1>{{ currentPage.title }}</h1>
        <p>{{ currentPage.intro }}</p>

        <div class="docs-meta-links">
          <a :href="repoUrl" target="_blank" rel="noreferrer">Repository</a>
          <a :href="quickStartUrl" target="_blank" rel="noreferrer">Quick Start</a>
          <a :href="withBase('download')">Download Page</a>
        </div>
      </header>

      <p
        v-for="paragraph in currentPage.paragraphs || []"
        :key="paragraph"
        class="docs-opening-paragraph"
      >
        {{ paragraph }}
      </p>

      <ul v-if="currentPage.bullets?.length" class="docs-list docs-list--opening">
        <li v-for="bullet in currentPage.bullets" :key="bullet">{{ bullet }}</li>
      </ul>

      <div v-if="currentPage.references?.length" class="docs-reference-row">
        <a
          v-for="reference in currentPage.references"
          :key="reference.href"
          class="docs-reference"
          :href="reference.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ reference.label }}
        </a>
      </div>

      <section
        v-for="section in currentPage.sections"
        :key="section.id"
        :id="section.id"
        class="docs-section"
      >
        <h2>{{ section.title }}</h2>

        <p v-for="paragraph in section.paragraphs || []" :key="paragraph">
          {{ paragraph }}
        </p>

        <ul v-if="section.bullets?.length" class="docs-list">
          <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
        </ul>

        <pre v-if="section.code" class="docs-code"><code>{{ section.code }}</code></pre>
      </section>
    </div>

    <aside class="docs-toc">
      <div class="docs-panel docs-panel--toc">
        <div class="docs-panel-header">
          <strong>On this page</strong>
          <span>Anchor navigation</span>
        </div>

        <div v-if="tocItems.length" class="docs-toc-list">
          <button
            v-for="item in tocItems"
            :key="item.id"
            class="docs-toc-link"
            :class="{ 'is-active': activeAnchor === item.id }"
            type="button"
            @click="scrollToAnchor(item.id)"
          >
            {{ item.title }}
          </button>
        </div>
      </div>
    </aside>
  </main>
</template>
