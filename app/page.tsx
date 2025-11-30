"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Nav from "./components/Nav";
import HomeServices from "./components/HomeServices";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/sanityImageUrl"
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";
import { useScroll, useTransform, motion } from "motion/react"

export default function Home() {

  const HOME_PAGE_QUERY = `*[_type == "homePage"]{
    heroImage{
      asset->{
        url
      }
    },
    services[]->{
      title,
      image{
        _type,
        crop,
        hotspot,
        asset->{
          url
        }
      },
    },
    conditions[]->{
      title,
      description[]{
        _type,
        children[]{
          _type,
          text
        }
      }
    },
    testimonials[]->{
      testimonial,
      author
    }
  }`
  const [homePageData, setHomePageData] = useState<SanityDocument[] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      const data = await client.fetch(HOME_PAGE_QUERY);
      
      setHomePageData(data);
    };
    fetchHomePageData();

  }, []);

  // Track scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Create parallax transform - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);




  return (
    <div className="homeCont">
      <Nav />
      {/* <div className="heroSpacer"></div> */}
      <div className="heroContFloat" ref={heroRef}>
        <div className="heroCont">
          <div className="heroText">
            <div className="heroTextTitleCont">
              <h1 className="heroTextTitle">Harris Therapeutic Massage</h1>
              <Image src="/heroTextVec.png" alt="line" width={397} height={15} />
            </div>
            <h2 className="heroTextSub">Integrative Pain Relief</h2>
            <Link href="/services" className="homeHeroBtn">
              Book Now
            </Link>
          </div>
          {homePageData?.[0]?.heroImage?.asset?.url && (
            <motion.div
              style={{
                y: imageY,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={homePageData?.[0]?.heroImage?.asset?.url}
                alt="massage rocks"
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
      <div className="homeSecondCont">
        {homePageData?.[0]?.services?.length > 0 && (
          <HomeServices services={homePageData?.[0]?.services} />
        )}
        <div className="homeConditionsCont">
          <h2 className="homeConditionsTitle">Conditions</h2>
          <Image src="/heroTextVec.png" alt="line" width={226} height={15} />
          <div className="homeConditionsList">
            {homePageData?.[0]?.conditions?.length > 0 && (
              homePageData?.[0]?.conditions?.map((condition) => (
                <div className="homeConditionsItem" key={condition.title}>
                  <h3 className="homeConditionsItemTitle">{condition.title}</h3>
                  <div className="homeConditionsItemDescription">
                    <PortableText value={condition.description} />
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/contact" className="homeHeroBtn">Contact Us</Link>
        </div>
        <div className="homeTestimonailsCont">
          <h2 className="homeTestimonailsTitle">Testimonials</h2>
          <Image src="/heroTextVec.png" alt="line" width={298} height={15} />
          <div className="homeTestimonailsList">
            {homePageData?.[0]?.testimonials?.length > 0 && (
              homePageData?.[0]?.testimonials?.map((testimonial) => (
                <div className="homeTestimonailsItem" key={testimonial.testimonial}>
                  <p className="homeTestimonailsItemDescription">{testimonial.testimonial}</p>
                  <p className="homeTestimonailsItemAuthor">{testimonial.author}</p>
                </div>
              ))
            )}
          
          </div>
        </div>
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
