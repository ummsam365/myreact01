// ** 리액트 훅 (HOOK)
// => 클래스 컴포넌트가 가지고 있던 유용한 기능을 
//    함수컴포넌트에서도 사용가능하도록 개발하여 제공하는 기능들
//    use~~ 로 명명됨 (useEffect, useContext, useReducer, useCallBack, useMemo 등)
//    HOOK(갈고리) : 클래스 기능을 낚아채듯 가져와 사용한다는데서 유래..
// => HOOK 사용규칙
//  -> 리액트의 함수 컴포넌트 또는 커스텀훅 에서만 호출가능
//  -> 리액트 함수 컴포넌트의 최상위 레벨에서만 호출 가능 
//    ( 반복문, 조건문 중첩된 함수내에서는 호출할수 없음을 의미함 )
// => 커스텀 훅 (Custom HOOK)
//    여러 컴포넌트에서 반복적으로 사용되는 로직을 훅으로 만들어서 재사용할 수 있음

// ** State
// => 값을 저장하거나 변경 할 수 있는 객체로 이벤트와 함께 주로 사용됨.
//    - 즉, 버튼 클릭시 버튼의 컬러를 변경할때 등에 사용됨 
//    - 이벤트 발생 -> 이로인하여 화면의 리랜더링이 필요한 경우 리랜더링이 자동으로실행될 수 있도록 해줌
//      -> State변수 로 지정된 변수의 값에 변화가 일어나면 리액트 에서는 리랜더링 해줌  
// => useState 생성자함수로 State 생성
//    const [text_State변수, setText_set함수] = useState("State변수 의 초기값");
// => useState 를 호출하면 현재상태값과 이 State변수의 값을 변경하는 set함수를 담은 배열을 return.
// => 이후 State변수 값이 변하면 이를 반영하기위해 컴포넌트를 리랜더링 함.
//    ( 이것을 컴포넌트의 Update 라함 )

// ** State 로 사용자 입력 관리하기
// => 사용자가 Text 를 입력할때마다 console 출력하기 
// => 과제 "-" 버튼 만들기
//    - 최소값은 0 : alert 경고창 출력   
//    - 최대값은 100 : alert 경고창 출력, 0 으로 초기화

import {useState} from 'react';

export default function Body() {
  // *** useState() 활용
  //1) 정의 & 출력 
  // 1.1) 일반변수
  // => 값이 변경되어도 화면에는 변화 없음 (console 에는 반영됨) 
  //let count=0;  

  // 1.2) 상태변수
  //=> 상태변수의 값은 두번째요소인 set함수로 해야함
  const [count, setCount] = useState(0);

  const onIncrease = () => {
    //count++; 
    //-> 상태변수는 직접변경불가 set함수로만 가능
    setCount(count+1); // count=count+1 과 동일
    console.log(`** onIncrease, count=${count}`);
  } 

  const onDecrease = () => {
    //count--;
    setCount(count-1);
    console.log(`** onDecrease, count=${count}`);
  } 

//=======================================================
// 2) state(상태)변수 로  랜더링 제어 
// => 일반변수 check 를 추가하고 1씩 증가 시키면서, 5회 증가하면
//    setCount(count+5) 호출 , 리랜더링 하도록 수정
//   ( 즉, 5번 증가하면 랜더링 하도록 함.)
// => 이벤트를 호출하고 변수값이 변경되어도 state 변수값이 변경되지않으면,
//    랜더링 되지않음을 Test 해본다. 
// => 랜더링이 일어나면 컴포넌트 함수를 재호출 하는것이므로
//    모든 지역 변수들은 초기화 됨.
let check=0;
const onIncrease2 = () => {
  check++;
  console.log(`** onIncrease2 check=${check}, count=${count}`);
  if ( check%5==0 ) {
    //=> 랜더링이 일어나도록함
    // -> setCount(check) 호출하는 순간 랜더링이 일어나고,
    //    그것은 컴포넌트 함수를 재호출 한다는 의미.
    //    그러므로 모든 컴포넌트 함수내의 지역변수는 초기화 됨 
    //    그러나 상태변수는 값을 유지함
    console.log(`** onIncrease2 if setCount전 check=${check}`);
    //setCount(check); -> check가 0 값으로 초기화 되고 담겨지므로 count값도 0
    setCount(count+5);
    console.log(`** onIncrease2 if setCount후 count=${count}`);
  } //if
} //onIncrease2

const onDecrease2 = () => {
  check--;
  console.log(`** onDecrease2 check=${check}, count=${count}`);
  if ( check%5==0 ) {
    //=> 랜더링이 일어나도록함
    setCount(count-5);
    console.log(`** onDecrease2 setCount 후 count=${count}`);
  } //if
} //onDecrease2
//=======================================================
// ** 다양한 input Tag
//=> input type text, textarea 등.. : value 속성값으로 입력값 전달 
//=> 상태변수와 이벤트핸들러가 필요함
const [text, setText] = useState('input initValue Test');
const textChange = (e) => {
      setText(e.target.value); 
      // text=e.target.value; => 불허함 (오류) 
} //textChange

//=> date 
//  date 엘리먼트의 입력값을 console 출력하세요 ~~   
const [date, setDate] = useState('');
const dateChange = (e) => {
      setDate(e.target.value);
      console.log(`** dateChange, e.target.value=${e.target.value}`); 
}

//=> select
// -> html 과 차이점
//    selected 속성 대신 value를 사용해 기본값 할당. (아래코드에서는 칼국수)
//    선택된 option 값을 가져오려면, onChange를 사용해야하며,
//    option 의 컨텐츠가 select 의 value 에 전달됨.
//    ( select Tag 에 value 속성을 정의하지 않아도 전달됨 )
const [option, setOption] = useState('칼국수');
const menuChange = (e) => {
      setOption(e.target.value);
      console.log(`** menuChange, e.target.value=${e.target.value}`); 
} 

//=======================================================
  //** 컴포넌트 랜더링(Update) 확인
  //console.log(`** 컴포넌트 랜더링(Update) !!! **`);

  return (
    <div className="body">
      <h2>** Body: State Test **</h2>
      <p>1. count</p>
      <button onClick={onIncrease2}>+(증가)</button>&nbsp;&nbsp;
      <span>count={count}</span>&nbsp;&nbsp;
      <button onClick={onDecrease2}>-(감소)</button>
      <br></br>
      <p>2. input</p>
      {/* <input /><span>가나다라</span> 
        => 비교구문
          - text 라는 변수의 영향을 받지 않는 코드이므로 입력값이 표시됨  */}
      <input value={text} onChange={textChange} />&nbsp;&nbsp;<span>{text}</span>
      {/* => 키보드 입력해도 화면에 표시되지않음   
          => 키보드 누를때마다 text변수값을 변경시켜야 되고(이벤트코드필요)
              출력되려면 랜더링이 일어나야함(상태변수 필요) */}
      <br></br>       
      <input type='date' value={date} onChange={dateChange} />
      &nbsp;&nbsp;
      <select value={option} onChange={menuChange}>
        <option>짜장면</option>
        <option>짬뽕</option>
        <option>칼국수</option>
        <option>돈카츠라멘</option>
        <option>까르보나라</option>
      </select>     

    </div>
  ); //return
} //function