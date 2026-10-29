import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { changeDetailsQuaintity, getProductById, setDetailsImageIndex, toggleWishlist } from '../../store/Redux'
import Icon from '../../components/Icon'
import ProductCard from '../Products/ProductCard'

export default function InfoProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const {id} = useParams()
  const productId = Number(id)

  const {
    productDetails,
    detailsLoading,
    detailsError,
    detailsImageIndex,
    products,
    ourProducts,
    detailsQuantity,
  } = useSelector((state: RootState) => state.data)

  const inWishlist = useSelector((state: RootState) => 
    state.data.wishlist.some((item) => item.id === productId)
)

  useEffect(() => {
    if (Number.isInteger(productId) && productId > 0) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, productId])

  if (!Number.isInteger(productId) || productId <= 0) {
    return <main className="px-6 py-20 text-center">Товар не найден</main>
  }

  if (detailsError) {
    return (
      <main className="px-6 py-20 text-center">
        <p className="text-brand">{detailsError}</p>
        <NavLink to="/products" className="mt-4 inline-block underline">
          Вернуться в каталог
        </NavLink>
      </main>
    )
  }

  if (
    detailsLoading ||
    !productDetails ||
    productDetails.id !== productId
  ) {
    return (
      <main className="px-6 py-20 text-center">
        Загрузка товара...
      </main>
    )
  }

  const product = productDetails
  const image = product.images[detailsImageIndex] || product.images[0]
  const price = product.hasDiscount ? product.discountPrice : product.price
  const totalPrice = price * detailsQuantity
  function handleWishlist() {
    dispatch(toggleWishlist({
       id: product.id,
       productName: product.productName,
       image: product.images[0]?.images || '',
       price: product.price,
       hasDiscount: product.hasDiscount,
       discountPrice: product.discountPrice,
    }))
  }
  const relatedProducts = (products.length > 0 ? products : ourProducts)
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  return (
    <main className="mx-auto w-full max-w-[1170px] px-6 pt-10 pb-20 sm:pt-14 sm:pb-24">
      <nav className="mb-9 flex flex-wrap items-center gap-3 text-xs leading-5 sm:mb-10" aria-label="Breadcrumb">
        <NavLink to="/" className="text-[#888] transition-colors hover:text-brand">Home</NavLink>
        <span className="text-[#999]" aria-hidden="true">/</span>
        <NavLink to="/products" className="text-[#888] transition-colors hover:text-brand">
          Products
        </NavLink>
        <span className="text-[#999]" aria-hidden="true">/</span>
        <span>{product.productName}</span>
      </nav>

      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row lg:gap-5">
          <div className="order-2 flex gap-3 overflow-x-auto pb-1 sm:order-1 sm:w-24 sm:shrink-0 sm:flex-col sm:pb-0 lg:max-h-[570px] lg:w-[140px] lg:gap-4 lg:overflow-y-auto">
            {product.images.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch(setDetailsImageIndex(index))}
                className={`h-20 w-20 shrink-0 cursor-pointer rounded border bg-[#f5f5f5] p-3 transition-colors hover:border-[#aaa] sm:h-24 sm:w-24 lg:h-[130px] lg:w-[140px] ${detailsImageIndex === index ? 'border-brand': 'border-transparent'}`}>
                <img
                  src={`${import.meta.env.VITE_API}/images/${item.images}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <div className="order-1 flex h-[340px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded bg-[#f5f5f5] p-5 sm:order-2 sm:h-[440px] lg:h-[570px] lg:p-7">
            {image ? (
              <img
                src={`${import.meta.env.VITE_API}/images/${image.images}`}
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="text-sm text-[#777]">
                Изображение недоступно
              </p>
            )}
          </div>
        </div>

        <section className="min-w-0" aria-labelledby="product-details-title">
          <p className="mb-2 text-xs text-[#888]">{product.brand}</p>
          <h1 id="product-details-title" className="text-2xl leading-8 font-semibold tracking-wide">
            {product.productName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-xl leading-6 tracking-wide text-[#ffad33]" aria-label="Рейтинг пока недоступен">☆☆☆☆☆</span>
            <span className="text-[#888]">(—)</span>
            <span className="mx-1 h-4 border-l border-[#aaa]" aria-hidden="true" />
            <span className={product.quantity > 0 ? 'text-[#27c663]' : 'text-[#888]'}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

           <div className="mt-4 flex flex-wrap items-center gap-3">
               <span className="text-2xl font-semibold">
               ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
               </span>

               {product.hasDiscount && (
               <span className="text-[#888] line-through">
                   ${(product.price * detailsQuantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })}
               </span>
               )}
           </div>

          <p className="mt-4 border-b border-[#bdbdbd] pb-5 text-[13px] leading-6 text-[#666]">
            {product.description}
          </p>

          <div className="mt-5 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-lg">Colours:</p>
              <span
                className="size-4 rounded-full border border-[#bbb] bg-[#eee] ring-1 ring-black ring-offset-2"
                style={{backgroundColor: product.color}}
                aria-hidden="true"
              />
              <span className="text-sm text-[#666]">{product.color}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-lg">Size:</p>
              <span className="rounded border border-brand bg-brand px-4 py-1.5 text-sm text-white">{product.size || '—'}</span>
            </div>
          </div>
          
          <div className="mt-7 flex items-center gap-3">
           <div className="flex h-11 w-28 shrink-0 items-center overflow-hidden rounded border border-[#aaa]">
             <button
               type="button"
               onClick={() => dispatch(changeDetailsQuaintity(-1))}
               disabled={detailsQuantity <= 1}
               className="grid h-full w-8 cursor-pointer place-items-center text-xl hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40">−</button>
             <span className="flex-1 text-center text-base font-medium">
               {detailsQuantity}
             </span>
             <button
               type="button"
               onClick={() => dispatch(changeDetailsQuaintity(1))}
               className="grid h-full w-8 cursor-pointer place-items-center bg-brand text-xl text-white hover:bg-[#c93636]">+</button>
           </div>

            <button
              type="button"
              disabled={product.quantity <= 0}
              className="h-11 min-w-0 flex-1 cursor-pointer rounded bg-brand px-3 text-sm font-medium text-white transition-colors hover:bg-[#c93636] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded border transition-colors hover:border-brand hover:text-brand ${
                inWishlist ? 'border-brand text-brand' : 'border-[#aaa]'}`}>
              <Icon
                name="heart" width="22" height="22" fill={inWishlist ? 'currentColor' : 'none'}/>
            </button>
          </div>

          <div className="mt-7 overflow-hidden rounded border border-[#999]">
            <div className="flex items-center gap-4 px-4 py-4">
              <svg className="shrink-0" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 5h12v12H2V5Zm12 5h4l4 4v3h-8M17 10v4h5M1 9h7M1 12h5" />
                <circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
              </svg>
              <div>
                <h2 className="text-sm font-medium">Free Delivery</h2>
                <p className="mt-1 text-[10px] leading-4 underline underline-offset-2">Enter your postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-[#999] px-4 py-4">
              <svg className="shrink-0" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 10a9 9 0 0 1 15-6l3 3M21 3v4h-4M21 14a9 9 0 0 1-15 6l-3-3M3 21v-4h4" />
              </svg>
              <div>
                <h2 className="text-sm font-medium">Return Delivery</h2>
                <p className="mt-1 text-[10px] leading-4">Free 30 Days Delivery Returns. <span className="underline underline-offset-2">Details</span></p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-16 sm:mt-24" aria-labelledby="related-items-title">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-9 w-4 rounded bg-brand" />
          <h2 id="related-items-title" className="text-sm font-medium text-brand">Related Item</h2>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 min-[540px]:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <NavLink to="/products" className="inline-block text-sm text-[#666] underline underline-offset-4 transition-colors hover:text-brand">Explore Our Products</NavLink>
        )}
      </section>
    </main>
  )
}
