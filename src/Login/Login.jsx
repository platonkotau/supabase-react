
import { useState } from 'react'
import { supabase } from '../supabaseClient'
function Login({setLogin , setPage}) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')


    async function SingIn() {
      const {data, error} = await supabase.auth.signInWithPassword({email,password})
      if (error) {
        setMessage('Erorr:' + error.message)
      } else {
        setLogin(data.user)
        setPage('profile')

      }
    }

    async function SingUp() {
      const {error} = await supabase.auth.signUp({email,password})
      if (error) {
        setMessage('Ошибка' + error.message)
      } else {
        setMessage('Проверь почту)')
      }
    }

    function Submit(){
      if(isLogin) {
        SingIn()
      } else {
        SingUp()
      }
    }


    return(
      <div>
        <div className='flex justify-center items-center min-h-screen flex-col gap-2 my-0'>
          <div className='border border-gray-300 bg-white rounded-sm shadow-sm p-14 w-full'>
          
          <div className='flex justify-center items-center'>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
         </div>
         <div className='flex justify-between'>
                <input
               className='bg-white rounded-xs border border-gray-300 p-1 mx-1 my-0.5'
                type='email'
                placeholder='введи email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            <input
              className='bg-white rounded-xs border border-gray-300 p-1 mx-1 my-0.5'
              type='password'
              placeholder='введи password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <div className='flex justify-center flex-col items-center'>
              <button 
                className=' bg-white rounded-sm px-3 py-1 m-2 active:dark:bg-blue-600 active:text-white hover:dark:bg-blue-100 shadow-md'
                onClick={Submit}>
                  {isLogin ? 'Войди в аккаунт' : 'Зарегестрируйся'}
              </button>

              <a 
              className='underline text-blue-600 cursor-pointer'
              onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "нет аккаунта? Зарегестрируйся" : "Войди в аккаунт"}</a>

              {message && <p className='text-red-600 '>{message}</p>}
            </div>
          </div>
        </div>
      </div>



    )
}



export default Login

 