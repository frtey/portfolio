import "babel-polyfill";

export default function converter() {

    const convertHandler = async () => {
        const textArea = document.getElementById("text-input");
        const errorArea = document.getElementById("error-msg");
        const convertedArea = document.getElementById("jsonResult");
        
        const stuff = {"text": textArea.value};
        errorArea.innerText = "";
        convertedArea.innerText = "";
    
        const data = await fetch("/api/convert", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(stuff)
        });
    
        const parsed = await data.json();
        if (parsed.error) {
            errorArea.innerText = JSON.stringify(parsed.error);
            return;
        }
    
        convertedArea.innerHTML = parsed.string;
        return;
    };
    
    document.getElementById("convert-btn").addEventListener("click", convertHandler)
}
  