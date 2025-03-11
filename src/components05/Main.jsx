import { Routes, Route } from "react-router-dom";
import MainDefault from "./MainDefault";
import Login from './Login';
import Join from './Join';
import BList from "./BList";
import MList from "./MList";
import MyInfo from "./MyInfo";
import Post from "./Post";

import '../styles/Header.css' ;

export default function Main({onLoginSubmit}) {
  return (
    <div>
      <hr />
      <Routes>
        <Route path="/" element={<MainDefault />} />
        <Route path="/login" element={<Login onLoginSubmit={onLoginSubmit} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/boardList" element={<BList />} />
        <Route path="/boardList/post/:id" element={<Post />} />
        {/* 해민님 게시판 추가 */}
        <Route path="/memberList" element={<MList />} />
        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
    </div>
  ); //return
}