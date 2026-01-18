"use client"

import './globals.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About Us' },
    { href: '/merchandise', label: 'Merchandise' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Sunrise Tours & Adventure logo"
            width={80}
            height={80}
            priority
          />
          <span className="text-lg md:text-xl font-bold tracking-tight">
            Sunrise Tours & Adventure
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-700 hover:text-orange-600">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 md:hidden z-50 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal={mobileOpen}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-orange-600" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-orange-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
