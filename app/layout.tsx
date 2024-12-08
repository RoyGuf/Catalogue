import type { Metadata } from "next";
import "./globals.css";
import Nav from '@components/Nav'
import Footer from '@components/Footer'

import Provider from '@components/Provider'


export const metadata: Metadata = {
  title: "Films Vault",
  description: "Discover the best movies in the worls",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider session={undefined}>
            <div className=''>
                <div className=''/>
            </div>
            <main className=''>
                <Nav/>
                {children}
                <Footer/>
            </main>
        </Provider>
        </body>
    </html>
  );
}
