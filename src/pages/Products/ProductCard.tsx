import { removeFromWishlist, toggleWishlist, type Product } from '../../store/Redux'
import Icon from '../../components/Icon'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { NavLink } from 'react-router-dom';

export default function ProductCard({product, wishlistPage =false,}: {product: Product; wishlistPage?: boolean}) {

  const dispatch = useDispatch<AppDispatch>()

  const inWishlist = useSelector((state: RootState) =>
  state.data.wishlist.some((item) => item.id === product.id)
)

function handleWishlist() {
  if (wishlistPage) {
    dispatch(removeFromWishlist(product.id))
  }
  else {
    dispatch(toggleWishlist(product))
  }
}

  const price = product.hasDiscount ? product.discountPrice : product.price
  const discount = product.hasDiscount && product.price > 0
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[1.08] overflow-hidden rounded bg-[#f5f5f5]">
        <img
          className="h-full w-full object-contain p-7 transition-transform duration-300 group-hover:scale-105"
          src={`${import.meta.env.VITE_API}/images/${product.image}`}
          loading="lazy"
        />

        {discount > 0 && (
          <span className="absolute top-3 left-3 rounded bg-brand px-2.5 py-1 text-[10px] text-white">-{discount}%</span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlistPage ? 'Удалить из избранного' : 'Добавить или убрать из избранного'}
          aria-pressed={wishlistPage ? undefined : inWishlist}
          className={`grid size-8 cursor-pointer place-items-center rounded-full bg-white transition-colors hover:bg-brand hover:text-white ${
            inWishlist && !wishlistPage ? 'text-brand' : 'text-black'
          }`}
        >
        <Icon
          name={wishlistPage ? 'trash' : 'heart'}
          width="18"
          height="18"
          fill={!wishlistPage && inWishlist ? 'currentColor' : 'none'}
        />
      </button>
        <NavLink
          to={`/products/${product.id}`}
          className="grid size-8 cursor-pointer place-items-center rounded-full bg-white text-black transition-colors hover:bg-brand hover:text-white"
        >
          <Icon name="eye" width="18" height="18" />
        </NavLink>
        </div>

        <button className={`absolute inset-x-0 bottom-0 min-h-10 cursor-pointer bg-black px-4 py-2.5 text-[13px] text-white transition duration-200 hover:bg-brand ${
         wishlistPage ? '' : 'sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0'
         }`} type="button">Add To Cart</button>
      </div>

      <h2 className="mt-3 truncate text-[13px] leading-6 font-medium" title={product.productName}>{product.productName}</h2>

      <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="text-sm font-medium text-brand">${price.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
        {product.hasDiscount && (
          <span className="text-xs text-[#888] line-through">${product.price.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
        )}
      </div>

      {/* API пока не возвращает рейтинг и количество отзывов. */}
      <div hidden={wishlistPage} className="mt-1 flex items-center gap-2" aria-label="Rating unavailable">
        <span className="text-lg leading-6 tracking-wide text-[#ffad33]" aria-hidden="true">☆☆☆☆☆</span>
        <span className="text-[11px] text-[#888]" aria-hidden="true">(—)</span>
      </div>
    </article>
  )
}
