
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

export default function BlogThumbnail() {
    return (
        <Link href="/blog/5-signs-your-body-is-asking-for-a-massage">
            <div className={styles.blogThumbnailCont}>
                <div className={styles.blogThumbnailImageCont}>
                    <Image src="/blogThumbTemp.png" alt="blog thumbnail" fill objectFit="cover" />
                </div>
                <div className={styles.blogThumbnailTextCont}>
                    <h3 className={styles.blogThumbnailTitle}>5 Signs Your Body Is Asking for a Massage</h3>
                    <p className={styles.blogThumbnailDescription}>How to Recognize the Early Warning Signs of Stress, Tension, and Muscle Fatigue Before They Slow You Down</p>
                    <p className={styles.blogThumbnailDate}>Nov, 01, 2025</p>
                    <p className={styles.blogThumbnailDate}>5 min Read</p>
                </div>
            </div>
        </Link>
    )
}