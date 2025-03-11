
// ** Image Test 

import { useLocation, useSearchParams } from 'react-router-dom';
import emotion1 from '../images/img/emotion1.png';
import emotion2 from '../images/img/emotion2.png';
import emotion3 from '../images/img/emotion3.png';
import emotion4 from '../images/img/emotion4.png';
import emotion5 from '../images/img/emotion5.png';

// ** useSearchParams 와 useLocation
// => useSearchParams()
//    url 에 있는 쿼리 스트링의 값을 꺼내어 사용할 수 있도록 해줌.
//      
// => useLocation()
//    현재 라우터의 위치를 나타내는 location 객체를 return
//    현재 위치에 관한 정보가 필요할떄 이용됨.
// => location 객체의 속성 : pathname, search(쿼리문자열), state 등

// 1) Emotion Data 배열
const emotionList = [
  { id: 1, name: "완전 좋음", img: emotion1, },
  { id: 2, name: "좋음", img: emotion2, },
  { id: 3, name: "그럭저럭", img: emotion3, },
  { id: 4, name: "나쁨", img: emotion4, },
  { id: 5, name: "끔찍함", img: emotion5, },
];

// 2) SelectEmotion 컴포넌트
//=> useSearchParams 와 useLocation Test
function SelectEmotion() {
  //2.1) useSearchParams()
  // => useState 처럼 배열형태로 반환
  // => 첫번째 요소: 조회, 수정가능한 메서드를 포함하고있는 쿼리스트링 객체
  // => 두번째 요소: 이 객체를 업데이트하는 함수 (즉, 새로운 쿼리스트링을 설정할수있음)  
  const [searhParams, setSearchParams] = useSearchParams();

  //=> 전달된 Parameter 확인
  console.log(`** 퀴리스트링 확인: id=${searhParams.get('id')}, name=${searhParams.get('name')}`);
  const searchId = searhParams.get('id');

  //=> useLocation
  const location = useLocation();
  console.log(`** useLocation: location=${location}`);
  console.log(`** useLocation: location.pathname=${location.pathname}`);
  console.log(`** useLocation: location.search=${location.search}`);

  //=> selected_item 기본값 Not_Found 로 정의
  let selected_item = {
    name:'~~ Sorry Not Found ~~',
    img: emotion5
  }
  //=> find Emotion Data
  //  - id 와 일치하는 Data 찾기 
  //  - id 의 존재여부 구별
  if ( parseInt(searchId)>0 ) {
    const find_item = emotionList.find(({id}) => parseInt(searchId)===id );
    if (find_item) selected_item = find_item;
  }else {
    selected_item.name=' 번호를 선택하지 않으셨습니다. ~~';
    selected_item.img=null;
  }

  return (
    <div>
      <h3>** {searhParams.get('name')}, 기분 {selected_item.name} **</h3>
      <img src={selected_item.img} />
      {/* 쿼리스트링으로 선택한 이미지가 출력됨 */}
    </div>
  );
}; //SelectEmotion

// ** 연습
// => 간단한 게시판 Data 를 배열로 구성하고,
// -> 전체 목록 (글번호, title, 글쓴이 id)
// -> 글번호 를 이용해서 글상세 내용 보기 

export default function Contact() {
  console.log(`** Contact Update !!!`);
  return (
    <div>
      <h3>** Contact, EmotionList & Image Test **</h3>
      {/* ** JSX 에서 image 경로설정 ** 
        1) img 폴더가 public 하위에 존재하는경우
        -> 리액트 프로젝트의 public 은 root 디렉토리이므로 간편한 지정가능
          <img alt="감정1" src="img/emotion1.png" width={100} height={100}/>

        2) img 폴더가 src 하위에 존재하는경우
        2.1) import (위 import 구문 참고, 감정2, 4, 5)
        2.2) require (감정3)
          -> 문서 어디서나 파일을 불러올 수 있으며 이를 사용하면
             inline으로 src의 이미지 파일 경로를 바로 지정할 수 있음
      */}
      <img alt="감정1_p" src="img/emotion1.png" width={100} height={100}/>
      <img alt="감정2_i" src={emotion2} width={100} height={100}/>
      <img alt="감정3_r" src={require('../images/img/emotion3.png')} width={100} height={100}/>
      <img alt="감정4_i" src={emotion4} width={100} height={100}/>  
      <img alt="감정5_i" src={emotion5} width={100} height={100}/>
      <p>~~ 당신의 이름과 기분상태를 주소창에 쿼리스트링으로 작성해 주세요 ~~</p>
      <p>예) http://localhost:3000/contact?id=1&name=홍길동</p>
      {/* 결과는 아래 컴포넌트로 출력 */}
      <SelectEmotion />
    </div>
  );
}