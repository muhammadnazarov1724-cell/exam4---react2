import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import {
  clearCart,
  removeCartItem,
  setCartQuantity,
  type CartItem,
} from '../../store/Redux'
import Icon from '../../components/Icon'

const outlineButtonClass =
  'cursor-pointer rounded border border-[#aaa] px-6 py-3 text-sm transition-colors hover:border-brand hover:text-brand'

function getPrice(product: CartItem) {
  return product.hasDiscount ? product.discountPrice: product.price
}

function formatPrice(value: number) {
  return '$' + value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function Korzina() {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.data.cart)

  const subtotal = cart.reduce(
    (sum, product) => sum + getPrice(product) * product.quantity,
    0
  )

  return (
    <main className="mx-auto min-h-[850px] w-full max-w-[1170px] px-6 py-14">
      <nav className="mb-12 flex items-center gap-3 text-xs">
        <NavLink to="/" className="text-[#888] hover:text-brand">
          Home
        </NavLink>
        <span className="text-[#999]">/</span>
        <span>Cart</span>
      </nav>

      <h1 className="sr-only">Cart</h1>

      {cart.length === 0 ? (
        <div className="rounded border border-dashed border-[#ddd] px-6 py-20 text-center">
          <p className="text-xl font-medium">Ваша корзина пуста</p>

          <NavLink
            to="/products"
            className="mt-6 inline-block rounded bg-brand px-8 py-3 text-sm text-white"
          >
            Return To Shop
          </NavLink>
        </div>
      ) : (
        <>
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_24px] gap-4 px-6 py-4 text-sm text-[#777] md:grid">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span />
          </div>

          <div className="space-y-5">
            {cart.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-2 items-center gap-4 rounded bg-white px-5 py-5 shadow-[0_2px_16px_#0000000d] md:grid-cols-[2fr_1fr_1fr_1fr_24px] md:px-6"
              >
                <NavLink
                  to={`/products/${product.id}`}
                  className="col-span-2 flex min-w-0 items-center gap-4 md:col-span-1"
                >
                  <img
                    src={`${import.meta.env.VITE_API}/images/${product.image}`}
                    alt=""
                    className="h-14 w-14 shrink-0 object-contain"
                  />

                  <span className="text-sm">
                    {product.productName}
                  </span>
                </NavLink>

                <p className="text-sm">
                  <span className="text-[#888] md:hidden">Price: </span>
                  {formatPrice(getPrice(product))}
                </p>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={product.quantity}
                  aria-label={`Количество ${product.productName}`}
                  onChange={(event) => dispatch(setCartQuantity({
                    id: product.id,
                    quantity: Number(event.target.value),
                  }))}
                  className="h-10 w-20 justify-self-end rounded border border-[#aaa] px-3 text-sm outline-none focus:border-brand md:justify-self-start"
                />

                <p className="text-sm font-medium">
                  <span className="font-normal text-[#888] md:hidden">
                    Subtotal: {' '}
                  </span>
                  {formatPrice(getPrice(product) * product.quantity)}
                </p>

                <button
                  type="button"
                  onClick={() => dispatch(removeCartItem(product.id))}
                  aria-label={`Удалить ${product.productName}`}
                  className="grid size-5 cursor-pointer place-items-center justify-self-end rounded-full bg-brand text-white hover:bg-[#c93636]"
                >
                  <Icon name="close" width="12" height="12" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <NavLink to="/products" className={outlineButtonClass}>
              Return To Shop
            </NavLink>

            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="cursor-pointer rounded border border-brand px-6 py-3 text-sm text-brand hover:bg-[#fff5f5]"
            >
              Remove All
            </button>
          </div>

          <section className="mt-12 ml-auto w-full rounded border border-[#777] p-6 sm:max-w-[420px]">
            <h2 className="mb-5 text-xl font-medium">Cart Total</h2>

            <div className="flex justify-between gap-4 py-3 text-sm">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between gap-4 border-b border-[#ddd] py-3 text-sm">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between gap-4 py-4 font-medium">
              <span>Total:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              className="mt-2 w-full rounded bg-brand px-5 py-3.5 text-sm text-white"
            >
              Proceed to checkout
            </button>
          </section>
        </>
      )}
    </main>
  )
}