import '../styles/Header.css' ;

export default function MainDefault() {
  return (
    <div className='body_container'>
      <h3>~~ Main 영역 ~~</h3>
      <div id='contents'>
        <img alt='MainImage' src='images/summersea.jpg' width={300} height={200} />
      </div>
    </div>
  ); //return
}