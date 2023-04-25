function NumberInput(options) {
    options = options.data;
    return (
        <input 
            type="Number"
            key={options.name}
            id={options.name}
            name={options.name}
            step={options.domain.interval} 
            min={options.domain.lower} 
            max={options.domain.upper} 
            defaultValue={Math.max(options.domain.lower, 0)}
            className={`shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
        </input>
    ); 
}

export default NumberInput;