import NumberInput from './NumberInput';
import DropDown from './DropDown';

function icon(name) {
  switch(name) {
    case "INPUTVAR1": {
      return (<i className="fa-solid fa-temperature-quarter"></i>);
    }
    case "INPUTVAR2": {
      return (<i className="fa-solid fa-venus-mars"></i>);
    }
    case "INPUTVAR3": {
      return (<i className="fa-solid fa-person-cane"></i>);
    }
    case "INPUTVAR4": {
      return (<i className="fa-solid fa-mug-hot"></i>);
    }
    case "INPUTVAR5": {
      return (<i className="fa-solid fa-clock"></i>);
    }
    case "INPUTVAR6": {
      return (<i className="fa-solid fa-person-pregnant"></i>);
    }
    case "INPUTVAR7": {
      return (<i className="fa-solid fa-heart-pulse"></i>);
    }
    case "INPUTVAR8": {
      return (<i className="fa-solid fa-calendar"></i>);
    }
    case "INPUTVAR9": {
      return (<i className="fa-solid fa-calendar-week"></i>);
    }
    default:
      {return (<></>);}
  }
}

function type (data) {
  switch(data.type) {
    case "Continuous": {
      return (<NumberInput data={data}></NumberInput>);
    }
    case "Nominal": {
      return (<DropDown data={data}></DropDown>);
    }
    case "File": {
      return (
        <input 
            type="File"
            key={data.name}
            name="file"
            id={data.name}
            className={`shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
        </input>);
    }
    default: {
      return (<></>);
    }
  }
}

function FormSection(_data) {
  const data = _data.data;
  
  return (
    <>
      <div key={data.name} className={"mb-2"}>
        <label htmlFor={data.name} className="block text-gray-700 text-sm font-bold mb-2">{ icon(data.name) } {data.question}</label>
        { type(data) }
      </div>
    </>
  );
}

export default FormSection;
