import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Icon from '../../components/Icon'
import { axiosRequest, saveToken } from '../../utils/token'

const fieldClass = 'group relative flex min-h-[51px] items-center rounded border bg-white transition duration-200 focus-within:border-brand focus-within:shadow-[0_0_0_4px_#db444409]'
const labelClass = 'absolute -top-2 left-2.5 bg-white px-[5px] text-[10px] leading-[15px] transition-colors duration-200 group-focus-within:text-brand'
const inputClass = 'min-h-[49px] min-w-0 w-full rounded-[inherit] border-0 bg-transparent px-[15px] py-[13px] text-[13px] leading-normal text-[#202020] outline-none placeholder:text-xs placeholder:text-[#9b9b9b] focus-visible:outline-none!'
const errorClass = 'mx-0.5 mt-[7px] animate-error-enter text-[11px] leading-normal text-[#c92c2c]'

const loginSchema = z.object({
  userName: z.string().trim().min(3, 'Enter your username'),
  password: z.string().min(2, 'Enter your password')
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  let [errorMessage, setErrorMessage] = useState('')
  

  const {
    register,
    handleSubmit,
    formState: {errors,isSubmitting},
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  async function loginUser(info: z.infer<typeof loginSchema>) {
     setErrorMessage('')
    try {
      const { data } = await axiosRequest.post('/Account/login', info)

      saveToken(data.data)

      window.location.href = '/'
    } catch (error) {
      console.log(error);
      setErrorMessage(
      'Не удалось войти. Проверь имя пользователя, пароль и соединение.'
    )
      
    }
  }

  return (
    <main className="grid min-h-[clamp(660px,calc(100svh-87px),920px)] flex-1 place-items-center px-6 pt-[100px] pb-[135px] max-[541px]:min-h-[600px] max-[541px]:pt-[95px] max-[541px]:pb-[110px]">
      <section className="w-full max-w-[370px] animate-login-enter" aria-labelledby="login-title">
        <div className="mb-[34px] max-[541px]:mb-8">
          <h1 className="mb-2 text-[33px] leading-[1.35] font-medium tracking-[1.05px] max-[541px]:text-[clamp(25px,6.6vw,31px)] max-[541px]:tracking-[.4px]" id="login-title">Log in to Exclusive</h1>
          <p className="text-sm leading-[1.7]">Enter your details below</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(loginUser)} noValidate>
          <div className="min-w-0">
            <div className={`${fieldClass} ${errors.userName ? 'border-brand' : 'border-[#cfcfcf] hover:border-[#999]'}`}>
              <label className={`${labelClass} ${errors.userName ? 'text-brand' : 'text-[#737373]'}`} htmlFor="login-identifier">Email or phone number</label>
              <input className={inputClass} id="login-identifier" type="text" autoComplete="username" placeholder="you@example.com" aria-required="true" aria-invalid={Boolean(errors.userName)} aria-describedby={errors.userName ? 'login-identifier-error' : undefined} {...register('userName')} />
            </div>
            {errors.userName && <p className={errorClass} id="login-identifier-error" role="alert">{errors.userName.message}</p>}
          </div>

          <div className="min-w-0">
            <div className={`${fieldClass} ${errors.password ? 'border-brand' : 'border-[#cfcfcf] hover:border-[#999]'}`}>
              <label className={`${labelClass} ${errors.password ? 'text-brand' : 'text-[#737373]'}`} htmlFor="login-password">Password</label>
              <input className={`${inputClass} pr-12`} id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" aria-required="true" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} {...register('password')} />
              <button className="absolute right-2 grid size-[33px] cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#7b7b7b] transition-colors duration-200 hover:bg-[#fff0f0] hover:text-brand" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eyeOff' : 'eye'} width="21" height="21" />
              </button>
            </div>
            {errors.password && <p className={errorClass} id="login-password-error" role="alert">{errors.password.message}</p>}
          </div>

          {errorMessage && (
            <p className="text-center text-sm text-brand" role="alert">
              {errorMessage}
            </p>
          )}
          <button className="mt-2.5 mb-[5px] cursor-pointer self-center border-0 bg-transparent py-[5px] text-sm leading-normal text-brand underline-offset-5 transition-colors duration-200 hover:text-[#b62e2e] hover:underline" type="button">Forget Password?</button>
          <button disabled={isSubmitting}  className="relative grid min-h-[51px] w-full cursor-pointer place-items-center overflow-hidden rounded border border-transparent bg-brand px-6 py-3.5 text-sm font-medium text-white transition duration-200 before:absolute before:inset-0 before:translate-x-[-110%] before:bg-[linear-gradient(110deg,transparent_20%,#ffffff20_50%,transparent_80%)] before:transition-transform before:duration-550 hover:-translate-y-0.5 hover:bg-[#cb3636] hover:shadow-[0_8px_20px_#db444421] hover:before:translate-x-[110%] active:translate-y-0 active:shadow-none" type="submit"><span>{isSubmitting ? 'Logging in...' : 'Log In'}</span></button>
        </form>
      </section>
    </main>
  )
}
