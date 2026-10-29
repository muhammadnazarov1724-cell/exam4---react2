import { NavLink } from 'react-router-dom'

const profileFields = [
  {name: 'firstName', label: 'First name', type: 'text', placeholder: 'First name'},
  {name: 'lastName', label: 'Last name', type: 'text', placeholder: 'Last name'},
  {name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com'},
  {name: 'address', label: 'Street address', type: 'text', placeholder: 'Street address'},
]

const inputClass = 'h-12 min-w-0 w-full rounded border border-[#d5d5d5] bg-white px-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-brand'
const sidebarClass = 'cursor-pointer text-left text-sm text-[#888] transition-colors hover:text-brand'

export default function Account() {
  return (
    <main className="mx-auto min-h-[850px] w-full max-w-[1170px] px-6 pt-12 pb-24 sm:pt-14 lg:pb-40">
      <nav className="mb-10 flex items-center gap-3 text-xs sm:mb-12" aria-label="Breadcrumb">
        <NavLink to="/" className="text-[#888] transition-colors hover:text-brand">Home</NavLink>
        <span className="text-[#999]" aria-hidden="true">/</span>
        <span>My Account</span>
      </nav>

      <h1 className="sr-only">My Account</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <aside className="grid gap-6 sm:grid-cols-3 lg:w-56 lg:shrink-0 lg:grid-cols-1">
          <div>
            <h2 className="text-sm font-medium">Manage My Account</h2>
            <div className="mt-4 flex flex-col items-start gap-3 pl-5">
              <button type="button" className="cursor-pointer text-sm text-brand" aria-current="page">My Profile</button>
              <button type="button" className={sidebarClass}>Address Book</button>
              <button type="button" className={sidebarClass}>My Payment Options</button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium">My Orders</h2>
            <div className="mt-4 flex flex-col items-start gap-3 pl-5">
              <button type="button" className={sidebarClass}>My Returns</button>
              <button type="button" className={sidebarClass}>My Cancellations</button>
            </div>
          </div>

          <button type="button" className="cursor-pointer self-start text-left text-sm font-medium transition-colors hover:text-brand">My Wishlist</button>
        </aside>

        <section className="min-w-0 flex-1 rounded bg-white p-6 shadow-[0_4px_24px_#00000014] sm:p-8 lg:p-10" aria-labelledby="account-profile-title">
          <h2 id="account-profile-title" className="mb-6 text-lg font-medium text-brand">Profile</h2>

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
              {profileFields.map((field) => (
                <div key={field.name} className="relative min-w-0">
                  <label htmlFor={`account-${field.name}`} className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] text-[#777]">
                    {field.label}
                  </label>
                  <input
                    id={`account-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <fieldset className="mt-10">
              <legend className="mb-4 text-sm">Password Changes</legend>

              <input className={inputClass} type="password" name="currentPassword" placeholder="Current password" aria-label="Current password" autoComplete="current-password" />

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input className={inputClass} type="password" name="newPassword" placeholder="New password" aria-label="New password" autoComplete="new-password" />
                <input className={inputClass} type="password" name="confirmPassword" placeholder="Confirm new password" aria-label="Confirm new password" autoComplete="new-password" />
              </div>
            </fieldset>

            <div className="mt-10 flex flex-wrap items-center justify-end gap-6">
              <button type="reset" className="cursor-pointer py-3 text-sm transition-colors hover:text-brand">Cancel</button>
              <button type="button" className="cursor-pointer rounded bg-brand px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c93636]">Save Changes</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
