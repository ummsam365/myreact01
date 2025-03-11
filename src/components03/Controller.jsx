//** Controller
//=> 버튼이 6개 있는 컴포넌트
//  ( -1, -10, -100, +100, +10, +1)
//=> 부모 컴포넌트에 있는 count 의 값이 변경되도록함 

/* ** Ver01
//=> 함수도 Props 로 전달가능
//=> 상태값을 모두 Props 로 전달 :  {setCount, count}
//=> 각 버튼의 이벤트 핸들러를 작성
export default function Controller({setCount, count}) {
  return (
    <div>
        <button onClick={()=> { setCount(count-1) }}>-1</button>
        <button onClick={()=> { setCount(count-10) }}>-10</button>
        <button onClick={()=> { setCount(count-100) }}>-100</button>
        <button onClick={()=> { setCount(count+100) }}>+100</button>
        <button onClick={()=> { setCount(count+10) }}>+10</button>
        <button onClick={()=> { setCount(count+1) }}>+1</button>
    </div>
  );
}
*/
//** Ver02
//=> 하나의 이벤트 핸들러를 정의 활용
//=> 이 이벤트 핸들러는 Viewer 에도 결과가 전달되어야 하고,
//   부모에 정의 되어있는 상태변수를 사용하므로
//   부모 컴포넌트에 정의하고 내려받아 사용하는것이 편리함   
export default function Controller({onChangeCount}) {
  
  console.log(`** Controller Update !!! **`);
  return (
    <div>
        <button onClick={()=> { onChangeCount(-1) }}>-1</button>
        <button onClick={()=> { onChangeCount(-10) }}>-10</button>
        <button onClick={()=> { onChangeCount(-100) }}>-100</button>
        <button onClick={()=> { onChangeCount(100) }}>+100</button>
        <button onClick={()=> { onChangeCount(10) }}>+10</button>
        <button onClick={()=> { onChangeCount(1) }}>+1</button>
        {/* 
          <button onClick={onChangeCount}>+1</button>
          콜백함수 방식으로 정의하면 인자를 전달할수 없음 */}
    </div>
  );
}