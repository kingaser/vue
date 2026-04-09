<template>
	<div>
		<h1>자식 컴포넌트</h1>
		<p>{{ msg }}</p>
		<button @click="send">부모에게 값을 보내기</button>
	</div>
</template>

<script setup>
	defineProps({
		msg: {
			type: String, // 부모로부터 받는 데이터의 타입
			required: true, // 초기에는 에러가 남. 현재 버전은 에러는 안 나고 경고만 콘솔창에 표시
		}
	})

	const emit = defineEmits(['send-message'])
	const send = () => {
		emit('send-message', '자식이 부모한테 보내는 메세지입니다.')
	}
</script>