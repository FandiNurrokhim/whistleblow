import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
  HomeIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';


export default function BottomNav() {
  const { url } = usePage();
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(new URL(url, window.location.origin).pathname);
  }, [url]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md lg:hidden z-50">
      <div className="flex justify-around items-center py-2 text-xs">
        <NavItem href="/home" icon={<HomeIcon className="w-6 h-6" />} label="Beranda" active={path.startsWith('/home')} />
        <NavItem href="/favorites" icon={<HeartIcon className="w-6 h-6" />} label="Favorit" active={path.startsWith('/favorites')} />
        <NavItem href="/profile" icon={<UserIcon className="w-6 h-6" />} label="Akun" active={path.startsWith('/profile')} />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, badge, href = '#' }) {
  return (
    <Link href={href} className={`relative flex flex-col items-center text-center ${active ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600`}>
      <div className="relative">
        {icon}
        {typeof badge === 'number' && badge > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] mt-1">{label}</span>
    </Link>
  )
}
