import { data as recipes } from './recipeData.js'
import Recipe from './Recipe02.jsx';  //Recipe.jsx 또는 Recipe02.jsx

//=> 화살표 함수 로 컴포넌트 작성
//  { }, return 생략

//=> export default const Main...
//   const 앞에 export default 는 허용하지 않음
export const Main = () => 
  <article>
    <header>
      <h1>** 맛있는 조리법 **</h1>
    </header>
    <div className="recipes">
      {recipes.map((recipe, i) => 
        <Recipe key={i} {...recipe} />
          // ...recipe : 펼침연산자
          // name:recipe.name, ingredients:recipe.ingredients, steps:recipe.steps
      )}
    </div>
  </article> //Main_end
 
//export default Main;