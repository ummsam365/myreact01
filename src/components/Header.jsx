// ** 컴포넌트
//=> 1 컴포넌트 1화일
//=> 그러므로 export default 를 주로 사용

// ** export default
// => '해당 모듈엔 개체가 하나만 있다’는 사실을 명확히 나타낼 수 있음
// => 모듈은 크게 두 종류로 나눔
//  -> 복수의 변수, 함수가 있는 라이브러리 형태의 모듈
//  -> 개체 하나만 선언되어있는 전용모듈

//=> 부모로부터 객체 전달받기
//  -> 1) props : props={ 'bestDress': bestDress }
/*
export default function Header(props) {
  return (
    <header>
      <h2>** Header **</h2>
      <b>~~ 금주의 BestDress ~~</b><br></br>
      color={props.bestDress.color}, style={props.bestDress.style}, price={props.bestDress.price}<br></br>
      size 는 {props.bestDress.size.length} 종류가 있습니다.
      <hr></hr>
    </header>      
  );
}; 

//  -> 2) bestDress
// bestDress 구조분해 이전 과 비교
// color={bestDress.color}, style={bestDress.style}, price={bestDress.price}  
export default function Header({bestDress}) {
  // ** bestDress 구조분해 추가
  const {color, style, price, size} = bestDress; 
  return (
    <header>
      <h2>** Header **</h2>
      <b>~~ 금주의 BestDress ~~</b><br></br>
      color={color}, style={style}, price={price}<br></br>
      size 는 {size.length} 종류가 있습니다.
      <hr></hr>
    </header>      
  );
}; 
*/
//  -> 3) 펼침 연산자 적용
// => 객체를 펼침으로 보냈으므로 
/*    props = { 
              color: 'Blue',
              style: 'Long_Sleeveless',
              price: 9900,
              size: ['xs', 'small', 'medium', 'large', 'xl']   
      } 
      function Header(props) {
      ....props.color, props.style 등 props 로 접근 
      }       
      */
export default function Header({color, style, price, size}) {
  return (
    <header>
      <h2>** Header **</h2>
      <b>~~ 금주의 BestDress ~~</b><br></br>
      color={color}, style={style}, price={price}<br></br>
      size 는 {size.length} 종류가 있습니다.
      <hr></hr>
    </header>      
  );
};
