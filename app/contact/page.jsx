import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <div className={styles.contactCont}>
            <Nav />
            <ContactForm />
            <Footer />
        </div>
    )
}