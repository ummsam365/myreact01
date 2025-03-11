//** useRef_Reference Test 
// => DOM 요소를 직접 제어 할 수 있음. 
//    ( DOM 노드, 엘리먼트, 리액트 컴포넌트의 주소값 참조 가능
//      JS 비교 : document.getElementById('root')   ) 

// => useRef는 상태 값을 참조하되 그로인해 랜더링을 일으키지는 않게 하기 위해 사용하는 리액트훅
//  -> ref 는 랜더링 중 읽거나 쓰려고 할 경우 순수기능을 잃고 예상치 못한 결과를 낼 수도 있어서
//     event handler 에서 주로 사용함.
//  -> 입력폼 초기화, 포커스하기 등에 사용

// => current 속성을 가지고 있는 객체를 반환. 
//    인자로 넘어온 초깃값을  이 current 속성에 할당하며 이 속성은 값을 변경하여도
//    리액트 컴포넌트는 리랜더링 되지 않으며, 상태변수에도 영향을 주지않음
//    리액트 컴포넌트가 리랜더링 되는 경우도 이 속성의 값을 잃지 않음. 

// => 함수 컴포넌트에서는 Hooks (useEffect) 를 이용해서 처리가능
// => 실습순서 : 카운터 앱 만들기, useEffect Test

import './Body.css';
import {useState, useRef} from 'react';

export default function Body() {

  //** useRef 정의
  const textRef = useRef();
  //=> Ref 객체를 생성하고 textRef 에 저장
  //=> input Tag 에서 ref={textRef} 정의하면
  //   textRef 는 DOM 엘리먼트에 접근하도록 설정되고
  //   textRef 를 이용해서 DOM 엘리먼트 직접조작 가능함.
  //=> Ref 객체인 textRef의 current 속성에 DOM 주소가 전달됨
  //   그러므로 textRef.current.value 접근함 
  //   ( document.getElementById('...').value 접근과 동일 )
   
  const [text, setText] = useState('');
  const onChangeText = (e)=>{ setText(e.target.value) };
  
  const onClickBtn = ()=>{
      //=> Test1)
      //alert(`** 버튼클릭1: text=${text}`);
      //textRef.current.value='너무 어려워요 !!!!';
      //console.log(`** 버튼클릭 textRef 변경후 : text=${text}`)
      //=> 이 값은 DOM 엘리먼트에 직접 반영
      //   그래서 화면 출력은 되지만, 
      //   랜더링은 일어나지 않았고, 상태변수에도 영향을 주지않음
      //=> document.getElementById('...').value 접근과 동일

      //=> Test2) 포커스에 적용
      //  입력된 text 길이가 3미만 이면 포커스가 머문 상태로 입력을 기다리도록 
      if (text.length<3) {
        alert(`** 버튼클릭2: 새글자 이상 입력 하세요~~`);
        textRef.current.focus();
      }else {
        alert(`** 버튼클릭2: text=${text}`);
        textRef.current.value='';
        console.log(`** textRef_value_clear: text=${text}`);
      } 
  } //onClickBtn

  //** 컴포넌트 랜더링(Update) 확인
  console.log(`** 컴포넌트 Body Update !!! **`);

  return (
    <div className="body">
      <h2>** useRef_Reference Test **</h2>
      <input value={text} onChange={onChangeText} ref={textRef} />&nbsp;&nbsp;
      <button onClick={onClickBtn}>완료</button>
    </div> //className="body"
  ); //return
} //function