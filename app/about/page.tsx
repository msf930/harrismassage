"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import { PortableText } from "@portabletext/react";


export default function About() {

    const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"]{
        
        aboutSections[]->{
          title,
          description[]{
            _type,
            children[]{
              _type,
              text
            }
          },
          image{
            asset->{
              url
            }
          }
        },
       
      }`
    const options = { next: { revalidate: 30 } };
    const [aboutPageData, setAboutPageData] = useState<SanityDocument[] | null>(null);
    

    useEffect(() => {
        const fetchAboutPageData = async () => {
            const data = await client.fetch(ABOUT_PAGE_QUERY, {}, options);
            console.log(data);
            setAboutPageData(data);
        };
        fetchAboutPageData();

    }, []);

    return (
        <div className={styles.aboutCont}>
            <Nav />
            <div className={styles.aboutInnerCont}>
                {aboutPageData?.[0]?.aboutSections.map((section, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div
                            key={section._key}

                        >
                            <div className={styles.aboutTitleCont}>
                                <h1 className={styles.aboutTitle}>{section.title}</h1>
                                <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                            </div>
                            <div className={styles.aboutBackgroundCont}>
                                <div className={isEven ? styles.aboutBackgroundImageCont : styles.aboutApproachImageCont}>
                                    <div className={isEven ? styles.aboutBackgroundImageContInner : styles.aboutApproachImageContInner}>
                                        <Image src={section.image.asset.url} alt={section.title} fill objectFit="contain" />
                                    </div>
                                </div>
                                <div className={isEven ? styles.aboutBackgroundTextCont : styles.aboutApproachTextCont}>
                                    <div className={isEven ? styles.aboutBackgroundText : styles.aboutApproachText}>
                                        <PortableText value={section.description} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className={styles.aboutServicesBtnCont}>
                    <Link href="/services" className={styles.aboutBtn}>View Services</Link>
                </div>


            </div>
            <Footer />
        </div>
    );
}
