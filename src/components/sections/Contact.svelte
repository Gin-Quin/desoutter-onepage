<script lang="ts">
	import { _ } from "svelte-i18n"
	import FormInput from "molecules/FormInput.svelte"
	import FormSelect from "molecules/FormSelect.svelte"
	import FormTextArea from "molecules/FormTextArea.svelte"

	const label = (field: string) => $_(`section.contact.form.${field}.label`)
	const placeholder = (field: string) => $_(`section.contact.form.${field}.placeholder`)
</script>

<section class="row">
	<main>
		<div class="title">{$_("section.contact.title")}</div>
		<div class="subtitle">{$_("section.contact.subtitle")}</div>

		<form class="grid">
			<FormInput name="name" label={label("name")} placeholder={placeholder("name")} />
			<FormInput name="surname" label={label("surname")} placeholder={placeholder("surname")} />
			<FormInput name="email" label={label("email")} placeholder={placeholder("email")} />
			<FormSelect name="industry" label={label("industry")} placeholder={placeholder("industry")}>
				<option value="zabu">ZABU</option>
				<option value="COCO">COCO</option>
			</FormSelect>
			<FormInput name="country" label={label("country")} placeholder={placeholder("country")} />
			<FormTextArea name="message" label={label("message")} placeholder={placeholder("message")} />
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
		padding: 15vh 8vw
</style>
