"use client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import BlogPostContent from "./BlogPostContent";
import { client } from "../../../sanity/lib/client";
import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";

interface BlogPostPageClientProps {
    id: string;
}

export default function BlogPostPageClient({ id }: BlogPostPageClientProps) {
    const POST_QUERY = `*[_type == "blogPost" && slug.current == $id][0]{
        _id, 
        title, 
        slug, 
        date, 
        excerpt,
        content,
        keywords,
        image { 
            asset -> { _id, url} 
        }
    }`;

    const [post, setPost] = useState<SanityDocument | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(POST_QUERY, { id });
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Calculate reading time
    let wordCount = 0;
    if (post?.content) {
        for (let i = 0; i < post.content.length; i++) {
            if (post.content[i]?.children) {
                post.content[i].children.forEach((child: any) => {
                    if (child?.text) {
                        wordCount += child.text.split(/\s+/).filter((word: string) => word.length > 0).length;
                    }
                });
            }
        }
    }
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    const readingTime = readingTimeMinutes === 1 ? `${readingTimeMinutes} min read` : `${readingTimeMinutes} min read`;

    if (loading) {
        return (
            <div className={styles.blogCont}>
                <div className={styles.navCont}>

                    <Nav />
                    <div className={styles.navSpacer}></div>
                </div>
                <div className={styles.blogInnerCont}>
                    <div className={styles.blogTitleCont}>
                        <h1 className={styles.blogTitlePlaceholder}>Loading...</h1>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles.blogCont}>
                <div className={styles.navCont}>

                    <Nav />
                    <div className={styles.navSpacer}></div>
                </div>
                <div className={styles.blogInnerCont}>
                    <div className={styles.blogTitleCont}>
                        <h1 className={styles.blogTitlePlaceholder}>Post Not Found</h1>
                        <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return <BlogPostContent post={post} readingTime={readingTime} />;
}
