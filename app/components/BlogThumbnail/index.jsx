
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/lib/image";

export default function BlogThumbnail({ post }) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    let wordCount = 0;
    if (post?.content) {
        for (let i = 0; i < post.content.length; i++) {
            if (post.content[i]?.children) {
                post.content[i].children.forEach(child => {
                    if (child?.text) {
                        wordCount += child.text.split(/\s+/).filter(word => word.length > 0).length;
                    }
                });
            }
        }
    }
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    return (
        <Link href={`/blog/${post.slug.current}`}>
            <div className={styles.blogThumbnailCont}>
                <div className={styles.blogThumbnailImageCont}>
                    <Image src={urlFor(post.image).url()} alt={post.title} fill objectFit="cover" />
                </div>
                <div className={styles.blogThumbnailTextCont}>
                    <h3 className={styles.blogThumbnailTitle}>{post.title}</h3>
                    {post.excerpt && (
                        <p className={styles.blogThumbnailDescription}>{post.excerpt}</p>
                    )}
                    <p className={styles.blogThumbnailDate}>{formattedDate}</p>
                    <p className={styles.blogThumbnailDate}>{readingTimeMinutes} min Read</p>
                </div>
            </div>
        </Link>
    )
}