
//** Page Routing02
//=> 폴더 components05 사용
//-------------------------------------------------------

// ** 관련 훅(HOOKs) 과 추가사항
// => useParams(), path 에 :id 사용 -> 예제: pages/Topics
// => useSearchParams() -> 예제: pages/Contact
//    url 에 있는 쿼리 스트링의 값을 꺼내어 사용할 수 있도록 해줌.
//   ( 예. login?id=banana&password=12345! )

// => useLocation() -> 예제: pages/Contact
//    현재 라우터의 위치를 나타내는 location 객체를 return
//    현재 위치에 관한 정보가 필요할떄 이용됨.
// => location 객체의 속성
//    -> pathname : 현재 주소 경로
//    -> search : ?를 포함한 쿼리스트링
//    -> state : 페이지로 이동시 임의로 넣을 수 있는 상태 값
//    -> key : location 객체의 고유 값, 초기값은 default, 페이지가 변경될때 마다 고유의 값이 생성됨.
//    -> hash : 주소의 #문자열 뒤의 값

// => useNavigate() 
//    -> 프로그래밍 방식으로 라우팅을 제어 (=코드로 조작)
//    -> Link 컴포넌트를 사용하지 않고 다른 페이지로 이동을 해야 하는 경우
//       뒤로가기 등에 사용하는 Hook.
//    -> replace 옵션 
//      - useNavigate 로 해당 페이지에 진입 후 다시 뒤로 가기가 안 되는 경우
//        replace 옵션으로 가능
//      - navigate('/testPage', { replace:true })
/*
=> useNavigate()  사용예
  return (
    <>
      <h3>{productId}번 상품 페이지 입니다.</h3>
      <ul>
        <li><button onClick={() => navigate(-2)}>Go 2 pages back</button></li>
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
        <li><button onClick={() => navigate(1)}>Go forward</button></li>
        <li><button onClick={() => navigate(2)}>Go 2 pages forward</button></li>
        <li><button onClick={() => navigate('/')}>Go Root</button></li>
        <li><button onClick={() => navigate('/', {replace: true})}>Go Root</button></li>
      </ul>
    </>
  );
*/
// ====================================================== 
 
import './App.css'; 
import  Main from './components05/Main';
import  Header from './components05/Header';
import  Footer from './components05/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  //** useNavigate() 활용
  //=> 코드로 라우팅 제어 (Page 이동)
  //=> 정의 & 사용 
  //  - useNavigate() 로 navigate 함수 취득후 적용
  //    navigate('path_url')
  const navigate = useNavigate();

  //=> navigate 로 Page 이동을 처리하는 함수
  //   하위 컴포넌트들이 필요시 사용하도록 함
  const onRequestPage = (url) => { navigate(url); }

   
  //1. 로그인 확인

  //=> 브라우져의 Session_Storage 사용
  //  -> 보관 
  //      - JS 객체 -> JSON 포맷으로 
  //      - JSON.stringify() -> 객체를 String Type으로 펼쳐놓음
  //     {id:"banana", userName:"홍길동"} -> {"id":"banana","userName":"홍길동"}
  //  -> get
  //      - JSON 포맷 -> JS 객체
  //      - JSON.parse()

  //=> 로그인 상태를 관리하는 불리언 변수정의 (isLogin, 상태변수)
  const [isLogin, setIsLogin] = useState(false);
  //=> 로그인 정보를 관리하는 객체형 상태변수
  const [loginInfo, setLoginInfo] = useState({id:'', userName:''});

  //=> 로그인 정보 확인 (브라우져의 Session_Storage 에서)
  if ( !isLogin ) {
    const loginCheck = JSON.parse(sessionStorage.getItem('loginInfo'));
    if ( loginCheck!=null ) {
      alert(`** ${loginCheck.userName} 님 로그인 확인 **`);
      setIsLogin(true);
      setLoginInfo(loginCheck);
    }
  }//!isLogin

  //2. 로그인
  //=> Login form 에서 id, password 입력
  //=> 회원DB 에 존재하는지 확인
  //=> 존재 -> 성공 -> 기본회원 정보를 보관
  //   아니면 -> 실패
  //=> 함수로 정의 (onSubmit 버튼 클릭시 실행되는 이벤트 핸들러)
  //=> 최상위 컴포넌트인 App 에 정의 

  //2.1) 로그인 함수 (이벤트 핸들러)
  const onLoginSubmit = (userId, userName) => {
    //=> 전달된 Data 를 길이로 확인하고,
    //    sessionStorage 에 저장 
    const loginData = {id:userId, userName:userName};
    if ( userId!=null && userId.length>3) {
      // -> userId 는 4글자이상 으로
      sessionStorage.setItem('loginInfo', JSON.stringify(loginData));
      alert(`** ${userId} 님 로그인 성공 **`);
      setIsLogin(true);
      setLoginInfo(loginData);
      //=> Home 으로 이동 
      navigate('/');
    } else {
      alert(`~~ userId 와 userName 을 정확하게 입력하세요 ~~`);
      setIsLogin(false);
      setLoginInfo('');
      //=> 로그인 폼, 재로그인 유도
      navigate('/login')
    }
  }; //onLoginSubmit

  //3. 로그아웃
  //=> 스토리지의 로그인 정보 삭제 -> clear()
  const onLogout = () => {
      sessionStorage.clear()
      setIsLogin(false);
      setLoginInfo('');
      //navigate('/'); 
      //=> Header 컴포넌트에서 <NavLink to='/'... 
      //   를 사용했으므로 필요없음 
  }; //onLogout

  // *** App 랜더링 확인
  console.log(`** App Update !!! **`);
  return (
    <div className="App">
      <Header isLogin={isLogin} userName={loginInfo.userName} userId={loginInfo.id} 
              onRequestPage={onRequestPage} onLogout={onLogout} />
      <Main onLoginSubmit={onLoginSubmit} />
      <Footer />
    </div>
  );
}

export default App;