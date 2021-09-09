<script lang="ts">
	export let step = 0
</script>

<div class="stages">
	<main>
		{#each stages as { description, title }, index}
			{#if index == currentStage - 1}
				<div
					class="stage"
					in:fly={{ y: -200, duration: transitionDuration }}
					out:fly={{ y: -400, duration: transitionDuration }}
				>
					<div
						class="index"
						in:fly={{ y: -200, duration: transitionDuration }}
						out:fly={{ y: -400, duration: transitionDuration }}
					>
						{index + 1}
					</div>
					<div class="title bold">{title}</div>
					<p>{description}</p>
				</div>
			{/if}
		{/each}
	</main>
	<aside>
		<div class="pyramid" class:fusion={currentStage == fusionStage}>
			<div class="blocks">
				{#each pyramidBlocks as { left, bottom }, index}
					{#if index < currentStage}
						<div
							class="pyramid-block"
							style={`left: ${left}px; bottom: ${bottom + index * pyramidGap}px;`}
						>
							<div
								class:shadow={index == 0}
								transition:fly={{ y: -80, duration: transitionDuration }}
							>
								<PyramidBlock {index} />
							</div>
						</div>
					{/if}
				{/each}
			</div>

			{#if currentStage == fusionStage}
				<div class="pyramid-block shadow" style={`left: 0; bottom: 0;`}>
					<img
						in:fade={{ delay: 400 }}
						out:fade
						src={`/images/pyramid/6.svg`}
						alt="pyramid-final"
					/>
				</div>
			{/if}
		</div>
	</aside>
</div>
