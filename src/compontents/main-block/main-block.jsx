import React , {useEffect} from 'react'
import { useMain } from '../../context/main-context'
import './main-block.scss'
import AddUser from '../add-user/add-user'
const MainBlock = () => {
    // импортируем context для удобной работы с state
     const main = useMain()
    useEffect(()=> {
        // делаем запрос для получения всех жителей
        main.getAllPeople()
     },[]) 
    //   узнаем сегоднящнюю дату
    let currentDate = new Date().getFullYear();
    //  получаем количество жителей в каждом году
    const livers = main.findPopulationByYear(main.people_data )
    // получаем наибольшее количество людей в годах
    const mostYears  =  main.findMaxPopulationObjects(livers)
    // берем период от и до
    const period = main.getPeriod(mostYears)
  return (
    <>
        <div className="wrap">
            <h1>Наибольшее количество людей в годах :</h1>
            <div className='flex'>
                        <div >
                            <p className='most'> по {period[0]?.year} - {period[1]?.year}  : {period[0]?.count} были в жизни</p>
                        </div>
            </div>
            <h2>Список всех Жителей</h2>
            {/* add user block   */}
            <AddUser/>
            {main?.people_data?.map((item , idx)=>{
                return (
                    <div key={idx} className='people_block'>
                        <p>Имя : {item.name}</p>
                        <p className='live'>Дата рождения : {item.birth_year}</p>
                        <p>Жил : {item.death_year !== 'None'  ? item.death_year - item.birth_year  : currentDate - item.birth_year } лет</p>
                        <p >Дата смерти : {item.death_year === 'None' ? 'Пока что живой' : item.death_year }</p>
                    </div>
                )
            })}
            <h2>Период жизни в годах</h2>
            <div className='flex' >
                {livers?.map((item ,idx)=>{
                return (
                        <div key={idx}>
                            <p className='years'>{item.year} году : {item.count} жило</p>
                        </div>
                )
            })}
           </div>
        </div>
    </>
    )
}

export default MainBlock