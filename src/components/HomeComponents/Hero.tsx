import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'
import CreativityText from "../../assets/CreativityText.png"
import HeroImg from "../../assets/Hero.png"

export default function Hero() {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroHalf}>
                <div className={styles.heroTexts}>
                    <h1>UNLEASH</h1>
                    <h1>Your Culinary</h1>
                    <Image
                        src={CreativityText}
                        alt={"Creativity Text"}
                        width={350}
                        className="mt-4"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={"mb-20"}
                         width="320" height="63" viewBox="0 0 441 63" fill="none">
                        <path d="M2 57.574C44 40.574 145.9 6.27396 217.5 5.07396C289.1 3.87396 395.667 17.574 440 24.574" stroke="#FC8745" stroke-width="8"/>
                    </svg>
                    <Link href="/generate" className="block py-2 pl-3 pr-4 rounded  ">
                    <button className={styles.generateBtn}>Start Generating</button>
                    </Link>
                </div>

            </div>
            <div className={styles.heroHalf}>
                <div className={styles.heroImg}>
                    <Image
                        src={HeroImg}
                        alt="Picture of the hero"
                        width={1200}
                        height={840}
                    />
                </div>

            </div>
        </div>
    )
}