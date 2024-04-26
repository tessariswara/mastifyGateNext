import React from 'react';
import Link from 'next/link';
import Navstyle from '../app/navbar.module.css'

const Navbar: React.FC = () => {
  return (
    <nav className={Navstyle.navbar}>
        <div className={Navstyle.navbarLi}>
          <div className={Navstyle.navbarLayout}>
              <div className={Navstyle.navbarLogo}>
                <Link href="/home"><img src="/images/habitatMenu.png" alt="" /></Link>
              </div>
          </div>
          <div className={Navstyle.navLayout}>
            <div className={Navstyle.content}>
                <div className={Navstyle.navbarHeadline}>
                    <p>MAIN MENU</p>
                </div>
                <div className={Navstyle.navbarMenu}>
                  <li><Link href="/">
                    <div className={Navstyle.navbarMenuContent}>
                      <img src="/images/Dashboard.svg" alt="" />
                      <p>Dashboard</p>
                    </div>
                  </Link></li>
                  <li><Link href="/">
                    <div className={Navstyle.navbarMenuContent}>
                      <img src="/images/Controlling.svg" alt="" />
                      <p>Device Controlling</p>
                    </div>
                  </Link></li>
                  <li><Link href="/">
                    <div className={Navstyle.navbarMenuContent}>
                      <img src="/images/Monitoring.svg" alt="" />
                      <p>Device Monitoring</p>
                    </div>
                  </Link></li>
                  <li><Link href="/">
                    <div className={Navstyle.navbarMenuContent}>
                      <img src="/images/Gate.svg" alt="" />
                      <p>Gate Access</p>
                    </div>
                  </Link></li>
                </div>
            </div>
              <div className={Navstyle.content}>
                <div className={Navstyle.navbarHeadline}>
                    <p>PREFERENCES</p>
                </div>
                <div className={Navstyle.navbarMenu}>
                    <li><Link href="/">
                      <div className={Navstyle.navbarMenuContent}>
                        <img src="/images/Setting.svg" alt="" />
                        <p>Setting</p>
                      </div>
                    </Link></li>
                    <li><Link href="/">
                      <div className={Navstyle.navbarMenuContent}>
                        <img src="/images/Help.svg" alt="" />
                        <p>Help Center</p>
                      </div>
                    </Link></li>
                    <li><Link href="/">
                      <div className={Navstyle.navbarMenuContent}>
                        <img src="/images/Mode.svg" alt="" />
                        <p>Mode</p>
                      </div>
                    </Link></li>
                </div>
              </div>
          </div>
          <div className={Navstyle.navbarUsr}>
            <img src="/images/User.png" alt="" />
            <div className={Navstyle.navbarUserText}>
              <h4>Nazril Irham</h4>
              <p>Administrator</p>
            </div>
          </div>
          <div className={Navstyle.navbarLogout}>
            <img src="/images/Logout.svg" alt="" />
            <p>Logout</p>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
