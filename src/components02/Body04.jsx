//** State 와 Props
// => State 도 값이므로 Props 로 전달 가능
// => Body 에 Child 컴포넌트 만들고 전달 Test
// => 전달된 부모 State 값이 변하면 Child 컴포넌트도 리랜더링 됨.
// => state 를 전달하지않은 경우와 비교
//    부모가 리랜더링 되면 Child 컴포넌트도 리랜더링됨 
 
import {useState} from 'react';

//** Child 컴포넌트 만들기
//=> 부모로부터 전달받은 값이 짝수 / 홀수 인지 출력
//=> 생태변수를 전달받는 Viewer01 과 일반변수를 전달받는 Viewer02 는
//   부모 컴포넌트가 리랜더링되면 모두 리랜더링 됨 을 Test. 
function Viewer01(props) {
  let { num } = props;
  console.log(`** Child Viewer01, Update!!! : 상태변수 num=${num}`);
  return (
    <>
    <p>~~ 여기는 Child_Viewer01 컴포넌트 ~~</p>
    <p><b>{num} 은 </b> { num%2===0 ? <b>짝수</b> : <b>홀수</b> }</p>
    </>
  );
} //Viewer01 

function Viewer02(props) {
  let { age } = props;
  console.log(`** Child Viewer02, Update!!! : 일반변수 age=${age}`);
  return (
    <>
    <p>~~ 여기는 Child_Viewer02 컴포넌트 ~~</p>
    <p><b>{age} 은 </b> { age%2===0 ? <b>짝수</b> : <b>홀수</b> }</p>
    </>
  );
} //Viewer02 

export default function Body() {
  //=> 상태변수
  const [num, setNum] = useState(0);
  const onIncrease = () => { setNum(num+1) };
  const onDecrease = () => { setNum(num-1) };
 
  //=> 일반변수 
  let age = 123;
   
  //** 컴포넌트 랜더링(Update) 확인
  console.log(`** 컴포넌트 Body Update !!! **`);

  return (
    <div className="body">
      <h2>** State & Props Test **</h2>
      <p>* State 변수: num={num}</p>
      <p>* Props 로 num 을 Child 컴포넌트로 전달</p>
      <Viewer01 num={num} />
      <div>
        <button onClick={onIncrease}>증가(+)</button>&nbsp;&nbsp;  
        <button onClick={onDecrease}>감소(-)</button>    
      </div> 
      <Viewer02 age={age} />
    </div> //className="body"
  ); //return
} //function