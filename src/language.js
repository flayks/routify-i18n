import { derived, writable } from 'svelte/store'

export const languages = {
    fr: {
        code: 'fr',
        full: 'fr-FR'
    },
    en: {
        code: 'en',
        full: 'en-US',
        default: true
    }
}
export const fallbackLanguage = Object.values(languages).find(lang => lang.default)


/*
** Get language
*/
export const getLanguage = (browserLang, langs, fallback) => {
    if (browserLang) {
        let language = browserLang.match(/[a-zA-Z\-]{2,10}/g)[0] || fallback.code
        language = language.split('-')[0]
        const matchedLang = Object.keys(langs).find(l => l === language)
        return matchedLang ? matchedLang : fallback
    } else {
        return fallback
    }
}

export const language = writable(languages[fallbackLanguage.code])
export const lang = derived(language, $store => $store.code)