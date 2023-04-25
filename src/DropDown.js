function setPregnancy(target, effect, isMale) {
    if (isMale) {
        effect.value = "NA";
        effect.disabled = true;
    } else {
        effect.value = "No";
        effect.disabled = false;
    }
}

function DropDown(options) {
    options = options.data;
    let values;
    if (options.domain.data) {
        values = options.domain.data.map(_ => <option key={`${_.filename}_${_.id}`} value={_.id}>{_.filename} ({new Date(_.timestamp).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})})</option>)
    } else {
        values = options.domain.values.map(_ => <option key={`${options.name}_${_}`} value={_} hidden={_ === "NA"}>{_}</option>);
    }

    function handleOnChange(e) {
        const target = e.target;
        if(target.name === "INPUTVAR2") {
            const effect = document.getElementById("INPUTVAR6");
            setPregnancy(target, effect, target.value === "Male")
        }
        if(target.name === "uploadCSV") {
            options.selectedFile[1](target.value);
        }
    }

    return (
        <>
            <select
                key={options.name}
                id={options.name}
                name={options.name}
                className={`shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                onChange={handleOnChange}
                disabled={options.name === "INPUTVAR6"}
                defaultValue={options.name === "INPUTVAR6" ? "NA" : options.selectedFile?.[0] ?? ""}
                >
                {values}
            </select>
        </>
    ); 
}

export default DropDown;