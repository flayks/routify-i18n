<script>
    import { metatags } from '@roxi/routify'
    import { language, lang } from '../language'

    metatags.title = 'Routify i18n'
</script>

<h1>Language detection</h1>
<pre>
    {JSON.stringify($language, null, 4)}
</pre>
<pre>
    {JSON.stringify($lang, null, 4)}
</pre>