'use client';

import { NavLinks } from "@/components/ui/navlinks";

export default function Navbar({ userRole }) {
  return ( 
    <nav className="grid items-start px-4 text-sm font-medium">
      <NavLinks userRole={userRole}></NavLinks>
    </nav>
  );
}