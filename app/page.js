import Image from "next/image";
import Nav from "../app/components/Nav";
import HomeServices from "../app/components/HomeServices";
import Link from "next/link";
import ContactForm from "../app/components/ContactForm";
import Footer from "../app/components/Footer";

export default function Home() {
  return (
    <div className="homeCont">
      <Nav />
      {/* <div className="heroSpacer"></div> */}
      <div className="heroContFloat">
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
          <Image src="/homeHero.png" alt="massage rocks" fill objectFit="contain" />
        </div>
      </div>
      <div className="homeSecondCont">
        <HomeServices />
        <div className="homeConditionsCont">
          <h2 className="homeConditionsTitle">Conditions</h2>
          <Image src="/heroTextVec.png" alt="line" width={226} height={15} />
          <div className="homeConditionsList">
            <div className="homeConditionsItem">
              <h3 className="homeConditionsItemTitle">Back Pain</h3>
              <p className="homeConditionsItemDescription">
                Back pain is one of the most common conditions we treat,
                offering effective solutions for both acute and chronic discomfort.
                Through targeted chiropractic adjustments and tailored therapies, we
                address the root causes of back pain to help you regain mobility and enjoy
                a pain-free life.
              </p>
            </div>
            <div className="homeConditionsItem">
              <h3 className="homeConditionsItemTitle">Sports Injuries</h3>
              <p className="homeConditionsItemDescription">
                Sports injuries can impact performance and daily life, but our chiropractic care is designed to promote healing and prevent recurrence. By combining targeted adjustments with rehabilitation techniques, we help athletes recover faster and enhance their physical well-being.
              </p>
            </div>
            <div className="homeConditionsItem">
              <h3 className="homeConditionsItemTitle">Rehabilitation</h3>
              <p className="homeConditionsItemDescription">
                Rehabilitation focuses on restoring strength, mobility, and function after an injury or surgery. Our personalized chiropractic approach combines targeted therapies and exercises to support your recovery and help you return to your daily activities with confidence.
              </p>
            </div>
          </div>
          <Link href="/contact" className="homeHeroBtn">Contact Us</Link>
        </div>
        <div className="homeTestimonailsCont">
          <h2 className="homeTestimonailsTitle">Testimonials</h2>
          <Image src="/heroTextVec.png" alt="line" width={298} height={15} />
          <div className="homeTestimonailsList">
            <div className="homeTestimonailsItem">
              <p className="homeTestimonailsItemDescription">
                Ian does a great job. Understands the body and tailors the massage to your needs! Highly recommended
              </p>
              <p className="homeTestimonailsItemAuthor">Dennis S</p>
            </div>
            <div className="homeTestimonailsItem">
              <p className="homeTestimonailsItemDescription">
                Ian is always amazing. I have been seeing him for a very long time. I got into a car accident last week and Ian. Hes so good at knowing where to massage to relieve the stress and pain.
              </p>
              <p className="homeTestimonailsItemAuthor">Cindy L</p>
            </div>
            <div className="homeTestimonailsItem">
              <p className="homeTestimonailsItemDescription">
                Fantastic Therapist! Very knowledgeable and competent!
              </p>
              <p className="homeTestimonailsItemAuthor">Mike G</p>
            </div>
          </div>
        </div>
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
