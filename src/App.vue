<template>
  <div>
    <img :src="imageUrl1" :alt="imageAlt" style="width: 60%; height: auto" /><br/>
    <img :src="imageUrl2" :alt="imageAlt" style="width: 60%; height: auto" /><br/>
    <button :disabled="isDisabled">버튼</button>
    <div :[attributeName]="value">동적 속성명</div>
    <!-- <div title='툴틱 테스트'></div>-->
     <div v-bind="objectOfAttrs">다중 속성 바인딩</div>
     <!-- <div id="container"class="wrapper"></div>-->
    <div>
      <h1>{{ message }}</h1> <!-- 보간법. 상태변수 message.value의 값을 가져옴 -->
      <button @click="count++">+</button>
      <button @click="count--">-</button>
      <div>{{ count }}</div>
    </div>

    <div>
      <form @submit.prevent="onSubmit">
        <input @keyup.enter="search" v-model="query" />
      </form>
    </div>
    <br/><br/>

    <div>
      <!-- 텍스트 입력 -->
      <input @keyup.enter="search" v-model="text" placeholder="텍스트 입력">
      <p>입력값 : {{ text }}</p>
      <input @keyup.enter="search" v-model.lazy.trim="lazyText" placeholder="텍스트 입력">
      <p>Lazy Text : {{ lazyText }}</p>
      <!-- 체크박스 -->
      <input type="checkbox" v-model="checked" id="checkbox" />
      <label for="checkbox">{{ checked }}</label>
      <br/><br/>
      <!-- 다중 체크박스 -->
      <div>
        <input type="checkbox" value="사과" v-model="fruits" id="apple" />
        <label for="apple">사과</label>
        <input type="checkbox" value="바나나" v-model="fruits" id="banana" />
        <label for="banana">바나나</label>
        <input type="checkbox" value="딸기" v-model="fruits" id="strowberry" />
        <label for="strowberry">딸기</label>
        <p>선택 : {{ fruits }}</p>
      </div>
      <br/><br/>
      <!-- radio 버튼 -->
      <input type="radio" value="남성" v-model="gender" />
      <label for="male">남성</label>
      <input type="radio" value="여성" v-model="gender" />
      <label for="female">여성</label>
      <p>성별 : {{ gender }}</p>
      <br/><br/>
      <!-- select 버튼 -->
      <select v-model="selected">
        <option disabled value="00" selected>선택하세요</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
      </select>
      <p>선택된 도시 : {{ selected }}</p>
      <br/><br/>
      <!-- v-if문 연습 -->
      <div>
        <p v-if="score >= 90">우수</p>
        <p v-else-if="score >= 70">양호</p>
        <p v-else-if="score >= 50">보통</p>
        <p v-else>미흡</p>
      </div>
      <br/><br/>
      <!-- v-show 연습 -->
      <div>
        <p v-show="isVisible">v-show는 CSS display로 제어</p>
        <button @click="isVisible = !isVisible">토글</button>
      </div>
      <br/><br/>
      <!-- v-for 연습 -->
      <div>
        <ul>
          <!-- item: 배열의 각 요소, index: 배열의 인덱스로 0부터 시작 -->
          <li v-for="(item, index) in items" :key="item.id">
            {{ index }} : {{ item.name }}
          </li>
        </ul>
        <ul>
          <li v-for="(value, key, index) in user" :key="key">
            {{ key }} : {{ value }}
          </li>
        </ul>
      </div>
      <br/><br/>
      <!-- Props 학습 -->
      <div>
        <h1>부모/자식간에 컴포넌트 호출</h1>
        <ChildComponent msg="부모가 자식한테 보내는 메세지" @send-message="handleMessage"/>
        <p>자식이 보낸 값: {{ childMessage }}</p>
      </div>
    </div>
    <br/><br/>
    <!-- reactiv 학습 -->
    <div>
      <p>이름 : {{ user1.name }}</p>
      <p>나이 : {{ user1.age }}</p>
      <p>취미 : {{ user1.hobbise }}</p>
      <button @click="updateUser">정보 업데이트</button>
    </div>
    <br/><br/>
    <!-- computed 학습 -->
    <input v-model="total"  /> = <input v-model="counter1" /> * <input v-model="price" />
    <br/><br/>
    <!-- watch 학습(얕은 감시 vs 깊은 감시) -->
    <div>
      <p>Count : {{ state.nested.count }}</p>
      <button @click="state.nested.count++">증가</button>
    </div>
    <br/><br/>
    <!-- Template Ref 학습 -->
    <div>
      <input ref="nameRef" v-model.trim.lazy="username" placeholder="이름을 입력하세요." />
      <button @click="registry">회원등록</button>
    </div>
    <br/><br/>
    <!-- pinia 학습 -->
    <div class="counter-bax">
      <h2>Pinia Counter</h2>
      <div class="value">
        <span>Count</span>
        <strong>{{ counter.count }}</strong>
      </div>
      <div class="value sub">
        <span>Double</span>
        <strong>{{ counter.doubleCount }}</strong>
      </div>
      <div class="buttons">
        <button @click="counter.increase()">+1 증가</button>
        <button @click="counter.increaseBy(3)">+3 증가</button>
      </div>
    </div>
    <br/><br/>
    <!-- Composable 학습 -->
    <div class="page">
      <button class="btn" @click="open">모달 열기</button>
      <ModalBox v-if="isOpen" @close="close">
        <h3>알림</h3>
        <p>Composable로 제어되는 모달</p>
        <button class="btn close" @click="close">닫기</button>
      </ModalBox>
    </div>
    <br/><br/>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, watch, watchEffect, onMounted } from 'vue'
  import imageFile2 from '@/assets/image2.jpg'
  import ChildComponent from './components/ChildComponent.vue';
  import { useCounterStore } from './stores/counter';
  import ModalBox from './components/ModalBox.vue';
  import { useModal } from '@/composables/useModal'

  // Template 문법 --> Directive
  // v-바인딩 연습
  const imageUrl1 = ref('/images/image1.jpg')
  const imageUrl2 = ref(imageFile2)
  const imageAlt = ref('이미지 설명')
  const value = ref('툴틱 테스트')
  const isDisabled = ref(false)
  const attributeName = ref('title')
  const objectOfAttrs = ref({
    id: 'container',
    class: 'wrapper'
  })

  // v-on 연습
  const message = ref("Hello Vue")
  const count = ref(0)
  const query = ref('')
  const onSubmit = () => {
    console.log('폼 제출')
  };
  /*
  const search = () => {
    console.log('동적 이벤트 발생')
  };
  */

  // v-model 학습
  // text 입력
  const text = ref('')
  const lazyText = ref('')
  
  const search = () => {
    console.log(`TEXT 값은 ${text.value} 입니다.`) // Template 출력
    console.log('TEXT 값은 ' + text.value + ' 입니다.')
  };
  // checkbox 학습
  const checked = ref(false)

  const fruits = ref([])
  console.log(`Fruits는 ${fruits.value} 입니다.`)

  // radio 버튼 학습
  const gender = ref('')

  // select 버튼 학습
  const selected = ref('')

  // v-if 학습
  const score = ref(0)

  // v-show 학습
  const isVisible = ref(true)

  // v-for 학습
  const items = ref([
    {id: 1, name: '사과'},
    {id: 2, name: '바나나'},
    {id: 3, name: '오렌지'}
  ])
  const user = ref({name: '홍길동', age: 30, city: '서울'})

  // props 학습
  const childMessage = ref('')
  const handleMessage = (recivedMessage) => {
    childMessage.value = recivedMessage
  }

  // reacticve 학습
  const user1 = reactive({
    name: '홍길도',
    age: 30,
    hobbise: ['독서','운동']
  })
  
  const updateUser = () => {
    user1.age++;
    user1.hobbise.push('여행'); // 배열 요소값 추가
  }

  // counter1, price의 상태가 변경되면 아래의 computed 함수가 작동
  const counter1 = ref(3)
  const price = ref(3)
  const total = computed(() => counter1.value * price.value)

  // watch 학습
  // count 상태 객체
  watch(count, (newValue, oldValue) => {
    console.log(`이전값 :${oldValue}, 현재값 : ${newValue}`)
  })

  // 얕은 감시(Shallow Watch) vs 깊은 감시(Deep Watch)
  const state = ref({
    nested: { count: 0 },
  })
  watch(state, (newValue) => {
    console.log('state 변경 감지')
  }, {deep: true})

  // watchEffect
  watchEffect(() => {
    console.log(`현재 count : ${count.value}`)
  })
  
  // Template Ref 학습
  const username = ref('')
  const nameRef = ref(null)
  const registry = () => {
    if (username.value === null || username.value === '') {
      nameRef.value.focus()
      alert('이름을 입력해주세요!')
      return
    }
  }

  // 초기 화면 로딩 시 실행
  // onMounted 학습
  onMounted(() => {
    nameRef.value.focus()
  })

  // Pinia 학습
  const counter = useCounterStore()

  // Composable 학습
  // 구조 분해 방식으로 값을 가져 옴
  const { isOpen, open, close } = useModal()

</script>

<style scoped>
  h1 {
  color: #42b983;
  }
  .counter-box {
    width: 260px;
    padding: 20px;
    border-radius: 12px;
    background: #f9fafb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    font-family: system-ui, sans-serif;
  }
  h2 {
    margin-bottom: 16px;
    font-size: 18px;
    text-align: center;
  }
  .value {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 15px;
  }
  .value strong {
    font-size: 18px;
  }
  .sub {
    color: #555;
  }
  .buttons {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  button {
    flex: 1;
    padding: 8px 0;
    border: none;
    border-radius: 8px;
    background: #4f46e5;
    color: white;
    cursor: pointer;
  }
  button:last-child {
    background: #22c55e;
  }
  button:hover {
    opacity: 0.9;
  }
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f5f9;
  }
  .btn {
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    background: #6366f1;
    color: white;
    cursor: pointer;
  }
  .close {
    margin-top: 12px;
    background: #ef4444;
  }
</style>
