<script lang="ts">
	export let name!: string
	export let label = ""
	export let placeholder = ""
	export let value = ""
	export let rows = 6
</script>

<div class="form-input">
	<label for={name}>{label}</label>
	<textarea bind:value {name} {rows} {placeholder} />
</div>
