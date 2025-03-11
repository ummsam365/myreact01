
//** 컴포넌트 라이프 사이클과 useEffect훅
//=> 폴더 components03 사용
 
// ** 1. Counter App **************************************
// => 숫자 더하기, 빼기만 있는 초간단 앱

// ** 요구사항 분석
// => UI
//    -> 1 Page 에 Count 버튼이 있는 Controller 와 결과를 출력하는 Viewer 2개 영역 
//       즉, App.js 외에 Controller,  Viewer 2개의 컴포넌트로 구성
//    -> Controller : 6개의 버튼 ( -1, -10, -100, +100, +10, +1 )
//    -> css : 적절하게 중앙에 위치하도록 App.css 수정

// => 기능구현
//    -> State 이용
//    -> Controller 의 버튼을 클릭하면 State값 변경 -> Viewer에 전달되어 출력됨
//    -> State 정의 위치 비교
//       ( Controller,  Viewer 사이는 Props로 전달 불가, 그러므로 부모인 App 에 정의 )

// ** state 정의
// => Controller,  Viewer 모든 컴포넌트에서 필요하므로 부모에 정의
// => State Lifting (끌어올리기) : State 를 여러 컴포넌트에서 사용하도록 하기위해 부모에 정의하는것

// ** 결론 (React 앱의 특징)
// => State : 자식 컴포넌트와 데이터, 이벤트 공유를 통해 관리가능
// => 데이터 (Props) : 부모 -> 자식 (단방향 데이터 흐름)
// => 이벤트 (함수)  : 자식 -> 부모
// => 이러한 점을 고려해서 앱을 설계한다

// ** 이벤트핸들러
// => Data 의 한종류 이므로 자식 컴포넌트에 전달가능

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ** 2. 함수형 컴포넌트의 LifeCycle
// => 컴포넌트는 개념적으로 props를 input으로 하고
//    UI가 어떻게 보여야 하는지 정의하는 React Element를 output으로 하는 함수.
// => UI를 구성하기 위해서는 화면에 컴포넌트를 
//    그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 함. 
// => 컴포넌트는 이 과정에서 각 프로세스 진행단계별로 Lifecycle 함수로 불리는 특별한 함수가 실행됨.
//    개발자는 이를 재정의하여 컴포넌트를 제어할 수 있음. (클래스컴포넌트)

// => 랜더링의 의미
//  -> 리액트엘리먼트(Virtual DOM) 들을 HTML DOM(Real DOM) 으로 이동시켜 브러우져에 표시 되도록함.
//  -> 리액트엘리먼트 특징
//    - 자바스크립트 객체형식 
//    - 불변성: 엘리먼트 생성후에는 속성, 자식 등을 변경할수 없음
//    - 업데이트(리랜더링): new 엘리먼트를 생성하고 real DOM에 바꿔치기 하는것 

// => Mounting : 컴포넌트를 페이지에 처음 랜더링 할때
// => Updating : State, Props 값이 바뀌거나 부모컴포넌트가 리랜더 하면서 자신도 리랜더 될때
// => Unmounting : 컴포넌트가 페이지에서 제거될때 (더이상 랜더링하지않음)

// => 함수 컴포넌트에서는 useEffect 를 이용하여 제어함.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ** 3. useEffect
// => 어떤 값이 변경될때 마다 특정코드를 실행하는 리액트훅이며
//    이것을 "특정값을 검사한다" 라고도 표현함
// => 예를 들면 State 값이 바뀔때 마다 변경된 값을 콘솔에 출력하게 할 수 있음

// => 목적: side effect 를 수행하기위한 훅
//  -> side effect
//     사이드이펙트, 사전적 직역은 (예상치못한) 부작용 을 의미
//     대상의 옆에서 효과가 난다는 의미에서 나옴
//     개발시에는 의도치 않은 코드 실행으로 버그발생시 사이드이펙트가 발생했다고 함 
//     그러나 리액트에서는 effect(효과, 영향) 의 의미로 쓰이며
//     다른 컴포넌트에 영향을 줄 수 있으며, 랜더링 도중에는 작업이 완료될수 없기 때문에
//     랜더링 후에 실행되어야 하는 작업들을 의미함.
//     예를 들면 전역변수 수정, 서버에서 데이터를 받아오거나, 수동으로 DOM 조작,
//     타이머 설정 등의 작업을 말함.    

// => useEffect(callback_함수, [deps]_의존성 배열)
//    두번째 인자인 의존성 배열요소의 값이 변경되면 첫번째 인자인 콜백함수를 실행함   
//  -> 두번째 인자값 초기화 할때도 감지함
//  -> 두번째인자가 없는 useEffect : 조건값이 제시되지않았으므로 랜더링 할때마다 호출됨
//  -> 두번째인자가 빈배열 인경우 : 마운트 시점에만 콜백함수 실행, 그러므로 Mount 제어에 이용

// => 첫번째인자인 callback_함수의 주의사항
//  -> 전역변수 사용 불가능, 함수 내부에서 정의한 지역변수만 사용가능 
//  -> useState 와 useRef 로 정의한 변수는 접근 가능함 (아래 예제 참고)         

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ** Test
// => 1) State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
// => 2) State 변수 text 추가후 확인하기.
// => 3) 두번째인자가 없는 useEffect
// => 4) LifeCycle 제어1: Mount 제어
// => 5) LifeCycle 제어2: Update(리랜더링)시에만 호출하도록 변경
// => 6) LifeCycle 제어3: UnMount 제어
//    6.1) 클린업 이해 (setInterval 활용)
//    6.2) 클린업을 이용한 언마운트 제어하기


import Viewer from './components03/Viewer';
import Controller from './components03/Controller';
import Even from './components03/Even';

import { useEffect, useRef, useState } from 'react';
import './App.css'; 

function App() {
  //** 1. Data 전달(Props, event활용)
  //=> 함수도 Child 로 전달가능
  //   Child 에서 발생한 이벤트를 부모로전달가능함  
  const [count, setCount] = useState(0);

  //=> Controller Ver02 적용
  const onChangeCount = (num) => { setCount(count+num) }

  //** 2. text 추가후 랜더링 비교
  //=> Viewer,  Controller 와 무관한 상태변수
  //=> 결론: 부모에서 랜더링이 일어나면 자식도 무조건 랜더링됨.
  //=> 랜더링 관리가 필요함
  //   함수형 컴포넌트의 LifeCycle 관리가 필요하고, useEffect 로 가능
  const [text, setText] = useState('');
  const onChangeText = (e) => { setText(e.target.value) };

  //** 3. 컴포넌트 LifeCycle 과 useEffect
  /*3.1) 정의 Test, 상태변수 count 
  useEffect(()=>{ 
    console.log(`** useEffect 3.1) count=${count}, text=${text}`) 
  }, [count, text]);  
  */
  //3.2) 상태변수 text 추가후 비교
  //=> [count] : count 값 변화에만 반응
  //=> [text] : text 값 변화에만 반응
  //=> [count, text] : count, text값 변화에 모두 반응

  /*3.3) 두번째인자가 없는 useEffect
  //=> 조건없음: 랜더링 할때마다 호출
  useEffect(()=>{
    console.log(`** useEffect 3.3) count=${count}, text=${text}`);
  });
  */
  /*3.4) 두번째인자가 빈배열 (LifeCycle01, Mount 제어)
  //=> 첫 랜더링때만 호출 되므로 Mount 제어에 이용함.
  useEffect(()=>{
    console.log(`** useEffect 3.4) count=${count}, text=${text}`);
  }, []);
 
  //3.5) 리랜더링 시에만 호출 (LifeCycle02, Update 제어 )
  //=> "3.3) 랜더링 할때마다 호출" 에서  "3.4) 첫 랜더링때만 호출"
  //   의 경우를 제외시켜줌.
  //=> 최초 랜더링 인지를 확인 후 아닌경우에만 실행되도록 콜백함수작성 
  //=> 콜백함수에서
  //  -> 최초 랜더링(마운트) 시점 인지 판별하는 변수를 정의하고
  //     초기값을 false 로 지정, 이때 이 변수는 Ref 객체로 생성
  //     왜냐하면 랜더링할때마다 이 변수의 값이 초기화 되면 안되고, 
  //     이변수로 인해 랜더링이 일어나지 않도록 하기위함
  //  -> callback_함수에서는
  //     전역변수 사용 불가능, 함수 내부에서 정의한 지역변수만 사용가능하고, 
  //     useState 와 useRef 로 정의한 변수는 접근 가능함.
  //  -> 이렇게 Ref객체는 DOM요소 참조 뿐만아니라 컴포넌트의 변수로도 활용됨.
  const didMountRef = useRef(false);
  useEffect(()=>{
    if (!didMountRef.current)
      //=> didMountRef.current 값이 true 가 아니면
      //=> ref 객체는 current 속성으로 접근 (const didMountRef=true 이 아님에 주의)
      didMountRef.current=true;
    else {
      console.log(`** useEffect 3.5) 리랜더링 count=${count}, text=${text}`);
    }
  });
 
  //3.6) LifeCycle 제어3: UnMount 제어
  //3.6.1) 클린업 이해 (setInterval 활용)
  // => 클린업(CleanUp)
  //    특정함수가 실행되고 종료된 후 미처 정리하지못한 사항을 정리하는것
  // => 클린업 필요성 Test : useEffect (setInterval 사용하고 배열 없는) 추가
  // => 랜더링 할때마다 setInterval 을 포함한 콜백함수를 호출하도록 구현

  useEffect(()=>{
      setInterval(()=>{ console.log(`~~~ 깜빡 !!! ~~~`) }, 2000);
  }); //무조건 실행
    
  //=> 실행결과
  //  -> setInterval 의 콜백함수는 2초단위로 실행되어야 하지만, 점점 빨라짐
  //  -> 랜더링 할때마다 이전에 호출된 함수가 남아있는 상태에서 
  //     계속 호출되었기 때문에 복수의 setInterval 이 계속 생성되기 때문.
  //  -> 이를 방지하려면 새로운함수 호출전 사용을 마친 setInterval 은 종료시켜야함.  
  //  -> setInterval 의 종료함수는 clearInterval  
  //  -> 해결: useEffect 의 클린업 기능
  
  //=> 클린업 함수
  //  -> useEffect 의 콜백함수에서 return 하는 함수
  //  -> 컴포넌트를 언마운트 하기전 또는 콜백함수를 재호출하기전 실행됨.
  //  -> 그러므로 이를 이용하여 리랜더링 할때마다 새로운 setInterval 을 생성하고
  //     기존 setInterval 은 삭제할 수 있음.

  //=>클린업 함수로 setInterval 삭제 추가
  useEffect(()=>{
    const intervalID = setInterval(()=>{ console.log(`~~~ 깜빡 !!! ~~~`) }, 2000);
    return () => { 
        console.log(`** 클린업 함수 **`);
        clearInterval(intervalID);
     }
  }); //무조건 실행
  */
  //3.6.2) 클린업을 이용한 언마운트 제어하기
  // => count 값이 짝수면  
  //    "짝수 입니다" 를 출력하는 컴포넌트 (Even.jsx) 를 만든다.
  // => 이를 이용하여 조건부 랜더링 구현 
  //    ( import, <Even /> 랜더링코드 추가 )
  // => Even 에 useEffect 를 추가해서 "언마운트" 메시지 출력하기

   
  // *** App 랜더링 확인
  console.log(`** App Update !!! **`);
  return (
    <div className="App">
      <h3>** Simple Counter 와 함수컴포넌트의 LifeCycle **</h3>
      <section>
        <Viewer count={count} />
        {/* 3.6.2) Test 
            => count 값이 짝수일때만 Even 출력 */}
        {count%2===0 && <Even />}
        {/*  &&: 앞쪽의 조건식이 참이면 뒤쪽 리턴값을 랜더링 
                 (만약 거짓이면 아무것도 랭더링 하지않음)
             ||: 거짓이면 뒤쪽 리턴값을 랜더링   */}

        {/* => Ver01
            <Controller setCount={setCount} count={count}  /> */}
        <Controller onChangeCount={onChangeCount} />    
      </section>
      <section>
        <input value={text} onChange={onChangeText} />
      </section> 
    </div>
  );
}

export default App;