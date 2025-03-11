// ** Nested Routing
// 1) 자식 page 1,2,3 추가 ( Topics01 ) 
// => App.js의 라우트 path "/topics/*" 로 수정

// 2) 배열로 목록 정의 ( Topics ) : ver02  
// 3) Topic 컴포넌트 추가 : ver02 

// ** useParams()
// => 현재 URL에 포함되어 있는 파라미터를  key, value 형식의 객체형식으로 반환
// => <Route path 속성에 ":?????" 로 정의된 파라미터 에 전달된 값을 객체에 담아 전달해주는 Hook.
//   예) path /test/3 으로 이동한 경우 params의 값 {id:'3'}을 확인할 수 있고
//      path /test/something 으로 이동한 경우 params의 값 {id:'something'} 확인가능
// => "/test/:id" 라는 라우트가 있다면 useParams 로 :id 파라미터를 가져올 수 있음 

import {NavLink, Routes, Route, useParams} from 'react-router-dom';


// ** ver02
//2.1) 메뉴 Link 목록을 배열로
const contents = [
  {id:'1', title:'Join', description:'~~ 회원가입 하시고 더 많은 혜택을 누리세요 ~~'},
  {id:'2', title:'Login', description:'~~ 로그인 성공 !! ~~ 환영합니다 ~~'},
  {id:'3', title:'Board', description:'~~ 게시판 입니다 ~~ 맘껏 작성하세요 ~~'},
  {id:'4', title:'MyInfo', description:'~~ 정보를 확인하세요 ~~'},
  {id:'5', title:'공지사항', description:'~~ 공지사항을 확인하세요 ~~'},
] 
//2.2) list 형식으로 정의 
//=> contents 에 map 적용 limap 구현

//2.3) Topic 컴포넌트 분리 
//  -> Parameter 필요함

function Topic() {
  // 1) Parameter 확인
  //=> useParams() 정의
  //  전달된 Parameter topic_id 와 값(문자형) 을 포함한 객체를 return
  //  { topic_id : '1' }

  //const params = useParams(); // params.topic_id
  const { topic_id } = useParams();
  console.log(`** topic_id=${topic_id}`);

  // 2) 배열(contents) 에서 id 값이 topic_id 와 일치하는 자료 찾기
  //=> filter 적용
  //  - 배열의 각 요소에 대해 제공된 callbackFn 함수를 한 번씩 호출하고, 
  //    callbackFn이 참 값을 반환하는 모든 값으로 새 배열을 구성
  //    테스트를 통과한 요소가 없으면 빈 배열이 반환됨.
  //  - topic_id 는 문자 Type 이므로 비교구문작성시 주의할것.

  // => find 적용 ( 현재코드에서는 filter 보다 효율적 )
  //  - callbackFn 이 참 값을 반환할 때까지 배열을 인덱스 오름차순으로 순회하며,
  //    반환값이 결정되면 순회를 중지하고 find() 는 해당 요소를 반환함.
  //    callbackFn 이 참 값을 반환하지 못하면 find() 는 undefined 를 반환함. 
  //  - undefined 는 정의되어있지 않음을 의미하므로
  //    if ( find_item == undefined ) 와 같은 구문은 성립될수없고 오류임 주의 

  const find_item = contents.find(({id}) => id===topic_id );
 
  //=> 초기값을 Not_Found 로 정의
  //   find_item 값이 있으면 selected_item 에 담아줌
  let selected_item = {
    title:'Sorry',
    description:'~~ Not Found ~~'
  }
  if ( find_item ) selected_item = find_item;
  const {title, description} = selected_item;
     
  return (
    <div>
      <p>{title} : {description}</p>
    </div>
  );
}//Topic

export default function Topics() {
  const limap = contents.map(({id, title}) =>  
      <li key={id}><NavLink to={'/topics/'+id}>{title}</NavLink></li>
   );//map

  console.log(`** Topics Update !!! **`);
  return (
    <div>
      <h3>** Topics ver02 **</h3>
      <ul>
        {/* map 적용 -> 2.2) list 형식으로 정의 */}
        {limap}
      </ul>
      {/* Router 에 적용 
        -> 현재 반 자동화
        <Route path='/1' element={'~~ 회원가입 하시고 더 많은 혜택을 누리세요 ~~'} />
        .....
        <Route path='/4' element={'~~ 로그인 후 이용하세요 ~~'} />

        -> 자동화
          - Route 도 동일한 구조 이므로 하나의 Route 로 처리
          - path 의 값(id) 만 전달받으면 해당하는 컨텐츠를 출력하도록 구현
          - id 에 해당하는 컨텐츠를 찾는 코드가 필요함 
          - 이역할을 하위 컴포넌트(Topic) 로 작성함.      
        -> path(1, 2, 3, 4) 의 변수화  
          - ":변수명" , 이것을 Parameter 라함
          - url 의 일부 와 Parameter 를 구별하기위해 앞쪽에 ":" 을 붙임 
          - 이 Parameter 의 값은 옆의 element 속성에 정의된 컴포넌트(Topic) 로 전달됨
          - 컴포넌트(Topic) 에서는 useParams() 를 통해 사용함.  
           */}
      <Routes>
        <Route path='/:topic_id' element={<Topic />} />
      </Routes>
    </div>  
  ); //return
} //Topics

//--------------------------------------------------------
function Topics01() {
  console.log(`** Topics Update !!! **`);
  return (
    <div>
      <h3>** Topics ver01 **</h3>
      <p>~~ 원하는 메뉴를 선택하세요 ~~</p>
      {/* 하위메뉴 추가 
        - /topics/join, /topics/login, /topics/board ..
        - url 설정, url과 view(컴포넌트) 연결 
        - 상위 컴포넌트에서 /topics/* (하위메뉴) 에 대한 Route 설정필요.
        */}
      <ul>
        <li><NavLink to='/topics/join'>회원가입</NavLink></li>
        <li><NavLink to='/topics/login'>로그인</NavLink></li>
        <li><NavLink to='/topics/board'>게시판</NavLink></li>
      </ul>
      <Routes>
        <Route path='/join' element={'~~ 회원가입 하시고 더 많은 혜택을 누리세요 ~~'} />
        <Route path='/login' element={'~~ 로그인 성공 !! ~~ 환영합니다 ~~'} />
        <Route path='/board' element={'~~ 게시판 입니다 ~~ 맘껏 작성하세요 ~~'} />
      </Routes>  
    </div>
  ); 
}