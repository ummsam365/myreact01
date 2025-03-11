import { useParams } from "react-router-dom";

//=> 해민님 게시판 : 상세글 Component

export default function Post() {
  const { id } = useParams();
  console.log(`게시글 ${id}번의 상세조회 입니다.`);

  const post = JSON.parse(localStorage.getItem(id));
  console.log(post);
  return (
    <>
      <h1>게시글 상세 조회 입니다.</h1>
      <div className="textContainer">
        <h2>제목 : {post != null ? post.title : "없는 게시물 입니다."}</h2>
        <p>내용 : {post != null ? post.content : "-------------------"}</p>
      </div>
    </>
  );
} //Post
