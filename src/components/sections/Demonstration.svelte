<script lang="ts">
	import _ from "src/i18n"

	const objects: string[] = ["PLC", "MES", "Virtual cable", "Visiopositionning", "Sight remote HMI"]
	const objectName = (object: string) => $_(`section.demonstration.objects.${object}`)

	let currentObject = 0
</script>

<section id="demonstration" class="row">
	<main>
		<img src="/images/warehouse.png" alt="warehouse" />
	</main>
	<aside>
		<img class="stage" src="" alt="stage" />
		<div class="title">{$_("section.demonstration.title")}</div>
		<div class="subtitle">{objectName(objects[currentObject])}</div>
		<div class="description">{$_("section.demonstration.description")}</div>
		<div class="objects row wrap">
			{#each objects as object}
				<button
					class="tag object"
					class:active={objects.indexOf(object) == currentObject}
					on:click={() => (currentObject = objects.indexOf(object))}
				>
					{objectName(object)}
				</button>
			{/each}
		</div>
	</aside>
</section>

<style lang="sass">
	section
		height: 100vh
		background: var(--dark)
		justify-content: space-evenly
		place-items: center
		color: white
		> *
			width: 35%

	main
		border-radius: 100%
		overflow: hidden

	aside
		gap: 6rem
	
	.stage
		margin-bottom: -4rem

	.title
		font-weight: bold
		font-size: 9rem
		margin-bottom: -4rem
		// line-height: 1.4rem
	
	.subtitle
		font-size: 8rem
		margin-bottom: -2rem
	
	.objects
		gap: 2.5rem

	.object
		border: 1px solid
		border-radius: 12rem
		&.active
			background: var(--white)
			color: var(--dark)
</style>
