import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar } from "@nextui-org/react";
import Image from "next/image";
import { cookies } from 'next/headers'
import Avatarcomponent from "./Avatarcomponent";
import type DecryptedToken from "@/types/types";
import { decrypt } from "../api/register/route";
import { PrismaClient } from '@prisma/client';




export default async function NavBar() {
  const cookieStore = cookies()
  const sessiontoken = cookieStore.get('sessiontoken')
  let decryptedToken: null | DecryptedToken = null


  if(sessiontoken?.value){
    decryptedToken = decrypt(sessiontoken.value) as DecryptedToken
  }

  return (
    <div className="flex justify-center items-center py-4 bg-gray-950">
      <Navbar
        className="w-2/3 rounded-3xl shadow-lg bg-blue-100 slide-in"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <Link href="/" className="flex items-center text-black">
            <Image src="/img/logo.png" width={50} height={50} alt="Logo" />
            <span className="ml-2 font-bold text-inherit">Encrypto</span>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 fade-in" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/chat">
              Chat
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!decryptedToken && <NavbarItem className="hidden lg:flex fade-in">
            <Link href="/authentication/login">Login</Link>
          </NavbarItem> }
          
          <NavbarItem>
            {!decryptedToken && 
            <Button as={Link} color="primary" href="/authentication/register" variant="flat" className="fade-in">
              Sign Up
            </Button>}
            {
              decryptedToken && <Avatarcomponent username={decryptedToken?.username} email={decryptedToken?.email} image={decryptedToken?.profilepicture} />
            }
       
             
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

