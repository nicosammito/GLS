import styles from '../styles/RadioSelection.module.scss';
import {FunctionComponent, useState} from "react";

interface RadioInput {
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

    return <div>
        <h3>{title}</h3>
        <form className={styles["radio-selection"]}>
            {
                inputs.map((value, index) => {
                    return <div key={index} className={styles["radio-selection__input"]}>
                        <input type={"radio"} name={name} value={value.value} onChange={event => {
                            if (!hasSelected) {
                                onSelect()
                                setHasSelected(true)
                            }

                            onChange(index + 1)
                        }}/>
                        <label>{value.label}</label>
                    </div>
                })
            }

        </form>
    </div>

}

export default RadioSelection;