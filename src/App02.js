import MyHeader from './components/Header.jsx';
import MyFooter from './components/Footer.jsx';
import Body from './components02/Body.jsx';
 
//** 컴포넌트 기본사항
//=> 폴더 components02 사용
//=> Data 전달 
//=> 리액트 프로젝트의 취상위 컴포넌트는 항상 App 
//   App 이 최종으로 유일한 페이지인 index.html 로 전달&출력됨 
//   모든 자식컴포넌트로 props 를 이용해  Data 전달 가능함 

function App() {
  //** Data 정의 & 전달
  //=> 기본자료형 : Body 로
  //=> 객체 정의 : Header 로
  let test='Green Computer';   
  const bestDress = {  
    color: 'Blue',
    style: 'Long_Sleeveless',
    price: 9900,
    size: ['xs', 'small', 'medium', 'large', 'xl']
  } //bestDress

  return (
    <>
      {/* <MyHeader bestDress={bestDress} /> 
       => 펼침 연산자 적용   
            color: 'Blue',
            style: 'Long_Sleeveless',
            price: 9900,
            size: ['xs', 'small', 'medium', 'large', 'xl']
       */}
      <MyHeader {...bestDress} />
      <Body name={test} country={'대한민국'} />
          {/* => Body01 props Test */}
      <MyFooter />  
    </>
  );
}

export default App;
