<template>
	<!-- self 이벤트 지시어 : overlay div를 클릭했을때만 이벤트가 실행 -->
	<div class="overlay" @click.self="emit('close')">
		<div class="modal">
			<!-- 부모가 넘겨준 내용을 그대로 받아서 보여줌 -->
			<slot />
		</div>
	</div>
</template>

<script setup>

	// 자식이 부모에게 요청
	const emit = defineEmits(['close'])
</script>

<style scoped>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal {
		background: white;
		padding: 24px;
		border-radius: 14px;
		min-width: 260px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}
</style>