import React, { useState, useEffect } from 'react'
import s from './App.css'

export const App = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [checkedBtn, setCheckedBtn] = useState('posts')
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${checkedBtn}`)
            const post = await response.json()
            setData(post)
        }
        fetchData()
    }, [checkedBtn])

    const items = data
    .filter(item => {
        if(item.title.includes(searchValue)){
            return true
        }
    })
    .map(item =>  <li key={item.id}>{item.title}</li>)

    return (
        <div className={s.li}>
            <button className={s.post}
                style={ {color: `${checkedBtn === 'posts' ? 'red' : ''}`}}
                onClick={() => setCheckedBtn('posts') }>posts</button>
            <button 
                  style={ {color: `${checkedBtn === 'todos' ? 'red' : ''}`}}
                onClick={() => setCheckedBtn('todos') }>todos</button>
            <button
                  style={ {color: `${checkedBtn === 'albums' ? 'red' : ''}`}} 
                onClick={() => setCheckedBtn('albums') }>albums</button>
            <h1 onClick={() => setCount(count +1)}>{checkedBtn}: {data.length}</h1>
            <input 
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <ul>
            {
               items
            }
            </ul>
        </div>
    )
}
