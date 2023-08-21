import styles from '../styles/RadioSelection.module.scss';
import {FunctionComponent, useState} from "react";

export interface RadioInput {
    value: string,
    label: string
}

interface RadioSelectionProps {
    name: string
    title: string
    inputs: RadioInput[]
    onSelect: () => void
    onChange: (id: number) => void
}

const RadioSelection: FunctionComponent<RadioSelectionProps> = ({name, title, inputs, onSelect, onChange}) => {

    const [hasSelected, setHasSelected] = useState(false);
    const [selected, setSelected] = useState(-1);

    return <div>
        <h3>{title}</h3>
        <form className={styles["radio-selection"]}>
            {
                inputs.map((value, index) => {
                    return <label key={index} className={styles["radio-selection__input"] + (selected == index ? " " + styles["radio-selection__input-active"] : "")}>
                        <input type={"radio"} name={name} value={value.value} onChange={event => {
                            if (!hasSelected) {
                                onSelect()
                                setHasSelected(true)
                            }

                            setSelected(index)
                            onChange(index + 1)
                        }}/>{value.label}
                    </label>
                })
            }

        </form>
    </div>

}

export default RadioSelection;