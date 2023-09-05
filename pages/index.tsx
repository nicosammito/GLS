import Head from 'next/head';
import {NextPage} from "next";
import BoxMain from "../Components/BoxMain";
import {useEffect, useState} from "react";
import Select from "react-select";
import {useRouter} from "next/router";
import {useLanguage} from "../Components/Layout/Layout";

interface HomeProps {
    staticPassword: boolean
}

type OptionType = {
    value: string;
    label: string;
};


const Home: NextPage<HomeProps> = () => {

    const [clickedForword, setClickedForword] = useState(0);
    const [active, setActive] = useState(false);
    const router = useRouter();

    const language = useLanguage();


    const options: OptionType[] = [
        {value: 'de_DE', label: 'German'},
        {value: 'en_US', label: 'English'}
    ];

    useEffect(() => {
        if (clickedForword == 1) setActive(true);
    }, [clickedForword])

    return <div>
        <Head>
            <title>GLS - Markenversprechen </title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={active ? "main-active" : ""}>

            <div className={"main__content"}>

                <div className={"main__content__dot"}/>
                <div style={{opacity: !!clickedForword ? "0%" : "100%"}}>
                    <h1 style={{color: "white", opacity: !!clickedForword ? "0%" : "100%"}}>{language["index.heading"]}</h1>
                    <Select className={"select-language"} classNamePrefix={"select-language"} value={router.locale == "de_DE" ? options[0] : options[1]} onChange={newValue => {
                        console.log(newValue)
                        router.push(router.asPath, router.asPath, {locale: `${newValue.value}`})
                    }} options={options}/>
                    <button style={{opacity: !!clickedForword ? "0%" : "100%"}}
                            onClick={() => setClickedForword(1)}>{language["index.start.button"]}
                    </button>
                </div>

            </div>

            <BoxMain animated={!!clickedForword} onChange={index => {
                setActive((index % 2) != 0)
            }}/>

            <div className={"main__name"}>developed by Nico Sammito</div>

        </main>

    </div>
}

export default Home;
