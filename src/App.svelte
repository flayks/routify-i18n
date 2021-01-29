<script context="module">
    import { get } from 'svelte/store'
    import { lang, language, fallbackLanguage, getLanguage, languages } from './language'

    // Define language from browser
    // if not matching, uses fallback
    const detectedLanguage = getLanguage(navigator.language || navigator.browserLanguage, languages, fallbackLanguage)

    const config = {
        urlTransform: {
            /**
            * external URL
            * if the selected language is not the default language,
            * we want to use the language as an URL prefix
            */
            apply: (url) => {
                const lang = get(language)
                const prefix = !lang.default ? `/${lang.code}` : ''
                return prefix + url
            },
            /**
            * internal URL
            * if the first url fragment matches a language,
            * we're gonna strip the fragment
            */
            remove: (url) => {
                const [, urlPrefix, ...rest] = url.split('/')
                const langFromPrefix = languages[urlPrefix]

                if (langFromPrefix) {
                    language.set(langFromPrefix)
                    const join = [, ...rest].join('/')
                    return join
                } else {
                    return url
                }
            }
        }
    }
</script>
<script>
    import { Router, goto, page } from '@roxi/routify'
    import { routes } from '../.routify/routes'

    // Redirect if browser language is not fallback
    language.subscribe(store => {
        if (detectedLanguage !== store.code) {
            console.log('should redirect:', { detectedLanguage, currentLang: store.code })
            // These 2 lines below causes Svelte Store subscribe api bug?
            language.set(languages[detectedLanguage])
            $goto($page.path)
        }
    })
</script>

<Router {routes} {config} />