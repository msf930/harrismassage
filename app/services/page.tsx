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
            priceAmount
            }
          },
          
        },
       
}`
  const options = { next: { revalidate: 30 } };
  const [servicesPageData, setServicesPageData] = useState<SanityDocument[] | null>(null);


  useEffect(() => {
    const fetchServicesPageData = async () => {
      const data = await client.fetch(SERVICES_PAGE_QUERY, {}, options);
      console.log(data);
      setServicesPageData(data);
    };
    fetchServicesPageData();

  }, []);




  return (
    <div className={styles.servicesCont}>
      <Nav />
      <div className={styles.servicesInnerCont}>
        {servicesPageData?.[0]?.serviceSections.map((section, index) => {
          return (
            <div key={index}>
              <div className={styles.servicesTitleCont}>
                <h1 className={styles.servicesTitle}>{section.title}</h1>
                <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
              </div>
              <div className={styles.servicesDescriptionCont}>
                <div className={styles.servicesDescription}>
                  <PortableText value={section.description} />
                </div>
                <div className={styles.servicesServicesCont}>
                  {section.services.map((serviceItem, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={index} className={isEven ? styles.servicesServiceItemEven : styles.servicesServiceItemOdd}>
                        <div className={styles.servicesServiceImageCont}>
                          <Image src={urlFor(serviceItem.image).url()} alt={serviceItem.title} fill objectFit="contain" />
                          {/* <img src={urlFor(serviceItem.image).width(500).height(500).url()} alt={serviceItem.title}/> */}
                        </div>
                        <div className={styles.servicesServiceInfoCont}>
                          <div className={styles.servicesServiceTitleCont}>
                            <h2 className={styles.servicesServiceTitle}>{serviceItem.title}</h2>
                          </div>
                          <div className={styles.servicesServiceDescriptionCont}>
                            <PortableText value={serviceItem.description} />
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
                                    <Link href={servicesPageData?.[0]?.vagaroUrl} className={styles.servicesServicePriceBtn}>Book Now</Link>

                                    
                                    
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