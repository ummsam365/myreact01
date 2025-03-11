import Ingredient from './Ingredient' ;

const IngredientsList = ({ingreList}) =>  
  <ul className="ingredients">
      { ingreList.map((ingre, i) => 
           <Ingredient key={i} {...ingre} />
      )}
  </ul> //IngredientsList_end
 
export default IngredientsList