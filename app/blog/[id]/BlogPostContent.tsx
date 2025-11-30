import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../../sanity/lib/image";

// Custom components for PortableText styling
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            return (
                <div className={styles.portableTextImage}>
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog image'}
                        width={800}
                        height={600}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            );
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className={styles.portableTextH1}>{children}</h1>,
        h2: ({ children }: any) => <h2 className={styles.portableTextH2}>{children}</h2>,
        h3: ({ children }: any) => <h3 className={styles.portableTextH3}>{children}</h3>,
        h4: ({ children }: any) => <h4 className={styles.portableTextH4}>{children}</h4>,
        normal: ({ children }: any) => <p className={styles.portableTextP}>{children}</p>,
        blockquote: ({ children }: any) => <blockquote className={styles.portableTextBlockquote}>{children}</blockquote>,
    },
    marks: {
        strong: ({ children }: any) => <strong className={styles.portableTextStrong}>{children}</strong>,
        em: ({ children }: any) => <em className={styles.portableTextEm}>{children}</em>,
        link: ({ value, children }: any) => (
            <a href={value?.href} className={styles.portableTextLink} target={value?.blank ? '_blank' : undefined} rel={value?.blank ? 'noopener noreferrer' : undefined}>
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className={styles.portableTextUl}>{children}</ul>,
        number: ({ children }: any) => <ol className={styles.portableTextOl}>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li className={styles.portableTextLi}>{children}</li>,
        number: ({ children }: any) => <li className={styles.portableTextLi}>{children}</li>,
    },
};


export default function BlogPostContent({ post, readingTime }: { post: any, readingTime: string }) {
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return (
        <div className={styles.blogCont}>
            <Nav />
            <div className={styles.blogInnerCont}>
                <div className={styles.blogContentCont}>
                    <div className={styles.blogHeaderCont}>
                        <div className={styles.blogHeaderInfo}>
                            <p className={styles.blogHeaderInfoItem}>{formattedDate}</p>
                            <p className={styles.blogHeaderInfoItemSeparator}> - </p>
                            <p className={styles.blogHeaderInfoItem}>{readingTime}</p>
                        </div>
                        <div className={styles.blogContentTitleCont}>
                            <h1 className={styles.blogContentTitle}>{post.title}</h1>
                        </div>
                        <div className={styles.blogHeaderExcerptCont}>
                            <p className={styles.blogHeaderExcerpt}>{post.excerpt}</p>
                        </div>
                    </div>
                    <div className={styles.blogContentImageCont}>
                        <Image src={urlFor(post.image).url()} alt={post.title} fill objectFit="contain" />
                    </div>
                    <div className={styles.blogContentBodyCont}>
                        <PortableText value={post.content} components={portableTextComponents} />
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    );
}