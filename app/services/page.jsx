import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";

export default function Services() {
    return (
        <div className={styles.servicesCont}>
            <Nav />
            <div className={styles.servicesInnerCont}>
                <div className={styles.servicesTitleCont}>
                    <h1 className={styles.servicesTitle}>Services</h1>
                    <Image src="/heroTextVec.png" alt="line" width={286} height={15} />
                </div>
                <div className={styles.servicesDescriptionCont}>
                    <p className={styles.servicesDescription}>
                    Whether you&apos;re managing chronic pain, recovering from injury, or simply ready to feel your best again, you&apos;ll receive targeted, results-driven care in a calm and supportive environment. If you&apos;re ready to experience relief that lasts, book your customized session today and start moving toward better balance and lasting comfort.
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}