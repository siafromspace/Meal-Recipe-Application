import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [faveMeals, setFaveMeals] = useState(() => {
        let data = localStorage.getItem('faveMeals')
        return data ? JSON.parse(data) : []
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)

    const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

    const getMeals = (url) => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource')
                } return res.json()
            })
            .then(data => {
                setMeals(data.meals)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                console.log(err.message)
                setError(err.message)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        getMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    const getRandomMeal = () => {
        getMeals(randomMealUrl)
    }
    const addToFave = (id) => {
        let faveMeal = meals.find(meal => meal.idMeal === id)
        let alreadyFave = faveMeals.find(meal => meal.idMeal === id)
        if (alreadyFave) return
        setFaveMeals(prevState => {
            return [...prevState, faveMeal]
        })

    }

    const removeFromFave = (id) => {
        setFaveMeals(faveMeals.filter(meal => meal.idMeal !== id))

    }
    useEffect(() => {
        localStorage.setItem('faveMeals', JSON.stringify(faveMeals))
    }, [faveMeals])
    const openModal = (id, faveMeal) => {
        let meal
        if (faveMeal) {
            meal = faveMeals.find(meal => meal.idMeal === id)
        }
        else {
            meal = meals.find(meal => meal.idMeal === id)
        }
        console.log(meals)
        setSelectedMeal(meal)
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
        setSelectedMeal(null)

    }
    useEffect(() => {
        getMeals(allMealsUrl)
    }, [])

    return (
        <AppContext.Provider value={{ meals, isLoading, error, searchTerm, setSearchTerm, getRandomMeal, addToFave, faveMeals, removeFromFave, openModal, showModal, closeModal, selectedMeal }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;