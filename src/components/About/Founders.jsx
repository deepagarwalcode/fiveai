import React from "react";
import styles from "./Founders.module.css";

const Founders = () => {
  const founders = [
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Abhinandan Kumar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sapiente aliquam magni!",
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Abhinandan Kumar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sapiente aliquam magni!",
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Abhinandan Kumar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sapiente aliquam magni!",
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Abhinandan Kumar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sapiente aliquam magni!",
    },
  ];
  return (
    <div className={styles.founders}>
      <h1 className={styles.founder_header}>Meet Our Founders</h1>

      <div className={styles.list}>
        {founders.map((founder) => {
          return <Founder founder={founder} />;
        })}
      </div>
    </div>
  );
};

export default Founders;

const Founder = ({ founder }) => {
  return (
    <div className={styles.section}>
      <img src={founder.img} alt="" className={styles.f_image} />
      <p className={styles.f_name}> {founder.name}</p>
      <p className={styles.f_desc}> {founder.desc}</p>
    </div>
  );
};
