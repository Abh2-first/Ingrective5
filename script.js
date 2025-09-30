const HF_API = "https://huggingface.co/spaces/Tigerabhay/Ingrective5/run/predict"; 

async function uploadImage(file) {
    let formData = new FormData();
    formData.append("data", file);

    let response = await fetch(HF_API, {
        method: "POST",
        body: formData,
    });

    let result = await response.json();
    document.getElementById("output").innerText = result.data[0];
}
