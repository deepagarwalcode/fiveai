import React from 'react'
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>Five.ai</div>
        <div className={styles.menu_items}>
            <div>Our Values</div>
            <div>Team</div>
            <div>Vision</div>
            <div className={styles.join_waitlist}>Join Waitlist</div>
        </div>
    </div>
  )
}

export default Navbar