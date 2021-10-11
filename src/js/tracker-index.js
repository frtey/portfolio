import "babel-polyfill";

export default function tracker() {

    const trackerSubmitHandler = async () => {
        const title = document.getElementById("testForm-issue_title");
        const text = document.getElementById("testForm-issue_text");
        const created_by = document.getElementById("testForm-created_by");
        const assigned_to = document.getElementById("testForm-assigned_to");
        const status_text = document.getElementById("testForm-status_text");
        const resultArea = document.getElementById("jsonResult");
        
        const stuff = { "issue_title": title.value, "issue_text": text.value, "created_by": created_by.value, "assigned_to": assigned_to.value, "status_text": status_text.value };
        resultArea.innerText = "";
    
        const data = await fetch("/api/issues/apitest", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(stuff)
        });
    
        const parsed = await data.json();
           
        resultArea.innerHTML = JSON.stringify(parsed);

        return;
    };
    
    document.getElementById("testForm-submit").addEventListener("click", trackerSubmitHandler);
    
    const trackerUpdateHandler = async () => {
        const _id = document.getElementById("testForm2-_id");
        const title = document.getElementById("testForm2-issue_title");
        const text = document.getElementById("testForm2-issue_text");
        const created_by = document.getElementById("testForm2-created_by");
        const assigned_to = document.getElementById("testForm2-assigned_to");
        const status_text = document.getElementById("testForm2-status_text");
        const opened = document.getElementById("testForm2-open");
        const resultArea = document.getElementById("jsonResult");
        
        const stuff = { "_id": _id.value, "issue_title": title.value, "issue_text": text.value, "created_by": created_by.value, "assigned_to": assigned_to.value, "status_text": status_text.value, "open": !opened.checked };
        resultArea.innerText = "";
    
        const data = await fetch("/api/issues/apitest", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(stuff)
        });
    
        const parsed = await data.json();
           
        resultArea.innerHTML = JSON.stringify(parsed);

        return;
    };

    document.getElementById("testForm2-submit").addEventListener("click", trackerUpdateHandler);

    const trackerDeleteHandler = async () => {
        const _id = document.getElementById("testForm3-_id");
        const resultArea = document.getElementById("jsonResult");
        
        const stuff = { "_id": _id.value };
        resultArea.innerText = "";
    
        const data = await fetch("/api/issues/apitest", {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(stuff)
        });
    
        const parsed = await data.json();
   
        resultArea.innerHTML = JSON.stringify(parsed);

        return;
    };

    document.getElementById("testForm3-submit").addEventListener("click", trackerDeleteHandler);
}