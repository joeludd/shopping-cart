import { useEffect, useState } from 'react';

function ItemOptions(props) {
    const options = props.options;

    const [curOption, setCurOption] = useState(options[0])

    const [selectedOptions, setSelectedOptions] = useState(
        {
            color: Array.isArray(curOption.color) ? curOption.color[0] : curOption.color,
            otherOption: Object.keys(curOption).length > 2 ? props.getOtherOption(curOption)[0].toString() : '',
            totalQty: curOption.quantity
        }
    )

    useEffect(() => {
        setSelectedOptions({
            color: Array.isArray(curOption.color) ? curOption.color[0] : curOption.color,
            otherOption: Object.keys(curOption).length > 2 ? props.getOtherOption(curOption)[0].toString() : '',
            totalQty: curOption.quantity
        })
    }, [curOption]);

    useEffect(() => {
        props.changeVariant(selectedOptions);
    }, [selectedOptions]);

    const handleColorChange = (e) => {
        setCurOption(options[e.target.value]);
        const otherOptionSelects = document.querySelectorAll('.other-option-select');
        otherOptionSelects.forEach(x => {
            x.selectedIndex = 0;
        });
    }

    const handleOtherOptionChange = (e) => {
        setSelectedOptions(selectedOptions => ({
            ...selectedOptions,
            otherOption: e.target.value
        }))
    }

    if (Object.keys(curOption).length > 2) {
        const optKey = Object.keys(curOption)[1];
        return (
            <div className="options-wrapper">
                <label>Color</label>
                <select className="color-select" data-testid="select-color" onChange={handleColorChange}>
                    {options.map((option, i) => 
                        <option key={`option-${i}`} value={i}>{option.color}</option>
                    )}
                </select>
                <label>{optKey}</label>
                <select className="other-option-select" onChange={handleOtherOptionChange}>
                    {curOption[optKey].map((x, i) => 
                        <option key={`other-option-${i}`} value={x}>{x}</option>
                    )}
                </select>
            </div>
        )
    } else {
        return (
            <div className="options-wrapper">
                <select className="color-select" data-testid="select-color" onChange={handleColorChange}>
                    {options.map((option, i) => 
                        <option key={`option-${i}`} value={i}>{option.color}</option>
                    )}
                </select>
            </div>
        )
    }
}

export default ItemOptions;