import React from "react";
import styles from "../Page.module.css"; // Assuming you use CSS Modules

const Marquee = () => {
  return (
    <div>
      <div className={styles.marquee}>
        <h1>
          Technology - <span>Coding</span> - Skills -
        </h1>
        <h1>
          Technology - <span>Coding</span> - Skills -
        </h1>
      </div>
      <div className={styles["marquee-rev"]}>
        <h1>
          <span>Study</span> - Non Stop - <span>No Distractions</span> -
        </h1>
        <h1 className="mb-6">
          <span>Study</span> - Non Stop - <span>No Distractions</span> -
        </h1>
      </div>
      <div className={styles.marquee}>
        <h1>
          Technology - <span>Coding</span> - Skills -
        </h1>
        <h1>
          Technology - <span>Coding</span> - Skills -
        </h1>
      </div>
      <div className={styles["marquee-rev"]}>
        <h1>
          <span>Study</span> - Non Stop - <span>No Distractions</span> -
        </h1>
        <h1 className="mb-6">
          <span>Study</span> - Non Stop - <span>No Distractions</span> -
        </h1>
      </div>
    </div>
  );
};

export default Marquee;
