function showResult(valid, user) {
    const reader = document.getElementById("reader");
    const result = document.getElementById("result");
    const info = document.getElementById("user-info");
    const progressBar = document.getElementById("progress-bar");
    const progress = document.getElementById("progress");

    if (!valid) {
        result.innerHTML = '<div class="cross">&#10006; Invalid QR</div>';
        return;
    }

    reader.style.display = "none";
    progressBar.style.display = "block";
    progress.style.width = "0%";
    result.innerHTML = '<div class="tick">&#10004;</div>';

    gsap.fromTo(".tick", { scale: 0 }, { 
        scale: 1.2, 
        duration: 0.5, 
        ease: "back.out(2)", 
        onComplete: () => { 
            gsap.to(".tick", { scale: 1, duration: 0.2 }); 
        } 
    });

    setTimeout(() => {
        result.style.display = "none";
        info.style.display = "block";

        const profilePhoto = user.photo && user.photo !== "" ? user.photo : "assets/download.png";

        info.innerHTML = `
            <div class="profile">
                <img src="${profilePhoto}" alt="Profile Photo">
                <h2>${user.name}</h2>
            </div>
            <div class="user-form">
                <label>Full Name:</label><p>${user.name}</p>
                <label>Email:</label><p>${user.email}</p>
                <label>Phone:</label><p>${user.phone}</p>
                <label>Aadhar:</label><p>${user.aadhar}</p>
                <label>PAN:</label><p>${user.pan}</p>
                <label>Passport:</label><p>${user.passport}</p>
                <label>Driving License:</label><p>${user.drivingLicense}</p>
                <label>Visa Status:</label><p>${user.visaStatus}</p>
                <label>Vaccination:</label><p>${user.vaccination}</p>
                <label>Travel Insurance:</label><p>${user.travelInsurance}</p>
            </div>
            <button onclick="window.print()">Print</button>
        `;
    }, 800);
}

// ✅ FIXED: Removed hardcoded localhost
const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
scanner.render(decodedText => {
    fetch(`/api/verify-qr/${decodedText}`)
        .then(res => res.json())
        .then(data => {
            scanner.clear().then(() => {
                if (data.success) showResult(true, data.user);
                else showResult(false);
            });
        })
        .catch(err => { 
            console.error(err); 
            showResult(false); 
        });
});
