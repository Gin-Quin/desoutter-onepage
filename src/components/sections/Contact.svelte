<script lang="ts">
	import { _ } from "svelte-i18n"
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
		background: var(--dark)
		color: var(--gray)
		justify-content: center
		align-items: center
		> *
			width: 50%
	
	main
		padding: 12vh 8vw

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
		color: var(--gray) !important

	:global(.marketoForm .mktoFormCol)
		margin: 0 !important

	:global(.marketoForm input), :global(.marketoForm select), :global(.marketoForm textarea)
		background: var(--dark)
		color: var(--gray)
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
	
	:global(.marketoForm .mktoButtonWrap)
		display: flex
		flex-direction: column
		align-items: flex-end
		margin: 0 !important

	:global(.marketoForm button)
		background: var(--gray-3) !important
		border: none !important
		padding: 4rem 5rem !important
		color: white !important
		font-size: 4rem !important
		display: flex !important
		flex-direction: row
		gap: 3rem

	:global(.marketoForm button:after)
		content: "\e163"
		font-family: "Material Icons"
		font-size: 5rem

	@media (max-width: 1100px)
		#contact > img
			display: none
</style>
