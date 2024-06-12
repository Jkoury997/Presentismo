'use client';

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { HomeIcon, UserRound, ChevronDown } from "lucide-react";

// Definir enlaces según roles
const linksByRole = {
  recursos_humanos: [
    { 
      name: 'Home', 
      href: '/dashboard', 
      icon: HomeIcon 
    },
    { 
      name: 'Employed', 
      href: '/dashboard/recursoshumanos', 
      icon: UserRound,
      subLinks: [
        { 
          name: 'List Employees', 
          href: '/dashboard/recursoshumanos/employed/list' 
        },
        { 
          name: 'Add Employee', 
          href: '/dashboard/recursoshumanos/employed/add' 
        },
        { 
          name: 'Modify Attendance', 
          href: '/dashboard/recursoshumanos/employed/attendance/modify' 
        },
      ] 
    },
  ],
  employed: [
    { 
      name: 'Home', 
      href: '/dashboard', 
      icon: HomeIcon 
    },
  ],
};

export function NavLinks({ userRole }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Obtener enlaces según el rol del usuario
  let links = linksByRole[userRole] || [];

  // Si el usuario es admin, combinar todos los enlaces sin duplicados
  if (userRole === 'admin') {
    const allLinks = Object.values(linksByRole).flat();
    const uniqueLinks = [];

    allLinks.forEach(link => {
      const existingLink = uniqueLinks.find(l => l.name === link.name);
      if (existingLink) {
        existingLink.subLinks = [...new Set([...(existingLink.subLinks || []), ...(link.subLinks || [])])];
      } else {
        uniqueLinks.push(link);
      }
    });

    links = uniqueLinks;
  }

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || link.subLinks?.some(subLink => pathname === subLink.href);
        return (
          <div key={`${link.name}-${index}`}>
            {link.subLinks && link.subLinks.length > 0 ? (
              <>
                <div
                  className={clsx(
                    'flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer',
                    {
                      'text-gray-500 hover:text-gray-900': !isActive,
                      'bg-gray-100 text-gray-900 hover:text-gray-900': isActive,
                    }
                  )}
                  onClick={() => toggleMenu(link.name)}
                >
                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-4 w-4" />
                    {link.name}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenus[link.name] ? 'rotate-180' : ''}`} />
                </div>
                {openMenus[link.name] && (
                  <div className="pl-6">
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={`${subLink.name}-${subIndex}`}
                        href={subLink.href}
                        className={clsx(
                          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all mt-1',
                          {
                            'text-gray-500 hover:text-gray-900': pathname !== subLink.href,
                            'bg-gray-100 text-gray-900 hover:text-gray-900': pathname === subLink.href,
                          }
                        )}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  {
                    'text-gray-500 hover:text-gray-900': pathname !== link.href,
                    'bg-gray-100 text-gray-900 hover:text-gray-900': pathname === link.href,
                  }
                )}
              >
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-4 w-4" />
                  {link.name}
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </>
  );
}
