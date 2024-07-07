import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import './App.css'
import { client } from '@common/rpc'

function App() {
  const [count, setCount] = useState(0)

  // tmp
  const [data, setData] = useState<{ id: number; title: string }[]>([])

  const fetch = async () => {
    const res = await client.v1.posts.list.$get()
    const data = await res.json()
    console.log(data)
    setData(data.data)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <h2>Posts</h2>
        <ul>
          {data.map(d => (
            <li key={d.id}>{d.title}</li>
          ))}
        </ul>
      </div>
      <div className='card'>
        <button type='button' onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
