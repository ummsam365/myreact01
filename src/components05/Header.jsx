
import '../styles/Header.css';
import { NavLink, useNavigate } from "react-router-dom";

// ** Header
//=> 메뉴 : 로그인 상태에 따라서 해당하는 메뉴가 표시되도록
//=> 필요한 값: 로그인 상태값(isLogin), userName

export default function Header({isLogin,userName,userId,onLogout,onRequestPage}) {

  const navigate = useNavigate();

  return (
    <div className="headerTop">
      <h3> React Router Test </h3>
      <div className="headerLeft">
        <a href="https://www.naver.com/">Naver</a>&nbsp;&nbsp;
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="serviceTab">
        <ul className="serviceTabList">
          {/* JSX 에서는 if 사용불가 이므로 삼항식으로 구현함 */}
          { isLogin ? (<>
            {/* 로그인 후 : useNavigate() 활용 */}
              <li>{userId}, {userName} 님</li>
              <li><NavLink to='/' onClick={onLogout}>로그아웃</NavLink></li>

              <li><span onClick={()=>{ 
                  navigate('/myInfo', {state: {id:userId,
                                              userName:userName}})
                  }} className='textlink'>마이페이지</span></li>
                  {/* => useNavigate(), useLocation() Test 
                         쿼리 스트링과 비교 (MyInfo 에서 확인)   */}

              <li><span onClick={ ()=>{onRequestPage('/memberList')} } className='textlink'>회원목록</span></li> 
              <li><span onClick={ ()=>{onRequestPage('/boardList')} } className='textlink'>게시판</span></li>
            </>) : (<>
             {/* 로그인 전 */}
              <li><NavLink to='/login'>로그인</NavLink></li>
              <li><NavLink to='/join'>회원가입</NavLink></li>
              <li><NavLink to='/boardList'>게시판</NavLink></li> 
            </>) }
        </ul>
      </div>
      {/* serviceTab */}
    </div> //headerTop
  ); //return
}