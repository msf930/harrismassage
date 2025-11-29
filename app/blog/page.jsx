import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import BlogThumbnail from "../components/BlogThumbnail";

export default function Blog() {
    return (
        <div className={styles.blogCont}>
            <Nav />
            <div className={styles.blogInnerCont}>
                <div className={styles.blogInnerInnerCont}>
                    <div className={styles.blogTitleCont}>
                        <h1 className={styles.blogTitle}>Recent Posts</h1>
                        <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                    </div>
                    <div className={styles.blogPostsCont}>
                        <BlogThumbnail />
                        <BlogThumbnail />
                        <BlogThumbnail />
                        <BlogThumbnail />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}