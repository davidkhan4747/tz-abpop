import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'

const Main = createContext()

export const useMain = () => {
    return useContext(Main)
}

const MainContext = ({
    children
}) => {
    // получаем все данные жителей
    const [people_data , setPeople_data] = useState()
    const getAllPeople = () => {
        axios.get('http://localhost:3009/people_data').then((res)=>{
            setPeople_data(res.data)
        })
    }
    // Функция для поиска количества жителей в каждом году
    function findPopulationByYear(residents) {
        // Обект для хранения количества жителей в каждом году
        const yearCounts = {};

        // Проходимся по каждому жителю
        residents?.forEach(resident => {
            const birthYear = resident.birth_year;
            const deathYear = resident.death_year === "None" ? new Date().getFullYear() : resident.death_year;

            // Увеличиваем количество жителей в каждом году от года рождения до года смерти
            for (let year = birthYear; year <= deathYear; year++) {
                if (yearCounts[year]) {
                    yearCounts[year]++;
                } else {
                    yearCounts[year] = 1;
                }
            }
        });

        // Преобразуем объект в массив
        const populationArray = Object.entries(yearCounts).map(([year, count]) => ({ year: parseInt(year), count }));

        return populationArray;
    }

    //  Находим максимальное количество жителей

    function findMaxPopulationObjects(populationArray) {
        const maxPopulation = Math.max(...populationArray.map(obj => obj.count));
    
        // Фильтруем массив, чтобы оставить только объекты с максимальным количеством жителей
        const maxPopulationObjects = populationArray.filter(obj => obj.count === maxPopulation);
    
        return maxPopulationObjects;
    }
    

    // функция добавления жителя 
    const [name , setName] = useState()
    const [birthDate , setBirthDate] = useState()
    const [deathDate , setDeathDate] = useState("None")
    const addUser = (data) => {
        axios.post('http://localhost:3009/people_data' , data).then(()=>{
            alert('Ok')
            window.location.reload()
        }).catch((e)=>{
            console.log(e)
        })
    }

    // // берем период от и до
    const getPeriod = (years) => years.map((element, index) => {
        if (index === 0 || index === years.length - 1) {
            return element;
        }
        return null;
    }).filter(element => element !== null); // Фильтруем, чтобы удалить пустые значения

  return (
    <>
        <Main.Provider value={{
            // все жители
            getAllPeople,
            people_data,
            // все жители
            findPopulationByYear,
            // Наибольшее количество жителей 
            findMaxPopulationObjects,
            // функция добавления жителя 
            addUser,
            name,setName,
            birthDate , setBirthDate,
            deathDate , setDeathDate,
            // берем переуд
            getPeriod

        }}>
            {children}
        </Main.Provider>
    </>
)
}

export default MainContext