import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";

export default function About() {
    return (
        <div className={styles.aboutCont}>
            <Nav />
            <div className={styles.aboutInnerCont}>
                <div className={styles.aboutTitleCont}>
                    <h1 className={styles.aboutTitle}>My Background</h1>
                    <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                </div>
                <div className={styles.aboutBackgroundCont}>
                    <div className={styles.aboutBackgroundImageCont}>
                        <div className={styles.aboutBackgroundImageContInner}>
                            <Image src="/aboutHead.png" alt="Ian Harris" fill objectFit="contain" />
                        </div>
                    </div>
                    <div className={styles.aboutBackgroundTextCont}>
                        <p className={styles.aboutBackgroundText}>
                            Owner and licensed massage therapist Ian Harris brings over 15 years of hands-on experience and advanced training in medical and therapeutic bodywork. His work focuses on pain relief, mobility restoration, and long-term wellness, offering real results that go beyond relaxation.
                            <br />
                            <br />
                            Ian integrates a personalized blend of modalities, including neuromuscular release, myofascial therapy, deep tissue, lymphatic drainage, and oncology massage, to meet your body&apos;s specific needs.                    </p>
                    </div>
                </div>
                <div className={styles.aboutTitleCont}>
                    <h1 className={styles.aboutTitle}>My Approach</h1>
                    <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                </div>
                <div className={styles.aboutBackgroundCont}>
                    <div className={styles.aboutApproachImageCont}>
                        <div className={styles.aboutApproachImageContInner}>
                            <Image src="/aboutImage.png" alt="massage towels and oils" fill objectFit="contain" />
                        </div>
                    </div>
                    <div className={styles.aboutApproachTextCont}>
                        <p className={styles.aboutApproachText}>
                            Whether you&apos;re managing chronic pain, recovering from injury, or simply ready to feel your best again, you&apos;ll receive targeted, results-driven care in a calm and supportive environment. If you&apos;re ready to experience relief that lasts, book your customized session today and start moving toward better balance and lasting comfort.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
