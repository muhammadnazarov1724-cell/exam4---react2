import type { SVGProps } from 'react'

const paths = {
  search: <><circle cx="10.8" cy="10.8" r="7.3" /><path d="m16.2 16.2 4.3 4.3" /></>,
  heart: <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z" />,
  cart: <><path d="M2 3h3l3 13h11l3-9H6" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M9 11h9" /></>,
  user: <><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-3a7 7 0 0 1 14 0v3" /></>,
  bag: <><path d="M5 3h14l2 5v13H3V8l2-5ZM3 8h18" /><path d="M8 11a4 4 0 0 0 8 0" /></>,
  logout: <><path d="M10 5V3h10v18H10v-2M14 12H2m4-4-4 4 4 4" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 5.1 12 5c6.5 0 10 7 10 7a20 20 0 0 1-3.1 4M6.1 6.1A20 20 0 0 0 2 12s3.5 7 10 7a11 11 0 0 0 5.8-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2" /></>,
  facebook: <path d="M15 3h-3a4 4 0 0 0-4 4v4H5v4h3v7h4v-7h3l1-4h-4V7h3" />,
  twitter: <path d="M22 4.5a8 8 0 0 1-2.5 1 4.3 4.3 0 0 0-7.4 3v1A12.2 12.2 0 0 1 3 5s-4 9 5 13a13 13 0 0 1-7 2c9 5 20 0 20-11.5l-.1-1.1A8 8 0 0 0 22 4.5Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  linkedin: <><path d="M4 9v12M4 3v.1M10 21V9h4v2a4 4 0 0 1 7 3v7M14 21v-7" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></>,
} as const

type IconProps = SVGProps<SVGSVGElement> & { name: keyof typeof paths }

export default function Icon({ name, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  )
}
