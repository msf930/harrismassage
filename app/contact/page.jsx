import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <div className={styles.contactCont}>
            <div className={styles.navCont}>

                <Nav />
                <div className={styles.navSpacer}></div>
            </div>
            <div className={styles.contactInnerCont}>
                <ContactForm />
            </div>
            <Footer />
        </div>
    )
}