import { LoginForm } from '@/components/LoginForm'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const RegisterPage=async()=>{

const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        
        <LoginForm />

      </div>
    </div>
  )
}

export default RegisterPage
