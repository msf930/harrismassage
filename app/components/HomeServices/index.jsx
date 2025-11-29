"use client";

import { useEffect, useState, useRef } from "react"
import styles from "./styles.module.css"
import Image from "next/image";
import Link from "next/link";

export default function HomeServices({ services }) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [direction, setDirection] = useState('next');
    const [prevSegment, setPrevSegment] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [textContPos, setTextContPos] = useState(0);
    const [imageContPos, setImageContPos] = useState(0);

    const intervalRef = useRef(null);
    const currentSegmentRef = useRef(0);

    const segments = services?.map((service) => ({
        id: service._key,
        title: service.title,
        image: service.image.asset.url
    }));

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setDirection('next');
            setPrevSegment(currentSegmentRef.current);
            setCurrentSegment((prev) => {
                currentSegmentRef.current = (prev + 1) % segments.length;
                return currentSegmentRef.current;
            });
        }, 5000);
    };

    const goToNext = () => {
        setDirection('next');
        setPrevSegment(currentSegment);
        setCurrentSegment((prev) => {
            const newValue = (prev + 1) % segments.length;
            currentSegmentRef.current = newValue;
            return newValue;
        });
        resetInterval();
    };

    const goToPrevious = () => {
        setDirection('prev');
        setPrevSegment(currentSegment);
        setCurrentSegment((prev) => {
            const newValue = (prev - 1 + segments.length) % segments.length;
            currentSegmentRef.current = newValue;
            return newValue;
        });
        resetInterval();
    };

    const goToSegment = (index) => {
        setDirection(index > currentSegment ? 'next' : 'prev');
        setPrevSegment(currentSegment);
        currentSegmentRef.current = index;
        setCurrentSegment(index);
        resetInterval();
    };

    // Update ref when currentSegment changes
    useEffect(() => {
        currentSegmentRef.current = currentSegment;
    }, [currentSegment]);

    // Get window width and handle resize
    useEffect(() => {
        // Set initial window width
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
            if(window.innerWidth > 1920){
                setTextContPos(30)
                setImageContPos(60)
            } else if(window.innerWidth < 850){
                setTextContPos(50)
                setImageContPos(50)
            } else {
                setTextContPos(((850 / window.innerWidth) * 30)+ 20)
                setImageContPos(65 - ((850 / window.innerWidth)* 15 ))
            }
        };
        
        // Set initial value
        updateWindowWidth();
        
        // Add resize listener
        window.addEventListener('resize', updateWindowWidth);
        
       
        // Cleanup
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.servicesCont}>
            <div className={styles.carouselWrapper}>
                <button 
                    className={styles.navButton}
                    onClick={goToPrevious}
                    aria-label="Previous segment"
                >
                    ←
                </button>
                
                <div className={styles.carouselTrack}>
                    {segments.map((segment, index) => {
                        const isActive = index === currentSegment;
                        const isPrev = index === prevSegment && index !== currentSegment;
                        let positionClass = styles.segmentNext;
                        
                        if (isActive) {
                            // Active segment enters from the appropriate side
                            positionClass = direction === 'next' ? styles.activeFromRight : styles.activeFromLeft;
                        } else if (isPrev) {
                            // Previous segment exits in the appropriate direction
                            positionClass = direction === 'next' ? styles.exitLeft : styles.exitRight;
                        } else if (index < currentSegment) {
                            // Segments before current are to the left
                            positionClass = styles.segmentPrev;
                        } else {
                            // Segments after current are to the right
                            positionClass = styles.segmentNext;
                        }
                        
                        return (
                            <div
                                key={segment.title}
                                className={`${styles.carouselSegment} ${positionClass}`}
                            >
                                <div className={styles.segmentContent}>
                                    <div className={styles.segmentTextCont} style={{left: textContPos + "%"}}>
                                        <div className={styles.segmentTitleCont}>
                                            <h2 className={styles.segmentTitle}>{segment.title}</h2>
                                        </div>
                                        <Link href="/services" className={styles.homeServiceBtn}>Read More</Link>
                                    </div>
                                    <div className={styles.segmentImageCont} style={{left: imageContPos + "%"}}>
                                        <Image src={segment.image} alt={segment.title} width={693} height={462} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button 
                    className={styles.navButton}
                    onClick={goToNext}
                    aria-label="Next segment"
                >
                    →
                </button>
            </div>

            <div className={styles.indicators}>
                {segments.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${
                            index === currentSegment ? styles.indicatorActive : ""
                        }`}
                        onClick={() => goToSegment(index)}
                        aria-label={`Go to segment ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}