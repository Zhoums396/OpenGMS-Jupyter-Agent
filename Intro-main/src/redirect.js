export const consumeRedirectPath = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect')

  if (!redirect) {
    return ''
  }

  params.delete('redirect')

  const cleanSearch = params.toString()
  const cleanUrl = `${window.location.pathname}${cleanSearch ? `?${cleanSearch}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', cleanUrl)

  return redirect
}

export const redirectDocsRequestFromMainApp = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const basePath = new URL(import.meta.env.BASE_URL, window.location.origin).pathname
  const relativePath = window.location.pathname.startsWith(basePath)
    ? `/${window.location.pathname.slice(basePath.length)}`
    : window.location.pathname

  if (!relativePath.startsWith('/docs')) {
    return false
  }

  const redirectPath = `${relativePath}${window.location.search}${window.location.hash}`
  window.location.replace(`${basePath}docs/?redirect=${encodeURIComponent(redirectPath)}`)
  return true
}
