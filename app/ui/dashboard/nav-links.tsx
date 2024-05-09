'use client';
import { HomeIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { getUserInfo, GetUserResponse } from '@/app/lib/backend/user';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function NavLinks() {
  const pathName = usePathname();
  const [links, setLinks] = useState([
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
  ]);

  useEffect(() => {
    const accessToken = getCookie('access_token_learning_platform')!;
    getUserInfo(accessToken!).then((getUserResponse: GetUserResponse) => {
      const newLinks = [...links];
      if (getUserResponse.role === 'Teacher') {
        console.log('Teacher');
        newLinks.push({
          name: 'Create Zoom Meeting',
          href: '/dashboard/create-meeting',
          icon: VideoCameraIcon,
        });
      }
      if (getUserResponse.role === 'Student') {
        console.log('Student');
        newLinks.push({
          name: 'Join Zoom Meeting',
          href: '/dashboard/join-meeting',
          icon: VideoCameraIcon,
        });
      }
      setLinks(newLinks);
    });
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathName === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
