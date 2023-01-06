import { useState } from "react";
import { arrToCsv } from "../helpers";
import doData from "../data-analysis/script";
import { collectAllKeyNames } from "../helpers";

const fileReader = new FileReader();

function downloadCsv(csvData, filePath) {
  const link = document.createElement("a");
  const data = "data:text/csv;charset=utf-8," + csvData;
  link.setAttribute("href", encodeURI(data));
  link.setAttribute("download", filePath);
  document.body.appendChild(link);
  link.click();
}

function handleDataset(dataset, title) {
  const sortedHeaderKeys = collectAllKeyNames(dataset);
  const csv = arrToCsv(dataset, sortedHeaderKeys);
  downloadCsv(csv, `lokallabore-data-${title}.csv`);
}

function handleFileUpload(e, setInfo, setError) {
  try {
    const content = e.target.result;
    const data = JSON.parse(content);
    const { dataRegistrierung, dataLogin, dataGuest } = doData(data);
    handleDataset(dataRegistrierung, "registrierung");
    handleDataset(dataLogin, "login");
    handleDataset(dataGuest, "guest");
    setInfo(
      "🎉 Success! Check the Download folder of your browser for 3 files, named: lokallabore-data-registrierung.csv, lokallabore-data-login.csv and lokallabore-data-guest.csv"
    );
    setError(null);
  } catch (e) {
    console.error(e);
    setError(JSON.stringify(e));
  }
}

function Screen() {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");

  const onFileChange = (event) => {
    setInfo("");
    const file = event.target.files[0];
    fileReader.onload = function (e) {
      handleFileUpload(e, setInfo, setError);
    };
    fileReader.readAsText(file, "UTF-8");
  };
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl">Data export (JSON to CSV)</h1>
      <p>Upload JSON here:</p>
      <input type="file" onChange={onFileChange} />
      <div className="mt-4">
        {error && (
          <div style={{ color: "red" }}>
            An error occured. Check the browser devtools console for more
            information.
          </div>
        )}
        {info && (
          <div className="border p-3 bg-blue-100">
            <p>{info}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Screen;
