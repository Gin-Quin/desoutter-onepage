<script lang="ts">
	import _ from "src/i18n"
</script>

<section>
	<div class="grid">
		<div class="bg-gray-4">
			<div class="content">
				<div class="title">{$_("section.faq.aviation.title")}</div>
				<div class="description">{$_("section.faq.aviation.description")}</div>
			</div>
		</div>
		<div />
		<div class="bg-gray-3">
			<div class="content">
				<div class="title">{$_("section.faq.newEnergyVehicles.title")}</div>
				<div class="description">{$_("section.faq.newEnergyVehicles.description")}</div>
			</div>
		</div>
		<div class="bg-primary">
			<div class="content">
				<div class="title">{$_("section.faq.automotive.title")}</div>
				<div class="description">{$_("section.faq.automotive.description")}</div>
			</div>
		</div>
		<div />
		<div class="bg-primary">
			<div class="content">
				<div class="title">{$_("section.faq.aerospace.title")}</div>
				<div class="description">{$_("section.faq.aerospace.description")}</div>
			</div>
		</div>
		<div class="bg-dark span-2">
			<div class="content">
				<div class="title">{$_("section.faq.finalAutomotiveAssembly.title")}</div>
				<div class="description">{$_("section.faq.finalAutomotiveAssembly.description")}</div>
			</div>
		</div>
	</div>

	<div class="grid absolute">
		<div />
		<div class="small-grid-only" />
		<div class="span-2 bg-gray-3">
			<div class="content">
				<div class="title">{$_("section.faq.newEnergyVehicles.title")}</div>
				<div class="description">{$_("section.faq.newEnergyVehicles.description")}</div>
			</div>
		</div>
		<div />
		<div class="small-grid-only" />
		<div class="span-2 bg-primary">
			<div class="content">
				<div class="title">{$_("section.faq.aerospace.title")}</div>
				<div class="description">{$_("section.faq.aerospace.description")}</div>
			</div>
		</div>
	</div>
</section>

<style lang="sass">
	.small-grid-only
		display: none
	
	.title
		font-size: 3.5rem
		text-transform: uppercase
	
	.description
		font-size: 5rem
		font-weight: bold

	.content
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		padding: 12rem
		gap: 3rem

	section
		position: relative
		
		> .grid
			width: 100%
			grid-template-columns: repeat(4, 1fr)

			.span-2
				grid-column-end: span 2
				&:before
					padding-top: 50% !important

			> *
				cursor: pointer
				color: var(--white)
				position: relative
				&:before // trick to make height equal to width
					content: ""
					padding-top: 100%

			@media (max-width: 1000px)
				grid-template-columns: repeat(2, 1fr)

			@media (max-width: 500px)
				grid-template-columns: 1fr

				.small-grid-only
					display: flex

				.span-2
					grid-column-end: unset
					&:before
						padding-top: 100% !important

		
		> .grid.absolute
			> *
				opacity: 0
				transition: opacity 0.7s
				&:hover
					opacity: 1
</style>
