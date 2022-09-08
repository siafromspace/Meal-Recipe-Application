import { useContext } from "react";
import { AppContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs"


const Meals = () => {
    const { meals, isLoading } = useContext(AppContext)

    if (isLoading) {
        return (
            <div className="section">
                <p>Loading...</p>
            </div>
        )
    }

    if (meals === null) {
        return (
            <div className="section">
                <p>No Meals Matched Your Search Term. Please Try Again.</p>
            </div>
        )
    }

    return (
        <div className="meals--container">
            {meals.map(meal => {
                return <MealDetails mealName={meal.strMeal} mealImg={meal.strMealThumb} mealId={meal.idMeal} key={meal.idMeal} />
            })}
        </div>
    );
}

const MealDetails = ({ mealName, mealImg, mealId }) => {
    const { addToFave, openModal } = useContext(AppContext)
    return (
        <div className="meal--info">
            <div className="meal--img" onClick={() => openModal(mealId)}>
                <img src={mealImg} alt="meal thumbnail" />
            </div>
            <div className="meal--name">
                <p>{mealName}</p>
                <p className="fave--btn" onClick={() => addToFave(mealId)}><BsHandThumbsUp /></p>
            </div>
        </div>
    );
}

export default Meals;