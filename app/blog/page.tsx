'use client';

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import BlogThumbnail from "../components/BlogThumbnail";
import { useState, useEffect } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
export default function Blog() {
    const BLOG_PAGE_QUERY = `
   *[_type == "blogPost"] | order(date desc) {
  title,
    slug,
    excerpt,
    content,
    image{
      asset->{
        url
      }
    },
  date
  
  
}
    `
    const options = { next: { revalidate: 30 } };
    const truncate = (text: string) => {
        const words = text.split(" ");
        if (words.length > 20) {
            return words.slice(0, 20).join(" ") + "...";
        }
        return text;
    };
    const [blogPageData, setBlogPageData] = useState<SanityDocument[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(true);

    const POSTS_PER_PAGE = 6;

    const getPostsQuery = (page: number) => {
        const start = (page - 1) * POSTS_PER_PAGE; // +1 to skip featured post
        const end = start + POSTS_PER_PAGE;
        return `*[_type == "blogPost"]|order(date desc)[${start}...${end}]{_id, title, slug, date, image { asset -> { _id, url } }, excerpt, content}`;
    };

    // Get total count for pagination (excluding featured post)
    const TOTAL_POSTS_QUERY = `count(*[_type == "blogPost"])`;

    // Check if there's a next page
    const getNextPageQuery = (page: number) => {
        const start = page * POSTS_PER_PAGE + 1;
        const end = start + POSTS_PER_PAGE - 1;
        return `count(*[_type == "blogPost"]|order(date desc)[${start}...${end}])`;
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {


                // console.log(featured);
                // Fetch paginated posts
                const fetchedPosts = await client.fetch(getPostsQuery(currentPage));
                setBlogPageData(fetchedPosts);

                // Get total count
                const total = await client.fetch(TOTAL_POSTS_QUERY);
                setTotalPosts(total);

                // Check if there's a next page
                const nextPageCount = await client.fetch(getNextPageQuery(currentPage));
                setHasNextPage(nextPageCount > 0);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }

            setLoading(false);
        };

        fetchData();
    }, [currentPage]);

    const totalPages = Math.ceil((totalPosts - 1) / POSTS_PER_PAGE); // -1 for featured post

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.blogCont}>
            <div className={styles.navCont}>

                <Nav />
                <div className={styles.navSpacer}></div>
            </div>
            <div className={styles.blogInnerCont}>
                <div className={styles.blogInnerInnerCont}>
                    <div className={styles.blogTitleCont}>
                        <h1 className={styles.blogTitle}>Recent Posts</h1>
                        <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                    </div>
                    <div className={styles.blogTitleContMobile}>
                        <h1 className={styles.blogTitle}>Recent Posts</h1>
                        <Image src="/heroTextVec.png" alt="line" width={146} height={15} />
                    </div>
                    <div className={styles.blogPostsCont}>
                        {blogPageData?.map((post) => (
                            <BlogThumbnail key={post._id} post={post} />
                        ))}
                    </div>
                    <div className={styles.blogPaginationCont}>
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <div className={styles.paginationInfo}>
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className={styles.paginationControls}>
                                    {currentPage > 1 && (
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={styles.paginationButton}
                                        >
                                            ← Previous
                                        </button>
                                    )}

                                    <div className={styles.pageNumbers}>
                                        {(() => {
                                            if (currentPage === 1) {
                                                // Show pages 1, 2, 3 (or fewer if total pages < 3)
                                                const pagesToShow = [1, 2, 3].filter(page => page <= totalPages);
                                                return pagesToShow.map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ''}`}
                                                    >
                                                        {page}
                                                    </button>
                                                ));
                                            } else if (currentPage === 2) {
                                                // Show pages 1, 2, 3 (or fewer if total pages < 3)
                                                const pagesToShow = [1, 2, 3].filter(page => page <= totalPages);
                                                return pagesToShow.map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ''}`}
                                                    >
                                                        {page}
                                                    </button>
                                                ));
                                            } else if (currentPage >= 3) {
                                                // Show page 1, ellipsis, current page, and next page (or previous page if on last page)
                                                const elements = [
                                                    <button
                                                        key={1}
                                                        onClick={() => handlePageChange(1)}
                                                        className={styles.pageNumber}
                                                    >
                                                        1
                                                    </button>,
                                                    <span key="ellipsis" className={styles.ellipsis}>...</span>
                                                ];

                                                // Add previous page if on the last page
                                                if (currentPage === totalPages && currentPage > 3) {
                                                    elements.push(
                                                        <button
                                                            key={currentPage - 1}
                                                            onClick={() => handlePageChange(currentPage - 1)}
                                                            className={styles.pageNumber}
                                                        >
                                                            {currentPage - 1}
                                                        </button>
                                                    );
                                                }

                                                // Add current page
                                                elements.push(
                                                    <button
                                                        key={currentPage}
                                                        onClick={() => handlePageChange(currentPage)}
                                                        className={`${styles.pageNumber} ${styles.pageNumberActive}`}
                                                    >
                                                        {currentPage}
                                                    </button>
                                                );

                                                // Add next page if it exists and not on last page
                                                if (currentPage + 1 <= totalPages) {
                                                    elements.push(
                                                        <button
                                                            key={currentPage + 1}
                                                            onClick={() => handlePageChange(currentPage + 1)}
                                                            className={styles.pageNumber}
                                                        >
                                                            {currentPage + 1}
                                                        </button>
                                                    );
                                                }

                                                return elements;
                                            }

                                            return null;
                                        })()}
                                    </div>

                                    {hasNextPage && (
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={styles.paginationButton}
                                        >
                                            Next →
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}