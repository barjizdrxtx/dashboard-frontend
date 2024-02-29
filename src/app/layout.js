"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const queryClient = new QueryClient();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

  return (

    <html lang="en">

      <body className={inter.className}>

        <QueryClientProvider client={queryClient}>


          {children}

        </QueryClientProvider>


      </body>

    </html>
  );
}

