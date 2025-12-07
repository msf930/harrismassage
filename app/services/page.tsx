"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import imageUrlBuilder from '@sanity/image-url'
import { urlFor } from '../../sanity/sanityImageUrl'
import { PortableText } from '@portabletext/react'
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import DOMPurify from 'dompurify';
import Script from "next/script";
export default function Services() {
  const SERVICES_PAGE_QUERY = `*[_type == "servicesPage"]{
        
  vagaroUrl,
        serviceSections[]->{
          title,
          description,
          services[]->{
            title,
            description[]{
              _type,
              children[]{
                _type,
                text
              }
            },
            image{
              _type,
              crop,
              hotspot,
              asset->{
                url
              }
            },
            servicePrices[]->{
            durationInMinutes,
            priceAmount,
            vagaroUrl
            }
          },
          
        },
       
}`
  const [servicesPageData, setServicesPageData] = useState<SanityDocument[] | null>(null);


  useEffect(() => {
    const fetchServicesPageData = async () => {
      const data = await client.fetch(SERVICES_PAGE_QUERY);
      console.log(data);
      setServicesPageData(data);
    };
    fetchServicesPageData();

  }, []);

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


  return (
    <div className={styles.servicesCont}>
      <div className={styles.navCont}>

        <Nav />
        <div className={styles.navSpacer}></div>
      </div>
      <div className={styles.servicesInnerCont}>
        {servicesPageData?.[0]?.serviceSections.map((section, index) => {
          return (
            <div key={index}>
              <div className={styles.servicesTitleCont}>
                <h1 className={styles.servicesTitle}>{section.title}</h1>
                <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
              </div>
              <div className={styles.servicesTitleContMobile}>
                <h1 className={styles.servicesTitle}>{section.title}</h1>
                <Image src="/heroTextVec.png" alt="line" width={111} height={15} />
              </div>
              <div className={styles.servicesDescriptionCont}>
                <div className={styles.servicesDescription}>
                  <PortableText value={section.description} />
                </div>
                <div className={styles.servicesServicePriceBtnCont}>
                                    <Link href={servicesPageData?.[0]?.vagaroUrl} className={styles.servicesServicePriceBtn}>Book {section.title}</Link>


                                   

                                  </div>
                <div className={styles.servicesServicesCont}>
                  {section.services.map((serviceItem, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={index} className={isEven ? styles.servicesServiceItemEven : styles.servicesServiceItemOdd}>
                        <div className={styles.servicesServiceImageCont}>
                          <Image src={urlFor(serviceItem.image).url()} alt={serviceItem.title} fill objectFit="cover" />
                          {/* <img src={urlFor(serviceItem.image).width(500).height(500).url()} alt={serviceItem.title}/> */}
                        </div>
                        <div className={styles.servicesServiceInfoCont}>
                          <div className={styles.servicesServiceTitleCont}>
                            <h2 className={styles.servicesServiceTitle}>{serviceItem.title}</h2>
                          </div>
                          <div className={styles.servicesServiceDescriptionCont}>
                            <PortableText value={serviceItem.description} components={portableTextComponents}/>
                          </div>
                          <div className={styles.servicesServicePriceCont}>
                            {serviceItem.servicePrices.map((priceItem, index) => {
                              return (
                                <div key={index} className={styles.servicesServicePriceItem}>
                                  {priceItem.durationInMinutes === 0 || priceItem.durationInMinutes === null
                                    ? <p className={styles.servicesServicePriceDuration}></p>
                                    : <p className={styles.servicesServicePriceDuration}>{priceItem.durationInMinutes} minutes</p>}
                                  <p className={styles.servicesServicePrice}>${priceItem.priceAmount}</p>
                                  <div className={styles.servicesServicePriceBtnCont}>
                                    <Link href={priceItem.vagaroUrl} className={styles.servicesServicePriceBtn}>Book Now</Link>


                                   

                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

      </div>
      <Footer />
    </div>
  );
}