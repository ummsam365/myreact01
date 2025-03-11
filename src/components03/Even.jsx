// ** 과제
//=> count 값이 짝수일떄만 호출되어서 출력후,
//  사라질때(언마운트될때) 콘솔 메시지 "Even 컴포넌트 언마운트 !!" 출력

import { useEffect } from "react";

export default function Even() {

  //=> 언마운트 제어 코드 작성 
  //=> useEffect 의 클린업 함수 활용
  //  -> useEffect의 콜백함수가 return 하는 함수
  //  -> 컴포넌트 언마운트직전 또는 콜백함수 재호출하기전 자동실행됨.
  useEffect(()=>{
    return () => { console.log(`** Even 컴포넌트 언마운트 **`); }
  },[]);
  //=> 두번째 인자는 [] 또는 없어도 됨
  //   count 값이 짝수 인 경우에만 호출(랜더링, 마운트)되기 때문.
  //   즉, 짝수/홀수 가 반복되면 마운트 언마운트를 반복하게됨.

  console.log(`** Even Update !!! **`);
  return (
    <div><h3>짝수 입니다.</h3></div>
  );
}