import React from 'react'
import { useMain } from '../../context/main-context'

const AddUser = () => {
    
  const main = useMain()

    const data = {
        name : main.name,
        birth_year : main.birthDate,
        death_year : main.deathDate
    }
  return (
    <>
        <div>
            <h3>Добавить Жителья</h3>
            <div>
                    Пиши имя
                <p>
                    <input onChange={(e)=>{main.setName(e.target.value)}} className='inp' type="text" placeholder='Имя' />
                </p>
                     Пиши год рождения
                <p>
                    <input  onChange={(e)=>{main.setBirthDate(e.target.value)}} className='inp' type="number" placeholder='Год рожднения' />
                </p>
                    Пиши год смети ,  оставь поле пустым если он жив 
                <p>
                    <input   onChange={(e)=>{main.setDeathDate(e.target.value !== null ? e.target.value : 'None')}} className='inp' type="number" placeholder='Год смерти ' />
                </p>
                <p>
                    <button className='btn' onClick={()=>main.addUser(data)} >Добавить</button>
                </p>
            </div>
        </div>
    </>
    )
}

export default AddUser