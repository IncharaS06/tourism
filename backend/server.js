const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

const users = {
    "12345": {
        name: "Rahul Sharma",
        aadhar: "XXXX-XXXX-1234",
        pan: "ABCDE1234F",
        passport: "M1234567",
        drivingLicense: "DL12345678",
        visaStatus: "Valid",
        vaccination: "Fully vaccinated",
        travelInsurance: "Active",
        email: "rahul@example.com",
        phone: "+91-9876543210",
        photo: ""
    },
    "67890": {
        name: "Anjali Verma",
        aadhar: "XXXX-XXXX-5678",
        pan: "XYZAB5678L",
        passport: "N9876543",
        drivingLicense: "DL87654321",
        visaStatus: "Valid",
        vaccination: "Fully vaccinated",
        travelInsurance: "Active",
        email: "anjali@example.com",
        phone: "+91-9123456780",
        photo: ""
    }
};

app.get("/api/verify-qr/:qr", (req, res) => {
    const qr = req.params.qr;
    if (users[qr]) res.json({ success: true, user: users[qr] });
    else res.json({ success: false, message: "Invalid QR Code" });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "tour.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
