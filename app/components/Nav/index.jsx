"use client";

import { useEffect, useState, useRef } from "react"
import styles from "./styles.module.css"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll } from "motion/react";
import { useMotionValueEvent } from "motion/react";
import { motion } from "motion/react";

export default function Nav() {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [navIcon, setNavIcon] = useState(`${styles.navIconClosed}`);
    const [showNavbar, setShowNavbar] = useState(false);
    const [navContMain, setNavContMain] = useState(`${styles.navContMain}`);
    const [navBarActive, setNavBarActive] = useState(`${styles.navelements}`);
    const [navBarActiveInner, setNavBarActiveInner] = useState(`${styles.navelementsInner}`);
    const [navBackground, setNavBackground] = useState(`${styles.navContMobile}`);
    const [isAtTop, setIsAtTop] = useState(true);
    const scrollPositionRef = useRef(0);

    const handleShowNavbar = () => {
        setShowNavbar((showNavbar) => {
            const newShowNavbar = !showNavbar;

            if (newShowNavbar && !isAtTop) {
                setNavContMain(`${styles.navContMainActive}`);
                setNavBarActive(`${styles.navelementsactive}`);
                setNavBarActiveInner(`${styles.navelementsactiveInner}`);
                setNavIcon(`${styles.navIconOpen}`)
                setNavBackground(`${styles.navContMobileScroll}`);
            } else if (newShowNavbar && isAtTop) {
                setNavContMain(`${styles.navContMainActive}`);
                setNavBarActive(`${styles.navelementsactive}`);
                setNavBarActiveInner(`${styles.navelementsactiveInner}`);
                setNavIcon(`${styles.navIconOpen}`);
                setNavBackground(`${styles.navContMobileScroll}`);
            }
            else if (!newShowNavbar && !isAtTop) {
                setNavContMain(`${styles.navContMain}`);
                setNavBarActive(`${styles.navelements}`);
                setNavBarActiveInner(`${styles.navelementsInner}`);
                setNavIcon(`${styles.navIconClosed}`);
                setNavBackground(`${styles.navContMobileScroll}`);
            }
            else if (!newShowNavbar && isAtTop) {
                setNavContMain(`${styles.navContMain}`);
                setNavBarActive(`${styles.navelements}`);
                setNavIcon(`${styles.navIconClosed}`);
                setNavBackground(`${styles.navContMobile}`);
            }

            return newShowNavbar;
        });
    };

   

    const [hidden, setHidden] = useState(false);



    const pathname = usePathname();

    // Disable scrolling when menu is open
    useEffect(() => {
        if (showNavbar) {
            // Save the current scroll position
            scrollPositionRef.current = window.scrollY;
            // Disable scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling and restore position
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollPositionRef.current);
        }

        // Cleanup function to ensure scrolling is re-enabled on unmount
        return () => {
            if (showNavbar) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollPositionRef.current);
            }
        };
    }, [showNavbar]);

    return (
        <motion.header
           className={navContMain}
            
        >
            {/* <div className={styles.navSpacer}></div> */}
            <nav className={styles.navCont}>
                <div className={styles.logoCont}>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width="80" height="80" />
                    </Link>
                </div>
                <div className={styles.linkCont}>
                    <div>
                        <Link href="/">Home</Link>
                    </div>
                    <div>
                        <Link href="/about">About</Link>
                    </div>
                    <div>
                        <Link href="/services">Services</Link>
                    </div>
                    <div>
                        <Link href="/packages">Packages</Link>
                    </div>
                    <div>
                        <Link href="/blog">Blog</Link>
                    </div>
                    <div>
                        <Link href="/contact">Contact</Link>
                    </div>

                </div>
            </nav>
            <nav className={navBackground}>
                <div className={styles.navLogoMobile}>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" height={50} width={50} />
                    </Link>
                </div>
                <div>
                    <button className={navIcon} onClick={handleShowNavbar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={navBarActive}>
                    <nav className={navBarActiveInner}>
                        <ul>
                            <li>
                                <Link
                                    href="/"
                                    className={pathname === "/" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={pathname === "/about" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className={pathname === "/services" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/packages"
                                    className={pathname === "/packages" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    Packages
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className={pathname === "/blog" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className={pathname === "/contact" ? styles.navMenuLinkActive : styles.navMenuLink}
                                    onClick={handleShowNavbar}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        <div className={styles.mobileNavInfoCont}>
                            <p>720-341-4209</p>
                            <p>harristherapeuticmassage@gmail.com</p>
                            <p>11811 Upham St Unit J-1, Broomfield, CO 80020</p>
                        </div>
                        
                    </nav>
                </div>
            </nav>
        </motion.header>
    )
}