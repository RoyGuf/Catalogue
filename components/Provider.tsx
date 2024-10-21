"use client";

import { SessionProvider } from 'next-auth/react'
import React from 'react'


const Provider = ({children, session}: {
  children: any;
  session: any;
}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider