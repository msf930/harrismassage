import { Metadata } from "next";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import BlogPostPageClient from "./BlogPostPageClient";

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

async function getPost(id: string) {
    try {
        const post = await client.fetch(POST_QUERY, { id });
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return {
            title: "Post Not Found | Harris Therapeutic Massage",
            description: "The blog post you're looking for could not be found.",
        };
    }

    const baseUrl = "https://harristherapeuticmassage.com/";
    const postUrl = `${baseUrl}/blog/${id}`;
    const imageUrl = post.image?.asset?.url 
        ? urlFor(post.image).width(1200).height(630).url() 
        : `${baseUrl}/logo.png`;

    // Extract text from content for description fallback
    let description = post.excerpt || "Read this blog post from Harris Therapeutic Massage";
    if (!post.excerpt && post.content) {
        const textContent = post.content
            .filter((block: any) => block._type === 'block')
            .map((block: any) => 
                block.children?.map((child: any) => child.text).join(' ')
            )
            .join(' ')
            .substring(0, 160);
        if (textContent) {
            description = textContent + (textContent.length >= 160 ? '...' : '');
        }
    }

    const keywords = post.keywords && Array.isArray(post.keywords) 
        ? post.keywords.join(', ') 
        : 'massage, massage therapy, Broomfield, CO';

    return {
        title: `${post.title} | Harris Therapeutic Massage`,
        description: description,
        keywords: keywords,
        authors: [{ name: "Harris Therapeutic Massage", url: baseUrl }],
        creator: "Harris Therapeutic Massage",
        publisher: "Harris Therapeutic Massage",
        openGraph: {
            title: post.title,
            description: description,
            url: postUrl,
            siteName: "Harris Therapeutic Massage",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            locale: "en_US",
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: description,
            images: [imageUrl],
        },
        alternates: {
            canonical: postUrl,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BlogPostPageClient id={id} />;
}

