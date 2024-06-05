"use client";

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { HomeIcon, LineChartIcon, Settings, ChevronDown, QrCodeIcon,WalletIcon,PersonStandingIcon } from "lucide-react";

const links = [
  { 
    name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
];

export function NavLinks({ onLinkClick }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || link.subLinks?.some(subLink => pathname === subLink.href);
        return (
          <div key={link.name}>
            {link.subLinks ? (
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
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className={clsx(
                          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all mt-1',
                          {
                            'text-gray-500 hover:text-gray-900': pathname !== subLink.href,
                            'bg-gray-100 text-gray-900 hover:text-gray-900': pathname === subLink.href,
                          }
                        )}
                        onClick={onLinkClick}
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
                onClick={onLinkClick}
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
