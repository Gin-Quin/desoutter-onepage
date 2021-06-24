<script lang="ts">
	type Type = "text" | "email" | "number" | "checkbox" | "password" | "file" | "radio" | "range"

	export let name!: string
	export let type: Type = "text"
	export let label = ""
	export let placeholder = ""
	export let value = ""
</script>

<div class="form-input">
	<label for={name}>{label}</label>

	{#if type == "text"}
		<input type="text" {name} bind:value {placeholder} />
	{:else if type == "email"}
		<input type="email" {name} bind:value {placeholder} />
	{:else if type == "number"}
		<input type="number" {name} bind:value {placeholder} />
	{:else if type == "checkbox"}
		<input type="checkbox" {name} bind:value {placeholder} />
	{:else if type == "password"}
		<input type="password" {name} bind:value {placeholder} />
	{:else if type == "file"}
		<input type="file" {name} bind:value {placeholder} />
	{:else if type == "radio"}
		<input type="radio" {name} bind:value {placeholder} />
	{:else if type == "range"}
		<input type="range" {name} bind:value {placeholder} />
	{/if}
</div>
