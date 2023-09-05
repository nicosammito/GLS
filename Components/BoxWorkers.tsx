import styles from "../styles/Box.module.scss"
import {FunctionComponent, useEffect, useState} from "react";
import RadioSelection from "./RadioSelection";
import Image from "next/image";
import {useLanguage, useLanguageTranslations} from "./Layout/Layout";

interface BoxProps {
    animated: boolean
    onChange: (index: number) => void
}

const BoxMain: FunctionComponent<BoxProps> = ({animated = false, onChange}) => {

    const [currentState, setCurrentState] = useState<number>(0);


    const [name, setName] = useState<string>("");
    const language = useLanguage();



    useEffect(() => {
        if (animated) setCurrentState(1);
    }, [animated])

    useEffect(() => {
        if (currentState >= 1) {
            onChange(currentState)
        }
    }, [currentState])

    const [allowedState, setAllowedState] = useState({
        1: -1,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    });
    const [config, setConfig] = useState({
        "magier": 0,
        "fuersorger": 0,
        "thinker": 0,
        "feind": 0,
        "liefern": 0,
        "mensch": 0
    });

    const [winner, setWinner] = useState<{ name: string, id: number, image: string, description: string }>({name: "", id: 1, image: "", description: ""});

    const [errorMessage, setErrorMessage] = useState(false)


    const calculatePoints = (id: number) => {
        switch (id) {
            case 1:
                setConfig({...config, magier: config.magier + 1})
                break
            case 2:
                setConfig({...config, fuersorger: config.fuersorger + 1})
                break
            case 3:
                setConfig({...config, thinker: config.thinker + 1})
                break
            case 4:
                setConfig({...config, feind: config.feind + 1})
                break
            case 5:
                setConfig({...config, liefern: config.liefern + 1})
                break
            case 6:
                setConfig({...config, mensch: config.mensch + 1})
        }
    }

    const languageWinner = useLanguageTranslations("box.last")

    const calculateWinner = (config): { name: string, id: number, image: string, description: string } => {

        const dataArray = languageWinner.map((value, index) => {
            return {
                name: `Gratulations ${name}! ${value}`,
                id: index + 1,
                count: config[language[`box.last.${index + 1}.config`]],
                image: language[`box.last.${index + 1}.image`],
                description: language[`box.last.${index + 1}.description`]
            }
        }).map( (_, i, arrCopy) => {
            const rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
            [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
            return arrCopy[i]
        })


        const data = dataArray.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            }
        })

        return {name: data[0].name, id: data[0].id, image: data[0].image, description: data[0].description};

    }

    return <div className={styles["box"]} style={{
        transform: animated ? "translateY(-50%) translateX(-50%)" : "translateY(100%) translateX(-50%)",
        pointerEvents: animated ? "all" : "none",
        opacity: animated ? "100%" : "0",
        padding: currentState == 5 ? "2rem" : "2rem 2rem 6rem"
    }}>

        {errorMessage ? <div className={styles["box__error"]}>Bitte alle Felder ausfüllen.</div> : null}
        {currentState != 5 ? <span>{language["box.scroll.message"]}</span> : null}

        <div className={styles["box__bottom"]}>
            { !errorMessage ? <>
                    <div className={styles["box__buttons"]}>
                        {currentState < 5 ? <button
                            onClick={event => currentState > 1 && setCurrentState(prevState => prevState - 1)}>{language["box.button.backwards"]}</button> : null}
                        {currentState < 5 ? <button onClick={event => {

                            if (currentState == 2 && allowedState["3"] >= 6) {
                                setAllowedState({...allowedState, 3: -1})
                                setCurrentState(3)
                            } else if (currentState == 3 && allowedState["4"] >= 6) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(4)
                            } else if (currentState == 4 && allowedState["5"] >= 6) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(5)
                                const preWinner = calculateWinner(config);
                                setWinner(preWinner);
                            } else if (allowedState[currentState + 1] === -1 && currentState < 5) {
                                setCurrentState(prevState => prevState + 1)
                            } else {
                                setErrorMessage(true);
                                setTimeout(() => {
                                    setErrorMessage(false)
                                }, 3000)
                            }
                        }}>{language["box.button.forwards"]}
                        </button> : null}
                    </div>


                    {
                        currentState < 5 ? <div className={styles["box__points"]}>
                            {
                                [1, 2, 3, 4, 5].map(value => {
                                    return <span key={value}
                                                 className={styles["box__points__point"] + (value == currentState ? (" " + styles["box__points__point-active"]) : "")}/>;
                                })
                            }
                        </div> : null
                    }
                </> : null
            }
        </div>


        <div className={styles["box__content"]} style={{display: currentState <= 1 ? "block" : "none"}}>
            <h1>{language["box.first.title"]}</h1>
            <span>{language["box.first.description"]}</span>

            <input placeholder={"Dein Vorname"} type={"text"} onChange={event => {
                if (event.target.value != "") setAllowedState({...allowedState, 2: -1});
                else setAllowedState({...allowedState, 2: 0});
                setName(event.target.value)
            }}/>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 2 ? "block" : "none"}}>
            <h1>{language["box.second.title"]}</h1>
            <span>{language["box.second.description"]}</span>

            {
                useLanguageTranslations("box.third").map((value, index) => {
                    return index <= 5 ? <RadioSelection title={value} name={language[`box.third.${index}.name`]}
                                           onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                                           onChange={(id) => id == 1 ? setConfig(prevState => {
                                               prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] + 1;
                                               return prevState;
                                           }) : setConfig(prevState => {
                                               prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] - 1;
                                               return prevState;
                                           })}
                                           inputs={[{value: `${language[`box.third.${index}.name`]}_tz`, label: language[`box.third.label.true`]}, {
                                               value: `${language[`box.third.${index}.name`]}_tnz`,
                                               label: language[`box.third.label.false`]
                                           }]}/> : null;
                })
            }

        </div>

        <div className={styles["box__content"]} style={{display: currentState == 3 ? "block" : "none"}}>
            <h1>{language["box.second.title"]}</h1>
            <span>{language["box.second.description"]}</span>

            {
                useLanguageTranslations("box.third").map((value, index) => {
                    return (index > 5 && index < 12) ? <RadioSelection title={value} name={language[`box.third.${index}.name`]}
                                                        onSelect={() => setAllowedState({...allowedState, 4: allowedState["4"] + 1})}
                                                        onChange={(id) => id == 1 ? setConfig(prevState => {
                                                            prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] + 1;
                                                            return prevState;
                                                        }) : setConfig(prevState => {
                                                            prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] - 1;
                                                            return prevState;
                                                        })}
                                                        inputs={[{value: `${language[`box.third.${index}.name`]}_tz`, label: language[`box.third.label.true`]}, {
                                                            value: `${language[`box.third.${index}.name`]}_tnz`,
                                                            label: language[`box.third.label.false`]
                                                        }]}/> : null;
                })
            }
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 4 ? "block" : "none"}}>
            <h1>{language["box.second.title"]}</h1>
            <span>{language["box.second.description"]}</span>

            {
                useLanguageTranslations("box.third").map((value, index) => {
                    return (index >= 12 && index <= 18) ? <RadioSelection title={value} name={language[`box.third.${index}.name`]}
                                                                        onSelect={() => setAllowedState({...allowedState, 5: allowedState["5"] + 1})}
                                                                        onChange={(id) => id == 1 ? setConfig(prevState => {
                                                                            prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] + 1;
                                                                            return prevState;
                                                                        }) : setConfig(prevState => {
                                                                            prevState[language[`box.third.${index}.config`]] = config[language[`box.third.${index}.config`]] - 1;
                                                                            return prevState;
                                                                        })}
                                                                        inputs={[{value: `${language[`box.third.${index}.name`]}_tz`, label: language[`box.third.label.true`]}, {
                                                                            value: `${language[`box.third.${index}.name`]}_tnz`,
                                                                            label: language[`box.third.label.false`]
                                                                        }]}/> : null;
                })
            }

        </div>

        <div className={styles["box__content"]} style={{display: currentState == 5 ? "block" : "none"}}>
            <div className={styles["box__content__heading"]}>
                <h1>{winner.name}</h1>
                <div className={styles["box__content__heading__image"]}>
                    <Image
                        src={`https://cdn.statically.io/gh/nicosammito/GLS/gh-pages/${winner.image}`}
                        alt={"GLS"} width={200}
                        height={200}/>
                </div>
            </div>
            <span>{winner.description}</span>

        </div>


    </div>
}

export default BoxMain;