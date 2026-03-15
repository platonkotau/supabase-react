
import { useState } from 'react'
import { supabase } from '../supabaseClient'
function Login({setLogin}) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')


    async function SingIn() {
      const {data, error} = await supabase.auth.signInWithPassword({email,password})
      if (error) {
        setMessage('Ошибка' + error.message)
      } else {
        setLogin(data.user)

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
      <div className=''>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        <input
          type='email'
          placeholder='введи email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

         <input
          type='password'
          placeholder='введи password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={Submit}>{isLogin ? 'Войди в аккаунт' : 'Зарегестрируйся'}</button>

        <a onClick={() => setIsLogin(!isLogin)}>{isLogin ? "нет аккаунта? Зарегестрируйся" : "Войди в аккаунт"}</a>

        {message && <p>{message}</p>}
      </div>



    )
}



export default Login

 