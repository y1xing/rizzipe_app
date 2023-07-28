import Image from 'next/image'
import styles from './Home.module.css'
import Hero from "../assets/Hero.png"
import CreativityText from "../assets/CreativityText.png"
import AdventureText from "../assets/ADVENTURE.png"
import SecondSectionImg from "../assets/SecondSection.png"
import HeroSection from "../components/HomeComponents/Hero"
import SecondSection from "../components/HomeComponents/SecondSection"
import ThirdSection from "../components/HomeComponents/ThirdSection"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <HeroSection/>
        <SecondSection/>
        <ThirdSection/>
        <svg
            className={styles.backgroundShape}
            xmlns="http://www.w3.org/2000/svg" width="100%" height="1000" viewBox="0 0 1727 1178" fill="none">
            <path d="M99.3992 65.972C71.587 14.7937 21.5447 0.666384 0 0V1157.01C48.8019 1164.01 164.131 1177.7 235.033 1176.5C323.659 1175 536.168 1155.01 626.754 1146.01C717.339 1137.02 1004.27 1178 1135.01 1178C1265.75 1178 1436.15 1151.51 1532.12 1142.52C1608.9 1135.32 1694.03 1153.84 1727 1164.01V462.304C1676.57 522.778 1571.78 547.268 1532.12 542.27C1492.46 537.272 1458.67 517.28 1385.71 490.292C1312.76 463.303 1204.54 501.287 1113.96 517.28C1023.37 533.274 988.606 529.775 953.841 517.28C919.075 504.786 865.214 458.305 839.262 424.82C813.311 391.334 743.291 360.847 698.243 351.851C653.195 342.854 591.988 374.841 553.796 387.336C515.603 399.83 388.293 415.824 323.659 387.336C259.026 358.848 134.164 129.945 99.3992 65.972Z" fill="#FFF0E7"/>
        </svg>



    </div>


  )
}
