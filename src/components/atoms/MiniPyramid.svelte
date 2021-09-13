<script lang="ts">
	export let step = 0
	export let size = 40

	const rightColor = (floor: number, step: number) => (floor == step ? "#E0091D" : "white")
	const leftColor = (floor: number, step: number) => (floor == step ? "#B71726" : "#F1F1F1")
	const lidColor = (floor: number, step: number) => (floor == step ? "#8A0E19" : "#939393")

	$: console.log(`step`, step)
</script>

<svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
	<!-- Shadow -->
	<path
		d="M17.8312 35.0143L4.1333 27.9184L19.994 24.5332L35.9202 28.8949L17.8312 35.0143Z"
		fill="black"
		fill-opacity="0.15"
	/>

	<!-- First floor -->
	<path
		d="M32.3334 22.333L35.9201 26.4357L17.9 32.9997L18.2667 27.0997L32.3334 22.333Z"
		fill={rightColor(0, step)}
	/>
	<path
		d="M7.6333 21.5664L4.1333 25.6221L17.9 32.9997L18.2666 27.0997L7.6333 21.5664Z"
		fill={leftColor(0, step)}
	/>
	<path
		d="M18.2665 27.1002L7.63318 21.5669L19.9502 18.9092L32.3332 22.3335L18.2665 27.1002Z"
		fill={lidColor(0, step)}
	/>

	<!-- Second floor -->
	<path
		d="M28.3667 16.833L32.3334 20.9997L18.2667 25.7663L18.6667 19.8997L28.3667 16.833Z"
		fill={rightColor(1, step)}
	/>
	<path
		d="M18.2666 25.7668L18.6666 19.9001L11.2923 16.3672L7.6333 20.2334L18.2666 25.7668Z"
		fill={leftColor(1, step)}
	/>
	<path
		d="M18.6667 19.9001L11.2924 16.3672L19.8875 14.4346L28.3667 16.8334L18.6667 19.9001Z"
		fill={lidColor(1, step)}
	/>

	<!-- Third floor -->
	<path
		d="M24.4001 11.3672L28.3667 15.5005L18.6667 18.5672L19.0001 13.0005L24.4001 11.3672Z"
		fill={rightColor(2, step)}
	/>
	<path
		d="M19 13.0006L14.8333 11.1006L11.3 15.0339L18.6667 18.5673L19 13.0006Z"
		fill={leftColor(2, step)}
	/>
	<path
		d="M18.9999 13.0006L14.8332 11.1006L19.676 9.9873L24.3999 11.3673L18.9999 13.0006Z"
		fill={lidColor(2, step)}
	/>

	<!-- Fourt floor -->
	<path d="M24.4 10.0336L19.4239 4.93359L19 11.6669L24.4 10.0336Z" fill={rightColor(3, step)} />
	<path
		d="M14.8333 9.76693L19.4239 4.93359L19 11.6669L14.8333 9.76693Z"
		fill={leftColor(3, step)}
	/>
</svg>

<style lang="sass">
	path
		transition: 250ms
</style>
