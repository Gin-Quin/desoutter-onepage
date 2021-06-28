<script lang="ts">
	import { json, _ } from "svelte-i18n"
	import Send from "icons/Send.svelte"
	import FormInput from "molecules/FormInput.svelte"
	import FormSelect from "molecules/FormSelect.svelte"
	import FormTextArea from "molecules/FormTextArea.svelte"

	const label = (field: string) => $_(`section.contact.form.${field}.label`)
	const placeholder = (field: string) => $_(`section.contact.form.${field}.placeholder`)

	const industries = ($json(
		"section.contact.form.industry.items"
	) as string[]).map((value: string) => ({ value }))

	const countries = ($json(
		"section.contact.form.country.items"
	) as string[]).map((value: string) => ({ value }))
</script>

<section class="row">
	<main>
		<div class="title">{$_("section.contact.title")}</div>
		<div class="subtitle">{$_("section.contact.subtitle")}</div>

		<form>
			<div class="grid">
				<FormInput name="name" label={label("name")} placeholder={placeholder("name")} />
				<FormInput name="surname" label={label("surname")} placeholder={placeholder("surname")} />

				<div class="span-2">
					<FormInput name="email" label={label("email")} placeholder={placeholder("email")} />
				</div>

				<FormSelect
					name="industry"
					label={label("industry")}
					placeholder={placeholder("industry")}
					items={industries}
				/>
				<FormInput name="country" label={label("country")} placeholder={placeholder("country")} />

				<div class="span-2">
					<FormTextArea
						name="message"
						label={label("message")}
						placeholder={placeholder("message")}
					/>
				</div>
			</div>

			<div class="validation row">
				<p class="conditions">
					{$_("section.contact.conditionsOfUse")}
					<a href="/">{$_("section.contact.conditionsOfUseLink")}</a>
				</p>
				<button type="submit" class="bg-primary">
					{$_("section.contact.sendMessage")}
					<Send size="1.5em" />
				</button>
			</div>
		</form>
	</main>

	<img src="/images/ecosystem.png" alt="ecosystem" />
</section>

<style lang="sass">
	section
		min-height: 830px
		> *
			width: 50%
	
	main
		padding: 14vh 8vw

	.title
		font-size: 9rem
		font-weight: bold
		color: var(--black)
		margin-bottom: 2rem
	
	.subtitle
		font-size: 5rem
		color: var(--black)
		margin-bottom: 7rem

	form
		gap: 6rem

		> .grid
			grid-template-columns: repeat(2, 1fr)
			gap: inherit
			align-items: center

	.span-2
		grid-column: span 2
	
	.conditions
		font-size: 3.5rem
	
	button[type="submit"]
		justify-self: end

	.validation
		align-items: center
	
	@media (max-width: 1200px)
		.validation
			flex-direction: column
		.conditions
			text-align: center
		
	@media (max-width: 480px)
		form
			grid-template-columns: 1fr
		.span-2
			grid-column: unset
</style>
