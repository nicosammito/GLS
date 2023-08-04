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

    return (
        <div>
            <Head>
                <title>GLS - Markenversprechen</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>

                <div className={"main__dot"}/>
                <div className={"main__content"}>
                    {!clickedForword ? <h1 style={{color: "white"}}>Nimm Dir einen Augenblick für unser Markenversprechen</h1> :null}
                    <button onClick={event => setClickedForword(1)}>Starten</button>
                    <Box animated={!!clickedForword}/>
                </div>


            </main>

        </div>
    )
}

export default Home;
