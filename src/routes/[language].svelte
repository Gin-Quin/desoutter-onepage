<script context="module" lang="ts">
	export async function load({ page }: any) {
		const { language } = page.params
		return { props: { language } }
	}
</script>

<script lang="ts">
	import { init } from "svelte-i18n"
	import Index from "./index.svelte"

	export let language: string

	init({
		fallbackLocale: "en",
		initialLocale: language,
	})
</script>

<Index />
