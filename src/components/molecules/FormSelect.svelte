<script lang="ts">
	export let name!: string
	export let label = ""
	export let placeholder = ""
	export let value: unknown = null
</script>

<div class="form-input">
	<label for={name}>{label}</label>
	<select {name} bind:value>
		<option class="gray-2" value={null} disabled selected hidden>{placeholder}</option>
		<slot />
	</select>
</div>
