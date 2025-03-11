//** State : 객체형 상태변수
//=> 여러개의 사용자 입력을 객체화 & 상태변수로 관리 
 
import {useState} from 'react';

export default function Body() {
  // ** 1) 개별적 관리
  /*
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [info, setInfo] = useState('');

  const nameChange = (e) => { setName(e.target.value) };
  const genderChange = (e) => { setGender(e.target.value) };
  const birthChange = (e) => { setBirth(e.target.value) };
  const infoChange = (e) => { setInfo(e.target.value) };

      <div>
        <input name='name' value={name} onChange={nameChange} placeholder='이름을 입력하세요' />
      </div>
      <div>
        <select name='gender' value={gender} onChange={genderChange}>
            <option>여성_F</option>
            <option>남성_M</option>
        </select>
      </div>
      <div>
        <input name='birth' type='date' value={birth} onChange={birthChange} />
      </div> 
      <div>
        <textarea name='info' value={info} onChange={infoChange} />
      </div>
  */
  // ** 2) 객체화 관리
  //=> State(상태) 변수를 객체형으로 생성
  //   이벤트 핸들러도 1개로 통일

  const [member, setMember] = useState({
    name:'', gender:'', birth:'', info:''
  });
  // => 상태변수로 정의된 객제 구조분해 적용 가능 
  let {name, gender, birth, info} = member;

  const memberChange = (e) => {
    console.log(`** memberChange: 수정대상 = ${e.target.name}`);
    console.log(`** memberChange: 수정 값 = ${e.target.value}`);
    setMember({
      ...member,
      [e.target.name]:e.target.value
    });
    //=> member 객체 속성 추가 확인
    //=>  [e.target.name]:e.target.value,
    //    test:'없는속성추가 Test'
    //console.log(`** member 객체 속성 추가 test=${member.test}`) ;
  };//memberChange

    /*  => 최초 member {name:'', gender:'', birth:'', info:'' }
        => 입력 member {name:'홍길동', gender:'M', birth:'2025-02-14', info:'안녕하세요~' }
        => 성별 변경 : {name:'홍길동', gender:'M', birth:'2025-02-14', info:'안녕하세요~' , gender:'new'}
    */
    // => setMember 에 새로운 객체 전달
    //    스프레드로 기존객체 member 값 나열
    //    객체 괄호표기법으로 name 속성을 key로 e.target.value 를 value 로 저장
    //    (객체 괄호표기법: 속성명을 괄호('[]')로 감싸서 표현
    
    // => { ...객체, 속성: 값 } 패턴의 동작 방식
    //    이 패턴은 객체를 업데이트할 때 기존 데이터를 유지하면서
    //   특정 속성만 변경하는 방법입니다.
  
  //=======================================================
  //** 컴포넌트 랜더링(Update) 확인
  //console.log(`** 컴포넌트 랜더링(Update) !!! **`);

  return (
    <div className="body">
      <h2>** Body: input 객체화 관리 **</h2>
      <div>
        <input name='name' value={name} onChange={memberChange} placeholder='이름을 입력하세요' />
      </div>
      <div>
        <select name='gender' value={gender} onChange={memberChange}>
            <option>여성_F</option>
            <option>남성_M</option>
        </select>
      </div>
      <div>
        <input name='birth' type='date' value={birth} onChange={memberChange} />
      </div> 
      <div>
        <textarea name='info' value={info} onChange={memberChange} />
      </div>
    </div>
  ); //return
} //function