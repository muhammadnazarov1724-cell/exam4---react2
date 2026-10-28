import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import z from 'zod'
import { axiosRequest } from '../../utils/token'

const inputClass = 'h-[50px] w-full rounded border border-[#cfcfcf] bg-white px-3 text-[13px] text-[#202020] outline-none transition duration-200 placeholder:text-[#737373] hover:border-[#999] focus:border-brand focus:shadow-[0_0_0_4px_#db444409] focus-visible:outline-none!'

const registerSchema = z.object({
  userName: z.string().trim().min(3, 'Минимум 3 символа'),
  phoneNumber: z.string().trim().min(1, 'Введите номер телефона'),
  email: z.string().trim().email('Введите правильный email'),
  password: z.string().min(2, 'Минимум 2 символа'),
})


export default function Register() {
  let [errorMessage, setErrorMessage] = useState('')

  const {
  register,
  handleSubmit,
  formState: {errors, isSubmitting},
} = useForm({
  resolver: zodResolver(registerSchema),
    defaultValues: {
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
  },
})

async function registerUser(info: {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}) {
  setErrorMessage('')

  try {
    await axiosRequest.post('/Account/register', {
      ...info,
      confirmPassword: info.password,
    })

    window.location.href = '/'
  } catch (error) {
    console.log(error);
    setErrorMessage('Не удалось создать аккаунт. Попробуй ещё раз.')
  }
}

  return (
    <main className="grid min-h-[clamp(660px,calc(100svh-87px),920px)] flex-1 place-items-center px-6 pt-[100px] pb-[135px] max-[541px]:min-h-[680px] max-[541px]:pt-20 max-[541px]:pb-24">
      <section className="w-full max-w-[370px] animate-login-enter" aria-labelledby="register-title">
        <div className="mb-10 max-[541px]:mb-8">
          <h1 id="register-title" className="mb-2 text-[33px] leading-[1.35] font-medium tracking-[.7px] max-[541px]:text-[clamp(25px,6.6vw,31px)] max-[541px]:tracking-[.3px]">Create an account</h1>
          <p className="text-sm leading-[1.7]">Enter your details below</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(registerUser)}>

         <div>
           <input className={inputClass} type="text" placeholder="Username" {...register('userName')} />
           {errors.userName && (
             <p className="mt-1 text-sm text-brand">{errors.userName.message}</p>
           )}
         </div>

           <div>
           <input className={inputClass} type="tel" placeholder="Phone number" {...register('phoneNumber')} />
           {errors.phoneNumber && (
             <p className="mt-1 text-sm text-brand">{errors.phoneNumber.message}</p>
           )}
           </div>

         <div>
           <input className={inputClass} type="email" placeholder="Email" {...register('email')} />
           {errors.email && (
             <p className="mt-1 text-sm text-brand">{errors.email.message}</p>
           )}
         </div>

         <div>
           <input className={inputClass} type="password" placeholder="Password" {...register('password')} />
           {errors.password && (
             <p className="mt-1 text-sm text-brand">{errors.password.message}</p>
           )}
         </div>

          <button className="mt-4 grid min-h-[50px] w-full cursor-pointer place-items-center rounded border border-transparent bg-brand px-6 py-3.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#cb3636] hover:shadow-[0_8px_20px_#db444421] active:translate-y-0 active:shadow-none" type="submit">Create Account</button>

          <button className="flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3.5 rounded border border-[#aaa] bg-white px-5 py-3 text-sm text-[#111] transition duration-200 hover:-translate-y-0.5 hover:border-[#777] hover:bg-[#fafafa] hover:shadow-sm active:translate-y-0" type="button">
            <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285f4" d="M43.61 24.46c0-1.36-.12-2.66-.35-3.92H24v7.42h11a9.4 9.4 0 0 1-4.08 6.18v5.14h6.61c3.87-3.56 6.08-8.81 6.08-14.82Z" />
              <path fill="#34a853" d="M24 44c5.51 0 10.13-1.83 13.51-4.96l-6.61-5.14c-1.83 1.23-4.17 1.97-6.9 1.97-5.32 0-9.83-3.59-11.44-8.43H5.73v5.3A20.4 20.4 0 0 0 24 44Z" />
              <path fill="#fbbc05" d="M12.56 27.44a12.3 12.3 0 0 1 0-7.88v-5.3H5.73a20.4 20.4 0 0 0 0 18.48l6.83-5.3Z" />
              <path fill="#ea4335" d="M24 11.13c3 0 5.68 1.03 7.8 3.05l5.85-5.85A19.6 19.6 0 0 0 24 3 20.4 20.4 0 0 0 5.73 14.26l6.83 5.3c1.61-4.84 6.12-8.43 11.44-8.43Z" />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </form>

         {errorMessage && (
           <p className="text-center text-sm text-brand" role="alert">
             {errorMessage}
           </p>
         )}
        <p className="mt-7 flex items-center justify-center gap-4 text-sm leading-[1.7] text-[#555] max-[381px]:gap-3 max-[381px]:text-[13px]">
          <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
          <NavLink className="border-b border-[#999] pb-0.5 text-[#444] no-underline transition-colors duration-200 hover:border-brand hover:text-brand" to="/login">Log in</NavLink>
        </p>
      </section>
    </main>
  )
}
