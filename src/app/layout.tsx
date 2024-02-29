"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const queryClient = new QueryClient();

  axios.defaults.baseURL = "http://13.126.70.16:4000/api/";

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

