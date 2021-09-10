<script lang="ts">
	import { fly } from "svelte/transition"
	import pyramidBlocks from "config/pyramidBlocks.json"

	export let index: number
	export let gap = 0
	export let transparent = false
</script>

<div
	class="pyramid-block"
	style="
		left: {pyramidBlocks[index].left}px;
		bottom: {pyramidBlocks[index].bottom + index * gap}px;
		opacity: {transparent ? 0.3 : 1}
	"
>
	<div class:shadow={index == 0}>
		{#if index == 0}
			<svg
				width="477"
				height="212"
				viewBox="0 0 477 212"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M422.636 51.7478L476.8 113.541L206.741 211.953L212.081 123.459L422.636 51.7478Z"
					fill="white"
				/>
				<path
					d="M52.6387 40.3044L0 101.335L206.74 211.952L212.081 123.458L52.6387 40.3044Z"
					fill="#F1F1F1"
				/>
				<path
					d="M212.081 123.458L52.6387 40.3045L237.256 0.634766L422.635 51.7477L212.081 123.458Z"
					fill="#939393"
				/>
			</svg>
		{:else if index == 1}
			<svg
				width="370"
				height="171"
				viewBox="0 0 370 171"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M311.14 36.3723L369.839 99.1407L159.327 170.639L166.193 82.908L311.14 36.3723Z"
					fill="#EAEAEA"
				/>
				<path
					d="M159.328 170.639L166.194 82.908L54.8133 29.5063L0 87.4617L159.328 170.639Z"
					fill="#BDBDBD"
				/>
				<path
					d="M166.193 82.9079L54.813 29.5063L183.74 0.516846L311.141 36.3722L166.193 82.9079Z"
					fill="#939393"
				/>
			</svg>
		{:else if index == 2}
			<svg
				width="256"
				height="130"
				viewBox="0 0 256 130"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M115.502 45.8103L52.9454 17.5837L0 76.7148L110.924 129.727L115.502 45.8103Z"
					fill="#A7A7A7"
				/>
				<path
					d="M196.366 21.3982L255.643 83.8522L110.924 129.727L115.501 45.8104L196.366 21.3982Z"
					fill="#CBCBCB"
				/>
				<path
					d="M115.501 45.8102L52.9453 17.5837L125.419 0.800293L196.367 21.3981L115.501 45.8102Z"
					fill="#939393"
				/>
			</svg>
		{:else if index == 3}
			<svg
				width="143"
				height="101"
				viewBox="0 0 143 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M0 72.6702L68.4311 0L62.3281 100.7L0 72.6702Z" fill="#B71726" />
				<path d="M142.745 76.5633L68.4312 0L62.3281 100.7L142.745 76.5633Z" fill="#E0091D" />
			</svg>
		{:else if index == 4}
			<svg
				width="477"
				height="361"
				viewBox="0 0 477 361"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M205.92 360.523L228.656 0L0 249.443L205.92 360.523Z" fill="#EAEAEA" />
				<path
					d="M228.657 0L476.8 262.435L205.921 360.523L222.818 100.277L228.657 0Z"
					fill="#F1F1F1"
				/>
			</svg>
		{/if}
	</div>
</div>

<style lang="sass">
	.pyramid-block
		position: absolute
		transition: 0.5s

	.shadow
		filter: drop-shadow(0 16rem 8rem rgba(0, 0, 0, 0.2))
</style>
