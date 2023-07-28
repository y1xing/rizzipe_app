import Image from 'next/image'
import Link from 'next/link'
import AdventureText from "../../assets/ADVENTURE.png"
import SecondSectionImg from "../../assets/SecondSection.png"
import styles from './Home.module.css'

export default function SecondSection() {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroHalf}>

                <Image
                    src={SecondSectionImg}
                    alt="Picture of the second section"
                    width={1400}
                    height={840}
                />


            </div>
            <div className={styles.heroHalf}>
                <div className={styles.secondSectionTexts}>
                    <h1>Discover Your</h1>
                    <div className={styles.culinaryAdventure}>
                        <h1>Culinary</h1>
                        <div className={styles.adventureTexts}>
                            <Image
                                src={AdventureText}
                                alt={"Adventure Text"}
                                width={350}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="293" height="45" viewBox="0 0 293 45" fill="none">
                                <path d="M2 40C29.8082 28.6826 97.2763 5.84811 144.683 5.04924C192.089 4.25036 262.647 13.3708 292 18.0309" stroke="#FC8745" stroke-width="10"/>
                            </svg>
                        </div>

                    </div>
                    <p>
                        Elevate your cooking experience with Rizzipe. Explore a variety of delicious recipes, personalized to your tastes. Discover, cook, and savor the joy of cooking with Rizzipe.
                    </p>
                </div>
                <Link href="/generate" className="block py-2 pl-3 pr-4 rounded  ">
                <button className={styles.generateBtn}>Start Generating</button>
                </Link>

            </div>
        </div>
    )
}