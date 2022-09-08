import { useContext } from "react";
import { AppContext } from "../context";

const Modal = () => {
    const { showModal, selectedMeal, closeModal } = useContext(AppContext)
    if (!showModal && !selectedMeal) return null
    return (
        <div className="overlay">
            <div className="modal--container">
                <div className="modal--img">
                    <img src={selectedMeal.strMealThumb} alt="meal img" />
                </div>
                <div className="modal--details">
                    <p className="modal--title">{selectedMeal.strMeal}</p>
                    <p className="modal--text">Cooking Instructions</p>
                    <p className="modal--text">{selectedMeal.strInstructions}</p>
                    <a className="modal--link" href={selectedMeal.strSource}>Original Source</a>
                    <button className="close--modal" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;