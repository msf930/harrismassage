"use client";
import Image from "next/image";
import styles from "./styles.module.css"
import HCaptcha from '@hcaptcha/react-hcaptcha';


export default function ContactForm() {
    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };
    return (
        <div className={styles.contactFormCont}>
            <div className={styles.titleCont}>
                <h2 className={styles.contactFormTitle}>Contact Me</h2>
                <Image src="/heroTextVec.png" alt="line" width={215} height={15} />
            </div>
            <div className={styles.titleContMobile}>
                <h2 className={styles.contactFormTitle}>Contact Me</h2>
                <Image src="/heroTextVec.png" alt="line" width={146} height={15} />
            </div>
            <div className={styles.contactFormInner} >
                <form className={styles.contactFormForm} action="https://api.web3forms.com/submit" method="POST">
                    <div className={styles.contactFormFormInfo}>
                        <p className={styles.contactFormFormInfoItem}>720-341-4209 | harristherapeuticmassage@gmail.com</p>
                        <p className={styles.contactFormFormInfoItem}>11811 Upham St Unit J-1, Broomfield, CO 80020</p>
                    </div>
                    <input type="hidden" name="access_key" value="ab7f5051-f043-4812-965d-81a481715513" />
                    <div className={styles.nameSection}>
                        <div className={styles.nameCont}>
                            <p>First Name</p>
                            <input className={styles.formInput} type="text" name="firstName" required />
                        </div>
                        <div className={styles.nameCont}>
                            <p>Last Name</p>
                            <input className={styles.formInput} type="text" name="lastName" required />
                        </div>
                    </div>
                    <p>Email</p>
                    <input className={styles.formInput} type="email" name="email" required />
                    <p>Message</p>
                    <textarea className={styles.formInputArea} name="message" required />
                    <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                    <div className={styles.hCaptchaCont}>
                        <HCaptcha
                            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                            reCaptchaCompat={false}
                            onVerify={onHCaptchaChange}
                            theme="light"
                        />
                    </div>
                    <div className={styles.contactFormFormBtnCont}>
                        <button className={styles.contactFormFormBtn} type="submit">Submit Form</button>
                    </div>
                </form>
            </div>
        </div>
    )
}