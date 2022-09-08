import { useContext } from "react";
import { AppContext } from "../context";

const Favorites = () => {
    const { faveMeals, removeFromFave, openModal } = useContext(AppContext)
    if (faveMeals.length < 1) return null
    return (
        <div className="fave--container">
            <p className="fave--heading">Favorites</p>
            <div className="fave--meals">
                {faveMeals.map(meal => {
                    return <FaveDetails key={meal.idMeal} id={meal.idMeal} mealImg={meal.strMealThumb} removeFromFave={removeFromFave} mealId={meal.idMeal} openModal={openModal} />
                })}
            </div>
        </div >
    );
}

const FaveDetails = ({ mealImg, removeFromFave, mealId, openModal }) => {
    return (
        <div className="fave--meal">
            <div className="fave--img" onClick={() => openModal(mealId, true)}>
                <img src={mealImg} alt="fave meal img" />
            </div>
            <p className="fave--remove" onClick={() => removeFromFave(mealId)}>remove</p>
        </div>
    );
}

export default Favorites;