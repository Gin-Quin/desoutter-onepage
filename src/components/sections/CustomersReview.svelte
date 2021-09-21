<script lang="ts">
	import { json, _ } from "svelte-i18n"
	import ArrowRight from "icons/ArrowRight.svelte"
	import type { TranslationObject } from "locales/TranslationObject"

	type Customers = TranslationObject["section"]["customersReview"]["customers"]

	const customers = $json("section.customersReview.customers") as Customers
</script>

{#if customers?.length}
	<section class="white bg-gray-3">
		<div class="inner-section row">
			<aside>
				<div class="title">
					{$_("section.customersReview.title")}
				</div>
				<div class="description">
					{$_("section.customersReview.description")}
				</div>
			</aside>
			<main class="grow row wrap">
				{#each customers as customer}
					<a class="customer" target="_blank" href={customer.link}>
						<img src={`/images/customers/${customer.name}.png`} alt={customer.name} />
						<div class="layer bg-dark" />
						<div class="infos">
							<div class="company">{customer.company}</div>
							<div class="name">{customer.name}</div>
							<div class="role">{customer.role}</div>
						</div>
						<div class="link bg-primary center">
							<ArrowRight size="1.5em" />
						</div>
					</a>
				{/each}
			</main>
		</div>
	</section>
{/if}

<style lang="sass">
	section
		padding: 7% 0 10%

	.inner-section
		align-items: flex-start
		margin: auto
		width: 1200px
		max-width: 85%
		gap: 5rem
	
	aside
		width: 260px
		gap: 6rem
		flex-shrink: 0
	
	.title
		font-size: 9rem
		font-weight: bold
		line-height: 10rem

	.description
		line-height: 7rem

	main
		justify-content: center
		align-items: center
		gap: 3vw

	.customer
		position: relative
		height: 360px
		width: 360px
		max-width: 100vw
		cursor: pointer
		color: white

		> *
			position: absolute
			width: 100%
			height: 100%

		> .layer
			opacity: 0.75
			transition: opacity 0.4s
		
		> .link
			width: 70px
			height: 70px
			bottom: 0
			right: 0
			cursor: pointer
			z-index: 1

		> .infos
			z-index: 1
			padding: 7.5rem
			justify-content: flex-end
		
			> .company
				text-transform: uppercase
				font-size: 3.5rem
				margin-bottom: 2rem
			
			> .name
				font-size: 6rem
				font-weight: bold
			
			> .role
				font-size: 5rem

		&:hover > .layer
			opacity: 0.45

	@media (max-width: 760px)
		.inner-section
			flex-direction: column
			gap: 8rem

	@media (max-width: 460px)
		section
			padding: 12rem 0
		.inner-section
			flex-direction: column
			gap: 8rem
		
	@media (max-width: 360px)
		section
				padding-bottom: 0
		main
			gap: 0
</style>
