function generateQR() {
    let qrText = document.getElementById("qrText").value;

    // Get QR code container div and download button
    let qrCodeDiv = document.getElementById("qrCode");

    // Get download button
    let downloadBtn = document.getElementById("downloadBtn");

    if (qrText.trim() === "") {
        alert("Please enter text or a URL!");
        return;
    }

    // Clear previous QR code
    qrCodeDiv.innerHTML = "";

    // Generate new QR code
    let qrCode = new QRCode(qrCodeDiv, {
        text: qrText,
        width: 200,
        height: 200
    });

    // Wait for QR code to generate and then allow download
    setTimeout(() => {
        let qrImage = qrCodeDiv.querySelector("img").src;
        downloadBtn.href = qrImage;
        downloadBtn.style.display = "block";
    }, 500);
}
