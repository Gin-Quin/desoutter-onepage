<script lang="ts">
	import { onMount } from "svelte"

	import { _ } from "svelte-i18n"

	onMount(() => {
		// const { MktoForms2 } = window as any
		// console.log(`MktoForms2`, MktoForms2)
		// MktoForms2.whenReady((form: any) => {
		// 	console.log("MktoForms2 ready")
		// 	form.onSuccess((values: any, followUpUrl: any) => {
		// 		console.log("Form success")
		// 		// form.getFormElem().hide()
		// 		// $("#successMessageBlock").show()
		// 		// $("#thank-you-placeholder").html($("#thank-you-message").html())
		// 		return false
		// 	})
		// })
	})
</script>

<section id="contact" class="row">
	<main>
		<div class="title">{$_("section.contact.title")}</div>
		<div class="subtitle">{$_("section.contact.subtitle")}</div>

		<form id="mktoForm_6513" class="marketoForm" />
		<script>
			MktoForms2.loadForm("//app-lon03.marketo.com", "744-YWX-674", 6513)
		</script>
	</main>

	<img src="/images/ecosystem.jpg" alt="ecosystem" />
</section>

<style lang="sass">
	#contact
		min-height: 830px
		background: var(--gray)
		justify-content: center
		z-index: 100
		font-family: Montserrat
	
	main
		padding: 12vh 8vw
		flex: 1 0 640px

	.title
		font-size: 9rem
		font-weight: bold
		margin-bottom: 2rem
	
	.subtitle
		font-size: 5rem
		margin-bottom: 7rem

	.marketoForm
		width: 100% !important
		gap: 4rem

	:global(.marketoForm .mktoFormRow)
		// color: var(--gray) !important

	:global(.marketoForm .mktoFormCol)
		margin: 0 !important

	:global(.marketoForm input), :global(.marketoForm select), :global(.marketoForm textarea)
		// background: var(--dark)
		// color: var(--gray)
		// height: 40px
		padding: 6px 10px !important
		width: 100% !important

	:global(.marketoForm textarea)
		height: 25rem !important

	:global(.marketoForm .mktoGutter), :global(.marketoForm .mktoOffset)
		display: none

	:global(.marketoForm .mktoFieldWrap)
		display: flex
		flex-direction: column
		align-items: flex-start

	:global(.marketoForm label)
		padding: 0 !important
		margin-bottom: 3px !important
		font-weight: normal !important
		width: auto !important
		position: relative
		line-height: 1.4 !important

	:global(.marketoForm .mktoAsterix)
		position: absolute
		right: -8px
	
	:global(.marketoForm .mktoHtmlText)
		display: block
		text-align: center
		width: 100% !important
	
	:global(.marketoForm a)
		font-size: inherit !important
	
	:global(.marketoForm .mktoButtonWrap)
		display: flex
		flex-direction: column
		align-items: center
		margin: 0 !important

	:global(.marketoForm button)
		background: var(--primary) !important
		border-color: transparent !important
		padding: 4rem 5rem !important
		color: white !important
		font-size: 4rem !important
		display: flex !important
		flex-direction: row
		gap: 3rem
		font-family: Montserrat

	:global(.marketoForm button:focus-visible)
		border-color: var(--black) !important

	:global(.marketoForm button:after)
		content: "\e163"
		font-family: "Material Icons"
		font-size: 5rem

	:global(#thank-you-message)
		display: none

	@media (max-width: 1280px)
		#contact
			> img
				display: none
			> main
				width: min(640px, 100%)
				flex-grow: 0
</style>
