import styles from "./styles.module.css"
import Image from "next/image";

export default function Footer() {
    return (
        <div>
            <div className={styles.footerBufferCont}></div>
            <div className={styles.footerCont}>
                <div className={styles.footerLogoCont}>
                    <Image src="/logo.png" alt="logo" height={50} width={50} />
                </div>
                <h1>Harris Therapeutic Massage</h1>
                <div className={styles.footerInfo}>
                    <p>720-341-4209 | harristherapeuticmassage@gmail.com</p>
                    <p>11811 Upham St Unit J-1, Broomfield, CO 80020</p>
                </div>
                <div className={styles.footerCopyright}>
                    <p>© 2025 Harris Therapeutic Massage powered by Serval Designs</p>
                </div>
            </div>
        </div>
    );
}