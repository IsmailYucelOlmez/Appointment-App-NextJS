import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div>
        Randevu Sistemi
      </div>
      
      <div>
        <Link href="/sign-in">
          <p>Sign In</p>
        </Link>
        <Link href="/sign-up">
          <p>Sign Up</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
