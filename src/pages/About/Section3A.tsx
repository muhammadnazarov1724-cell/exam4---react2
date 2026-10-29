import tom from '../../assets/Tom Cruise.png'
import emma from '../../assets/Emma watson.png'
import will from '../../assets/Will Smith.png'
import Icon from '../../components/Icon'

const team = [
  {name: 'Tom Cruise', position: 'Founder & Chairman', image: tom},
  {name: 'Emma Watson', position: 'Managing Director', image: emma},
  {name: 'Will Smith', position: 'Product Designer', image: will},
]

const socialIcons = ['twitter', 'instagram', 'linkedin'] as const

const services = [
  {
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery for all orders over $140',
    icon: <><path d="M2 5h12v12H2V5Zm12 5h4l4 4v3h-8M17 10v4h5" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  },
  {
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support',
    icon: <><path d="M4 14v-2a8 8 0 0 1 16 0v5a4 4 0 0 1-4 4h-4" /><rect x="3" y="11" width="4" height="7" rx="2" /><rect x="17" y="11" width="4" height="7" rx="2" /><path d="M10 21h3" /></>,
  },
  {
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days',
    icon: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  },
]

export default function Section3A() {
  return (
    <section className="mx-auto w-full max-w-[1170px] px-6 pb-10" aria-label="Our team and services">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {team.map((member) => (
          <article key={member.name}>
            <div className="overflow-hidden rounded bg-[#f5f5f5]">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                width="370"
                height="430"
                className="aspect-[370/430] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h2 className="mt-5 text-2xl font-medium tracking-wide sm:text-3xl">{member.name}</h2>
            <p className="mt-1.5 text-sm">{member.position}</p>

            <div className="mt-3 flex gap-3">
              {socialIcons.map((social) => (
                <button
                  key={social}
                  type="button"
                  aria-label={`${member.name}: ${social}`}
                  className="cursor-pointer rounded p-1 transition-colors hover:text-brand"
                >
                  <Icon name={social} width="19" height="19" />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex justify-center gap-2" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#b3b3b3]" />
        <span className="size-2.5 rounded-full bg-[#b3b3b3]" />
        <span className="size-2.5 rounded-full bg-brand ring-2 ring-[#ddd] ring-offset-2" />
        <span className="size-2.5 rounded-full bg-[#b3b3b3]" />
        <span className="size-2.5 rounded-full bg-[#b3b3b3]" />
      </div>

      <div className="grid grid-cols-1 gap-10 py-20 text-center md:grid-cols-3 lg:py-28">
        {services.map((service) => (
          <div key={service.title}>
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#c1c1c1]">
              <span className="grid size-14 place-items-center rounded-full bg-black text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {service.icon}
                </svg>
              </span>
            </div>

            <h3 className="mt-5 text-base font-semibold">{service.title}</h3>
            <p className="mt-2 text-xs leading-6">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
