import styles from "../styles/Box.module.scss"
import {FunctionComponent, useEffect, useState} from "react";
import RadioSelection from "./RadioSelection";
import Image from "next/image";

interface BoxProps {
    animated: boolean
    onChange: (index: number) => void
}

const Box: FunctionComponent<BoxProps> = ({animated = false, onChange}) => {

    const [currentState, setCurrentState] = useState<number>(0);

    useEffect(() => {
        if (animated) setCurrentState(1);
    }, [animated])

    useEffect(() => {
        if (currentState >= 1) {
            onChange(currentState)
            console.log(currentState, "sds")
        }
    }, [currentState])

    const [allowedState, setAllowedState] = useState({
        1: -1,
        2: -1,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    });
    const [config, setConfig] = useState({
        "magier": 0,
        "fuersorger": 0,
        "thinker": 0,
        "feind": 0,
        "liefern": 0,
        "mensch": 0
    });

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

    const calculateWinner = (config): { name: string, id: number, image: string, description: string[]} => {

        const dataArray = [
            {name: "Wir sind Magier", id: 1, count: config.magier, image: "magier.png", description: ["Ich überrasche meine Kunden und Kollegen mit Lösungen für ihre Probleme", "Ich nutze die Möglichkeiten, die uns digitale Tools bieten", "Ich probiere neue Wege aus, wo die alten nicht mehr funktionieren", "Ich begeistere uns zeige auf, wo wir tolle Arbeit leisten", "Ich inspiriere und ermutige meine Kollegen, dass wir alle Magier werden"]},
            {name: "Wir sind Fürsorger", id: 2, count: config.fuersorger, image: "fuersorger.png", description: ["Ich nehme die Sorgen und Verärgerung von Kunden/Kollegen ernst und finde Lösungen", "Wir helfen meinen Kollegen – egal aus welchem Bereich / Region / Zentrale", "Ich lege Wert auf fairen Umgang mit Kunden, Geschäftspartnern und Kollegen", "Ich achte aktiv darauf, dass wir unseren ökologischen Fußabdruck reduzieren", "Ich achte auf Arbeitssicherheit – in Halle und Büros, niemand soll zu Schaden kommen", "Ich ermutige meine Kollegen, dass sie ebenfalls zu Fürsorgern werden", "Ich verteile unsere Marken-Botschaften und erläutere es meinen Kollegen"]},
            {name: "We think inside the box", id: 3, count: config.thinker, image: "thinker.png", description: ["Ich verstehe, dass es nicht um Pakete/Kartons geht, sondern um das, was darin enthalten ist und was es für unsere Kunden bedeutet", "Wenn ich sehe, dass ein Paket Schaden erleiden kann, dann schreite ich ein. Pakete können nicht fliegen.", "Ich denke in Kundenerlebnissen – was braucht der Kunde, um GLS positiv zu erleben?", "Ich ermutige meine Kollegen, dass auch sie ‚Inside the Box‘ denken"]},
            {name: "Gleichgültigkeit ist unser größter Feind", id: 4, count: config.feind, image: "feind.png", description: ["Ich nutze Fehler, um daraus zu lernen – damit diese in Zukunft vermieden werden", "Ich akzeptiere nicht, dass die gleichen Fehler immer wieder passieren", "Ich will die Ursache von Problemen lösen, um jeden Tag ein wenig besser zu werden", "Ich setze messbare Ziele und messe, ob wir Verbesserungen erreichen", "Ich weise meine Kollegen darauf hin, wenn wir als GLS uns gleichgültig verhalten und mache Vorschläge, wie wir uns verbessern können"]},
            {name: "Wir liefern, was wichtig ist", id: 5, count: config.liefern, image: "liefern.png", description: ["Ich verstehe, dass unsere Kunden von uns abhängig sind. Ihr Geschäftserfolg hängt von uns mit ab", "Ich halte GLS mit meiner Arbeit am Laufen", "Ich bin stolz darauf, im GLS Netzwerk zu arbeiten. Kunden vertrauen mir / uns.", "Man kann sich auf mich verlassen.", "Deadlines und Liefertermine halte ich ein", "Ich erinnere meinen Kollegen, dass wir für unsere Kunden positive Emotionen schaffen"]},
            {name: "Wir liefern von Mensch zu Mensch", id: 6, count: config.mensch, image: "mensch.png", description: ["Ich behandle meine Kollegen und Kunden so, wie ich selbst behandelt werden möchte", "Ich verstehe, dass wir nur alle gemeinsam wirklich gute Arbeit machen können", "Ich verstecke mich nicht hinter Mails / Regeln / Mauern", "Ich bin persönlich und sage „Hallo“, ich lächle und sich verschwinde auch nicht einfach", "Ich bin ein Mensch. Menschen machen den Unterschied – ich mache den Unterschied", "Ich erinnere meine Kollegen, dass WIR GLS sind. Das ist unsere größte Stärke"]}
        ]

        const data = dataArray.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            }
        })

        return {name: data[0].name, id: data[0].id, image: data[0].image, description: data[0].description};

    }

    return <div className={styles["box"]} style={{
        transform: animated ? "translateY(-50%) translateX(-50%)" : "translateY(0%) translateX(-50%)",
        pointerEvents: animated ? "all" : "none",
        opacity: animated ? "100%" : "0",
        padding: currentState == 7 ? "2rem" : "2rem 2rem 6rem"
    }}>

        {errorMessage ? <div className={styles["box__error"]}>Bitte beantworte vorher alle Fragen.</div> : null}
        {currentState != 7 ? <span>Bitte immer vollständig nach unten scrollen.</span> : null}

        <div className={styles["box__bottom"]}>
            {
                !errorMessage ? <>
                    <div className={styles["box__buttons"]}>
                        {currentState < 7 ? <button onClick={event => currentState > 1 && setCurrentState(prevState => prevState - 1)}>zurück</button> : null}
                        {currentState < 7 ? <button onClick={event => {

                            if (currentState == 2 && allowedState["3"] >= 12) {
                                setAllowedState({...allowedState, 3: -1})
                                setCurrentState(3)
                            } else if (currentState == 3 && allowedState["4"] == 1) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(4)
                            } else if (currentState == 4 && allowedState["5"] == 1) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(5)
                            } else if (currentState == 5 && allowedState["6"] == 1) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(6)
                            } else if (currentState == 6 && allowedState["7"] == 1) {
                                setAllowedState({...allowedState, 4: -1})
                                setCurrentState(7)
                            } else if (allowedState[currentState + 1] === -1 && currentState < 7) {
                                setCurrentState(prevState => prevState + 1)
                            } else {
                                setErrorMessage(true);
                                setTimeout(() => {
                                    setErrorMessage(false)
                                }, 3000)
                            }
                        }}>weiter
                        </button> : null }
                    </div>


                    {
                        currentState < 7 ? <div className={styles["box__points"]}>
                            {
                                [1, 2, 3, 4, 5, 6, 7].map(value => {
                                    return <span key={value} className={styles["box__points__point"] + (value == currentState ? (" " + styles["box__points__point-active"]) : "")}/>;
                                })
                            }
                        </div> : null
                    }
                </> : null
            }
        </div>


        <div className={styles["box__content"]} style={{display: currentState == 1 ? "block" : "none"}}>
            <h1>Unser Markenversprechen</h1>
            <span>Bei GLS liefern wir nicht von A nach B. Wir liefern von Mensch zu Mensch. Wenn wir Pakete sehen, sehen wir nicht einfach nur Pakete. Wir sehen Menschen. Wenn wir an das denken, was in den Paketen ist, sehen wir keine Objekte – wir sehen Emotionen. In den Paketen stecken die Hoffnungen, Träume und Ziele unserer Versender und Empfänger.</span>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 2 ? "block" : "none"}}>
            <h1>Trifft zu, trifft nicht zu</h1>
            <span>Bitte wähle jeweils trifft zu oder trifft nicht zu, um herauszufinden, welche/r Markenbotschafter/in Du bist.</span>

            <RadioSelection title={"Ich bin kreativ"} name={"creative"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, magier: config.magier + 1}) : null}
                            inputs={[{value: "creative_tz", label: "Trifft zu"}, {
                                value: "creative_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich bin ein Vorbild für meine Kollegen"} name={"example"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, magier: config.magier + 1}) : null}
                            inputs={[{value: "example_tz", label: "Trifft zu"}, {
                                value: "example_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich bin hilfsbereit"} name={"helpful"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({
                                ...config,
                                fuersorger: config.fuersorger + 1
                            }) : null} inputs={[{value: "helpful_tz", label: "Trifft zu"}, {
                value: "helpful_tnz",
                label: "Trifft nicht zu"
            }]}/>
            <RadioSelection title={"Sicherheit und Gesundheit meiner Kollegen ist mir wichtig"} name={"health"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({
                                ...config,
                                fuersorger: config.fuersorger + 1
                            }) : null} inputs={[{value: "health_tz", label: "Trifft zu"}, {
                value: "health_tnz",
                label: "Trifft nicht zu"
            }]}/>
            <RadioSelection title={"Jedes Paket ist mir wichtig"} name={"parcel"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, thinker: config.thinker + 1}) : null}
                            inputs={[{value: "parcel_tz", label: "Trifft zu"}, {
                                value: "parcel_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich achte darauf, dass Pakete unbeschädigt beim Kunden ankommen"} name={"damage"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, thinker: config.thinker + 1}) : null}
                            inputs={[{value: "damage_tz", label: "Trifft zu"}, {
                                value: "damage_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich lerne aus meinen Fehlern"} name={"mistakes"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, feind: config.feind + 1}) : null}
                            inputs={[{value: "mistakes_tz", label: "Trifft zu"}, {
                                value: "mistakes_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich bin offen für Veränderung"} name={"change"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, feind: config.feind + 1}) : null}
                            inputs={[{value: "change_tz", label: "Trifft zu"}, {
                                value: "change_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich gehe auf Wünsche der Kunden ein"} name={"wish"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, liefern: config.liefern + 1}) : null}
                            inputs={[{value: "wish_tz", label: "Trifft zu"}, {
                                value: "wish_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Mir ist wichtig, dass das Paket pünktlich beim Kunden ankommt"} name={"point"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, liefern: config.liefern + 1}) : null}
                            inputs={[{value: "point_tz", label: "Trifft zu"}, {
                                value: "point_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Ich bin immer freundlich zu Mitarbeitern und Kunden"} name={"friendly"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, mensch: config.mensch + 1}) : null}
                            inputs={[{value: "friendly_tz", label: "Trifft zu"}, {
                                value: "friendly_tnz",
                                label: "Trifft nicht zu"
                            }]}/>
            <RadioSelection title={"Mir ist bewusst, dass meine Arbeit für die Zufriedenheit der Kunden sorgt"}
                            name={"satisfaction"}
                            onSelect={() => setAllowedState({...allowedState, 3: allowedState["3"] + 1})}
                            onChange={(id) => id == 1 ? setConfig({...config, mensch: config.mensch + 1}) : null}
                            inputs={[{value: "satisfaction_tz", label: "Trifft zu"}, {
                                value: "satisfaction_tnz",
                                label: "Trifft nicht zu"
                            }]}/>

        </div>

        <div className={styles["box__content"]} style={{display: currentState == 3 ? "block" : "none"}}>
            <h1>Du siehst ein kaputtes Paket in der Halle. Wie reagierst du?</h1>
            <span>Bitte wähle eines der nachfolgenden Punkte aus</span>

            <RadioSelection title={""} name={"q_1"} onSelect={() => setAllowedState({...allowedState, 4: 1})}
                            onChange={(id) => calculatePoints(id)} inputs={[{
                value: "1",
                label: "Ich suche nach Lösungen, wie das nicht nochmal passiert"
            }, {value: "2", label: "Ich klebe das Paket selbst"}, {
                value: "3",
                label: "Ich prüfe, ob der Inhalt beschädigt ist"
            }, {value: "4", label: "Ich verpacke den Inhalt in einen neuen Karton"}, {
                value: "5",
                label: "Ich stelle sicher, dass das Paket trotzdem zugestellt wird"
            }, {value: "6", label: "Ich stelle sicher, dass der Kunde entschädigt wird, falls es kaputt ist"}]}/>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 4 ? "block" : "none"}}>
            <h1> Ein Kunde beschwert sich bei der Zustellung. Wie reagierst du?</h1>
            <span>Bitte wähle eines der nachfolgenden Punkte aus</span>

            <RadioSelection title={""} name={"q_2"} onSelect={() => setAllowedState({...allowedState, 5: 1})}
                            onChange={(id) => calculatePoints(id)} inputs={[{
                value: "1",
                label: "Ich stelle persönlich sicher, dass der Kunde in Zukunft zufrieden ist"
            }, {value: "2", label: "Es tut mir leid und ich entschuldige mich"}, {
                value: "3",
                label: "Ich mache ihn darauf aufmerksam, dass der Inhalt da ist und dies am wichtigsten ist"
            }, {value: "4", label: "Ich höre mir seine Beschwerde an und suche eine Lösung"}, {
                value: "5",
                label: "Sein Anliegen ist mir wichtig und ich melde dies bei meinem Vorgesetzten"
            }, {value: "6", label: "Ich lasse mich nicht von seiner Beschwerde unterkriegen und bleibe freundlich"}]}/>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 5 ? "block" : "none"}}>
            <h1>Du bist beschäftigt und siehst, dass jemand Hilfe braucht beim Einladen von Paketen</h1>
            <span>Bitte wähle eines der nachfolgenden Punkte aus</span>

            <RadioSelection title={""} name={"q_3"} onSelect={() => setAllowedState({...allowedState, 6: 1})}
                            onChange={(id) => calculatePoints(id)}
                            inputs={[{value: "1", label: "Ich sorge dafür, dass ihm jemand hilft"}, {
                                value: "2",
                                label: "Ich pausiere meine Aufgabe und helfe meinem Kollegen zuerst, weil ich gerne unterstütze"
                            }, {
                                value: "3",
                                label: "Ich achte zuerst auf mich, da meine Pakete wichtig sein könnten"
                            }, {
                                value: "4",
                                label: "Ich zeige ihm, wie er effektiver einlädt und sich verbessert"
                            }, {
                                value: "5",
                                label: "Ich helfe meinem Kollegen zuerst, damit er so schnell wie möglich auf Tour gehen kann"
                            }, {
                                value: "6",
                                label: "Ich schaue, welche Aufgabe wichtiger sein könnte und entscheide mich dann"
                            }]}/>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 6 ? "block" : "none"}}>
            <h1>Was schätzen deine Kollegen an dir?</h1>
            <span>Bitte wähle eines der nachfolgenden Punkte aus</span>

            <RadioSelection title={""} name={"q_4"} onSelect={() => setAllowedState({...allowedState, 7: 1})}
                            onChange={(id) => calculatePoints(id)}
                            inputs={[{value: "1", label: "Ich bin ein Vorbild für meine Kollegen"}, {
                                value: "2",
                                label: "Ich teile regelmäßig meine Zigaretten"
                            }, {value: "3", label: "Ich schmeiße keine Pakete"}, {
                                value: "4",
                                label: "Ich versuche mich ständig zu verbessern"
                            }, {value: "5", label: "Ich komme pünktlich und regelmäßig zur Arbeit"}, {
                                value: "6",
                                label: "Ich bin immer freundlich"
                            }]}/>
        </div>

        <div className={styles["box__content"]} style={{display: currentState == 7 ? "block" : "none"}}>
            <div className={styles["box__content__heading"]}>
                <h1>Du bist unser Marken-Botschafter: {calculateWinner(config).name}</h1>
                <div className={styles["box__content__heading__image"]}>
                    <Image src={`https://cdn.statically.io/gh/nicosammito/GLS/gh-pages/${calculateWinner(config).image}`} alt={"GLS"} width={200}
                           height={200}/>
                </div>
            </div>
            <span>Deine Rolle als Botschafter ist uns besonders wichtig :</span>
            <ul>
                {calculateWinner(config).description.map(value => {
                    return <li key={value}>{value}</li>
                })}
            </ul>

        </div>


    </div>
}

export default Box;