
import { useState, useEffect } from 'react';
import './App.css';
import FormSection from './FormSection';

function App() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState("");
  const [batchRequests, setBatchRequests] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/3c8380cdb6.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [])

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12", 
      {headers: {Authorization: "Token 9307bfd5fa011428ff198bb37547f979"}})
      .then(res => res.json())
      .then(_ => setRecords(_.data.attributes.metadata.attributes))
      .catch(err => console.error(err));
    setLoading(false);
  }, []);
  
  function doSelectedFile() {
    fetch(
      "https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12/", 
      {headers: {Authorization: "Token 9307bfd5fa011428ff198bb37547f979"}})
      .then(res => res.json())
      .then(_ => {
        document.getElementById("selectCSV").value = _.data.files[0].id;
        let data = _.data.files;
        if(data.length === batchRequests.length) return;
        setBatchRequests(data)
        return alert("Your file has been successfully uploaded!");
      })
      .catch(err => console.error(err));
    return;
  };

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function downloadCSV(e) {
    e.preventDefault();
    const form = e.target;
    const fileId = form.querySelector("#selectCSV").value;
    fetch(
      `https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12/${fileId}/`,
      {headers: {Authorization: "Token 9307bfd5fa011428ff198bb37547f979"}})
      .then(_ => _.text())
      .then(_ => download(batchRequests.find(_ => _.id === fileId).filename, _));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
  
    const inputs = form.querySelectorAll("input,select");
    const values = [];
    for(let input of inputs) {
      values.push(input.disabled);
      input.disabled = false;
    }
    
    const jsonData = {data:{ type: "scenario", attributes: { input: {}} }};
    new FormData(form).forEach((v, k) => jsonData.data.attributes.input[k] = !isNaN(v) ? parseFloat(v) : v);
    
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = values[i];
    }
    
    fetch(form.action, 
      {
        headers: {
          Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
          "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(jsonData)
      })
      .then(_ => _.json())
      .then(_ => 'errors' in _ ? handleError(_) : handleShowResponse(_))
      .catch(e => console.error(e));
  }
  
  function handleError(errors) {
    for(let i = 0; i < errors.length; i++) {
      console.error(errors[i]);
    }
  }

  function handleShowResponse(_) {
    setSelectedDrink(_.data.attributes.decision);
    setShowResponse(true);
  }

  function handleUploadCSV(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    data.set("delimiter", "|");
    fetch(`https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12`,
      {
        headers: {
          Authorization: "Token 9307bfd5fa011428ff198bb37547f979"
      },
      method: "POST",
      body: data})
      .then(_ =>  _.json())
      .then(_ => {
        doSelectedFile(); 
      });
  }

  const FloatingResponse = () => {
    return (
      <div className={`fixed justify-evenly inset-10 z-10 rounded shadow-md shadow-orange-900 flex flex-col items-center ${showResponse?'':'hidden'}`} style={{backgroundColor: "#FFFFFFEE"}}>
        <span 
          className='absolute top-3 right-3 cursor-pointer'
          onClick={() => setShowResponse(false)}><i className="fa-solid fa-x"></i></span>
        <span className='text-2xl'>Bebida thinks you should drink</span><b className='py-5 text-5xl'>{selectedDrink}</b>
        <button 
          className='shadow shadow-orange-900 appearance-none border rounded p-5 text-grey-700 leading-tight bg-white focus:outline-none focus:shadow-outline'
          onClick={() => setShowResponse(false)}
          >Ask Bebida to suggest another drink</button>
      </div>
    );
  }

  function handleChangeTabs(e) {
    for(let tab of Tabs) {
      tab.active[1](false);
    }
  }

  const Tab = (props) => {
    const [active, setActive] = props.active;
    return (
      <div 
        className={`Tab p-2 bg-white relative rounded-t ${active?"active":""}`}
        onClick={() => {handleChangeTabs(); setActive(true); doSelectedFile()}}>
        {props.title}
      </div>
    );
  }

  const Tabs = [
    {title: "Singular", active: useState(true)}, 
    {title: "Batch", active: useState(false)}
  ];

  return (
    <>
    <div className={`flex flex-col items-center`}>
      <div>
        <h1 className='my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Drink bot: Bebida</h1>
        <div className='Tabs flex flex-row'>
          {Tabs.map(_ => <Tab key={`tab_${_.title}`} title={_.title} active={_.active} />)}
        </div>
        <form 
          id='drinkPredictionForm' 
          className={`${Tabs[0].active[0]?"":"hidden"} w-full grid grid-cols-2 gap-4 m-auto bg-white shadow-md shadow-orange-900 rounded rounded-tl-none px-8 pt-6 pb-8 mb-4`} 
          action='https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12' 
          method='POST'
          onSubmit={(e) => handleSubmit(e)}>
          {loading ? <p>Loading...</p> : records.map((_, i) => <FormSection key={_.key} data={_} />)}
          <button 
            type='reset'
            className='col-start-1 shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 mt-4 text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
            disabled={showResponse}
            >Reset</button>
          <button 
            type='submit'
            className='shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 mt-4 text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
            disabled={showResponse}
            >Submit</button>
        </form>
        <div className={`${Tabs[1].active[0]?"":"hidden"} w-full m-auto bg-white shadow-md shadow-orange-900 rounded rounded-tl-none px-8 pt-6 pb-8 mb-4`}>
          <form
            id='drinkBatchPredictionFormUpload' 
            className={`w-full grid grid-cols-1 gap-1`} 
            action='https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12' 
            method='POST'
            onSubmit={e => handleUploadCSV(e)}>
              <FormSection 
                key={"uploadCSV_form"} 
                data={{name: "uploadCSV", type: "File" }} />
              <button 
                type='submit'
                className='shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
                >Upload</button>
          </form>
          <form
            id='drinkBatchPredictionFormDownload' 
            className={`w-full grid grid-cols-1 gap-1 mt-6`} 
            action={`https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12/fileId`}
            method='POST'
            onSubmit={e => downloadCSV(e)}>
              <FormSection 
                key={"selectCSV_form"} 
                data={{name: "selectCSV", type: "Nominal", domain: {values: batchRequests.map(_ => _.id), data: batchRequests}}} />
              <button 
                type='submit'
                className='shadow shadow-orange-900 appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline'
                >Download</button>
          </form>
        </div>
      </div>
    </div>
    <FloatingResponse />
    </>
  );
}

export default App;
