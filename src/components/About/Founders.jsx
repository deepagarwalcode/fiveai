import React from "react";
import styles from "./Founders.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import FounderDetails from "./FounderDetails";

const Founders = ({ setFounder, showFounder }) => {
  const founders = [
    {
      img: "/founders/rajeev_gupta.png",
      name: "Rajeev Gupta",
      designation: "Co-founder",
      bio: "Rajeev is seasoned Data Scientist and AI Engineer, holding a Master's degree in Computer Applications from JNU, New Delhi. His fervor for data and machine learning fuels his expertise in these fields. With over three decades of extensive experience in Software Engineering, Delivery, Project & Programme Management, he has led successful initiatives in various capacities. Rajeev has hands-on experience in Data Science and AI projects, demonstrating proficiency across diverse industries and applications. Rajeev has worked in UK, Singapore and India.",
    },
    {
      img: "/founders/abhinandan_kumar.png",
      name: "Abhinandan Kumar",
      designation: "Co-Founder",
      bio: "Abhinandan Kumar, an adept human resources strategist and co-founder of Zapnosys AI Pvt Ltd, is recognized for his decade-long expertise across pivotal industries including Power, Airport, and Defense. An MBA graduate from the Indian Institute of Planning and Management. With a provenance in aeronautical engineering and a career that spans continents, Abhinandan’s visionary leadership is propelling the educational tech sphere to new zeniths.",
    },
    {
      img: "/founders/suneel_gupta.png",
      name: "Suneel Gupta",
      designation: "Co-founder",
      bio: "Dr. Suneel Gupta has more than 37 years of experience in IT software and hardware industry. Dr. Suneel has a GCE Certificate from Cambridge University and holds a bachelor’s degree from IIT Kanpur specializing in Electronics & Computer Science [1984]. His career began with Network Ltd. where he was spearheading the development of hardware and firmware products. In Network he is credited with many Innovations including his own Microprocessor. He was also involved in the Design of an ultrasound scanner which is used for Medical Diagnosis. For the last 10 years, Dr.Suneel Gupta has been spearheading the development of Technologies in the Financial Inclusion space and is credited with many innovations in the alternate Banking methodologies. He was also been nominated to a committee formed by the Ministry of Finance which was looking into creating a Rupay Standard for Chip Banking Cards which will allow the country to move away from the Mastercard / Visa platforms. Dr Gupta is also Board Advisor Yogyata and cofounder Zapnosys AI. He is Doctorate in the field of Technology in BFSI",
    },
    {
      img: "/founders/nirmal_bansal.png",
      name: "Nirmal Bansal",
      designation: "Co-founder",
      bio: "A Seasoned Banker and Certified Corporate Director by IICA/MCA and MIOD with around four decades  of experience in Banking and Financial Sector domain of wholesale banking, Govt biz, products and solutions, Financial Inclusion, Digital solutions, payment solutions,Payment Banks and Small Banks, Sales and Marketing, people management, Government Affairs and relations, Public Affairs, Networking, Strategic Planning, Business Development, negotiations and general management. He is mentor to start ups and investor too. Dr. Nirmal Bansal is PhD and D.Litt degrees into Banking & Finance and also Advisory Board Member of Ayekart Fintech, Quicksun Technologies and Co-Founder Zapnosys AI . He is also a distinguished Fellow with SKOCH DEVELOPMENT FOUNDATION a think tank on various policies and socio economic development. Dr. Nirmal Bansal is also Provost of ESRDS France & Vice Chairman of Sorbon International Selection Board and Board Advisor IIPPT Foundation.",
    },
  ];
  return (
    <div className={styles.founders} id="founders">
      <h1 className={styles.founder_header}>Meet Our Founders</h1>

      <div className={styles.list}>
        {founders.map((founder, index) => {
          return (
            <Founder
              founder={founder}
              setFounder={setFounder}
              showFounder={showFounder}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Founders;

const Founder = ({ founder, setFounder, showFounder }) => {
  return (
    <div
      className={styles.section}
      onClick={() => {
        setFounder(founder);
        showFounder()
      }}
    >
      <img src={founder.img} alt="" className={styles.f_image} />
      <p className={styles.f_name}> {founder.name}</p>
      <p className={styles.f_designation}> {founder.designation}</p>
      <p className={styles.f_desc}>
        {" "}
        VIEW BIO <FaArrowRightLong />
      </p>
    </div>
  );
};
