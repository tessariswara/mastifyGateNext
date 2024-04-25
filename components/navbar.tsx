import React from 'react';
import Link from 'next/link';
import Navstyle from '../app/navbar.module.css'

const Navbar: React.FC = () => {
  return (
    <nav className={Navstyle.navbar}>
        <div className={Navstyle.navbarLi}>
            <div className={Navstyle.navbarLogo}>
                <Link href="/home">Logo Mastify</Link>
            </div>
            <div className={Navstyle.navbarUser}>
                <li><Link href="/">Mang Ujang</Link></li>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
