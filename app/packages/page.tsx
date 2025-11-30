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

export default function Packages() {
  const PACKAGES_PAGE_QUERY = `*[_type == "packagesPage"]{
        
  vagaroUrl,
        packageSections[]->{
          title,
          description,
          packages[]->{
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
            packagePrices[]->{
            durationInMinutes,
            priceAmount
            }
          },
          
        },
       
}`
  const [packagesPageData, setPackagesPageData] = useState<SanityDocument[] | null>(null);


  useEffect(() => {
    const fetchPackagesPageData = async () => {
      const data = await client.fetch(PACKAGES_PAGE_QUERY);
      console.log(data);
      setPackagesPageData(data);
    };
    fetchPackagesPageData();

  }, []);




  return (
    <div className={styles.packagesCont}>
      <Nav />
      <div className={styles.packagesInnerCont}>
        {packagesPageData?.[0]?.packageSections.map((section, index) => {
          return (
            <div key={index}>
              <div className={styles.packagesTitleCont}>
                <h1 className={styles.packagesTitle}>{section.title}</h1>
                <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
              </div>
              <div className={styles.packagesDescriptionCont}>
                <div className={styles.packagesDescription}>
                  <PortableText value={section.description} />
                </div>
                <div className={styles.packagesPackagesCont}>
                  {section.packages.map((packageItem, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={index} className={isEven ? styles.packagesPackageItemEven : styles.packagesPackageItemOdd}>
                        <div className={styles.packagesPackageImageCont}>
                          <Image src={urlFor(packageItem.image).url()} alt={packageItem.title} fill objectFit="contain" />
                          {/* <img src={urlFor(packageItem.image).width(500).height(500).url()} alt={packageItem.title}/> */}
                        </div>
                        <div className={styles.packagesPackageInfoCont}>
                          <div className={styles.packagesPackageTitleCont}>
                            <h2 className={styles.packagesPackageTitle}>{packageItem.title}</h2>
                          </div>
                          <div className={styles.packagesPackageDescriptionCont}>
                            <PortableText value={packageItem.description} />
                          </div>
                          <div className={styles.packagesPackagePriceCont}>
                            {packageItem.packagePrices.map((priceItem, index) => {
                              return (
                                <div key={index} className={styles.packagesPackagePriceItem}>
                                  {priceItem.durationInMinutes === 0 || priceItem.durationInMinutes === null
                                    ? <p className={styles.packagesPackagePriceDuration}></p>
                                    : <p className={styles.packagesPackagePriceDuration}>{priceItem.durationInMinutes} minutes</p>}
                                  <p className={styles.packagesPackagePrice}>${priceItem.priceAmount}</p>
                                  <div className={styles.packagesPackagePriceBtnCont}>
                                    <Link href={packagesPageData?.[0]?.vagaroUrl} className={styles.packagesPackagePriceBtn}>Purchase</Link>

                                    
                                    
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