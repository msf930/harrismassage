"use client";

import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Nav() {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
            <div className={styles.navSpacer}></div>
            <div className={styles.navCont}>
                <div className={styles.logoCont}>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width="80" height="80" />
                    </Link>
                </div>
                <div className={styles.linkCont}>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/packages">Packages</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </div>
    )
}