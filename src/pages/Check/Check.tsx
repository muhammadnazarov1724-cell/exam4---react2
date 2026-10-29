import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import type { CartItem } from '../../store/Redux'
import z from 'zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const billingFields = [
  {name: 'firstName', placeholder: 'First name', type: 'text'},
  {name: 'lastName', placeholder: 'Last name', type: 'text'},
  {name: 'address', placeholder: 'Street address', type: 'text'},
  {
    name: 'apartment',
    placeholder: 'Apartment, floor, etc. (optional)',
    type: 'text',
  },
  {name: 'city', placeholder: 'Town/City', type: 'text'},
  {name: 'phone', placeholder: 'Phone number', type: 'tel'},
  {name: 'email', placeholder: 'Email address', type: 'email'},
]

const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, 'Введите имя'),
  lastName: z.string().trim().min(2, 'Введите фамилию'),
  address: z.string().trim().min(3, 'Введите адрес'),
  apartment: z.string(),
  city: z.string().trim().min(2, 'Введите город'),
  phone: z.string().trim().regex(
    /^\+?[0-9]{9,15}$/,
    'Введите номер: от 9 до 15 цифр, можно с +'
  ),
  email: z.string().trim().email('Введите правильный email'),
  saveInformation: z.boolean(),
  payment: z.enum(['bank', 'cash']),
  coupon: z.string(),
})

const inputClass =
  'h-14 min-w-0 w-full rounded border border-[#d5d5d5] bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-[#888] focus:border-brand'

function getPrice(product: CartItem) {
  return product.hasDiscount ? product.discountPrice : product.price
}

function formatPrice(value: number) {
  return '$' + value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function Check() {
  const cart = useSelector((state: RootState) => state.data.cart)

  const successDialog = useRef<HTMLDialogElement>(null)

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: zodResolver(checkoutSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    saveInformation: false,
    payment: 'cash',
    coupon: '',
  },
})

function placeOrder() {
  successDialog.current?.showModal()
  reset()
}

  const subtotal = cart.reduce(
    (sum, product) => sum + getPrice(product) * product.quantity,0)

  if (cart.length === 0) {
    return (
      <main className="mx-auto min-h-[600px] max-w-[1170px] px-6 py-20 text-center">
        <h1 className="text-2xl font-medium">Ваша корзина пуста</h1>

        <NavLink
          to="/products"
          className="mt-6 inline-block rounded bg-brand px-8 py-3 text-sm text-white"
        >
          Перейти в каталог
        </NavLink>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-[900px] w-full max-w-[1170px] px-6 pt-12 pb-24 sm:pt-14">
      <nav className="mb-10 flex flex-wrap items-center gap-3 text-xs">
        <NavLink to="/products" className="text-[#888] hover:text-brand">
          Product
        </NavLink>
        <span className="text-[#999]">/</span>
        <NavLink to="/cart" className="text-[#888] hover:text-brand">
          View Cart
        </NavLink>
        <span className="text-[#999]">/</span>
        <span>Checkout</span>
      </nav>

        <form
        noValidate
        onSubmit={handleSubmit(placeOrder)}
        className="grid items-start gap-10 lg:grid-cols-2 lg:gap-24"
        >
        <section aria-labelledby="billing-title">
          <h1
            id="billing-title"
            className="mb-6 text-3xl font-medium tracking-wide"
          >
            Billing Details
          </h1>

          <div className="rounded bg-white p-5 shadow-[0_3px_20px_#00000012] sm:p-6">
            <div className="space-y-4">
            {billingFields.map((field) => (
              <div key={field.name}>
                <input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={inputClass}
                />

                {errors[field.name] && (
                  <p className="mt-1 text-xs text-brand">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5">
              <input
                type="checkbox"
                name="saveInformation"
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
              />

              <span>
                Save this information for faster check-out next time
              </span>
            </label>
          </div>
        </section>

        <section
          className="min-w-0 w-full lg:ml-auto lg:max-w-[450px] lg:pt-4"
        >
          <div className="space-y-5">
            {cart.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4"
              >
                <img
                  src={`${import.meta.env.VITE_API}/images/${product.image}`}
                  className="size-12 object-contain"
                />

                <div className="min-w-0">
                  <p className="text-sm">{product.productName}</p>
                  <p className="mt-1 text-xs text-[#888]">
                    × {product.quantity}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm">
                  {formatPrice(getPrice(product) * product.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between gap-4 py-3 text-sm">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between gap-4 border-b border-[#bbb] py-3 text-sm">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between gap-4 py-4 text-base font-medium">
              <span>Total:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <fieldset className="mt-5 space-y-5">
            <legend className="sr-only">Payment method</legend>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  {...register('payment')}
                  value="bank"
                  className="size-4 cursor-pointer accent-brand"
                />
                Bank
              </label>

              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="italic text-[#17448b]">VISA</span>
                <span className="text-[#df3b32]">Mastercard</span>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                {...register('payment')}
                value="cash"
                className="size-4 cursor-pointer accent-brand"
              />
              Cash on delivery
            </label>
          </fieldset>

          <div className="mt-8 flex flex-col gap-3 rounded bg-white p-5 shadow-[0_3px_20px_#00000012] sm:flex-row">
            <input
              type="text"
              {...register('coupon')}
              placeholder="Coupon Code"
              className={inputClass}
            />

            <button
              type="button"
              className="h-14 shrink-0 cursor-pointer rounded border border-brand px-7 text-sm text-brand transition-colors hover:bg-[#fff5f5]"
            >
              Apply
            </button>
          </div>

          <button
            type="submit"
            className="mt-7 w-full cursor-pointer rounded bg-brand px-9 py-3.5 text-sm text-white transition-colors hover:bg-[#c93636] sm:w-auto"
          >
            Place Order
          </button>
        </section>
      </form>
      <dialog
      ref={successDialog}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-md rounded-2xl border-0 bg-white p-8 text-center shadow-2xl backdrop:bg-black/50">
     <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
      ✓
     </div>

    <h2
    className="text-2xl font-semibold"
    >
    Спасибо за заказ!
    </h2>

      <p className="mt-3 text-sm leading-6 text-[#777]">
        Ваш демонстрационный заказ оформлен.
        Спасибо, что выбрали наш магазин!
      </p>

      <p className="mt-2 text-xs text-[#888]">
      Учебный режим: заказ не отправлен в магазин.
      </p>

  <form method="dialog" className="mt-6">
    <button autoFocus type="submit" className="w-full cursor-pointer rounded bg-brand px-6 py-3 text-sm text-white transition-colors hover:bg-[#c93636]">Понятно</button>
  </form>
</dialog>
    </main>
  )
}