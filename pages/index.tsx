import Head from 'next/head';
import {GetServerSideProps, NextPage} from "next";

import styles from '../styles/Home.module.scss';
import Box from "../Components/Box";
import {useState} from "react";

interface HomeProps {
    staticPassword: boolean
}

const Home: NextPage<HomeProps> = () => {

    const [clickedForword, setClickedForword] = useState(0);

    return <div>
        <Head>
            <title>GLS - Markenversprechen </title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main>

            <div className={"main__content"}>

                <div className={"main__content__dot"}/>
                <h1 style={{color: "white", opacity: !!clickedForword ? "0%" : "100%"}}>Nimm Dir einen Augenblick für
                    unser Markenversprechen</h1>
                <button style={{opacity: !!clickedForword ? "0%" : "100%"}}
                        onClick={event => setClickedForword(1)}>Starten
                </button>
            </div>

            <Box animated={!!clickedForword}/>

            <div className={"main__name"}>developed by Nico Sammito</div>

        </main>

    </div>
}

export default Home;
