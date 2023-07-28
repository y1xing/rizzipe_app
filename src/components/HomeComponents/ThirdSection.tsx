import Image from 'next/image'
import styles from './Home.module.css'
import YouText from "../../assets/YOU.png"
import YF from "../../assets/YF.png"


export default function ThirdSection() {
    return (
        <div className={styles.thirdSectionContainer}>

            <h2>What People Are Saying</h2>
            <div className={styles.youText}>
            <h1>Hear from some of</h1>
                <div className={styles.youTexts}>
                    <Image
                        src={YouText}
                        alt={"You Text"}
                        width={150}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="144" height="33" viewBox="0 0 144 33" fill="none">
                        <path d="M3 28C16.3288 20.5629 48.6669 5.55733 71.3893 5.03236C94.1116 4.50738 127.931 10.5008 142 13.5632" stroke="#FC8745" stroke-width="10"/>
                    </svg>
                </div>
            </div>

            <div className={styles.testiContainer}>
                <div className={styles.testHalf}>
                    <p>
                        “Rizzipe is incredibly convenient! It matches recipes to my ingredients effortlessly, saving me time and making cooking a breeze. Highly recommended!”
                    </p>
                    <p>
                        Dr Wong Yu Fei

                    </p>
                    <p>Doctor at Harvard</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="39" viewBox="0 0 273 39" fill="none">
                        <path d="M2 34C27.8904 24.6227 90.7055 5.70272 134.842 5.0408C178.979 4.37887 244.671 11.9358 272 15.7971" stroke="#FC8745" stroke-width="8"/>
                    </svg>
                </div>
                <div className={styles.testHalf}>
                    <Image
                        src={YF}
                        alt={"Yu Fei"}
                        height={800}
                        />
                </div>
            </div>
        </div>

    )
}