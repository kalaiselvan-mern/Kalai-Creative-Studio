import axios from "axios";

export const createPayment = async (req, res) => {
  try {
    const { amount, productId, productName } = req.body;

    // இங்க கவனி: new URLSearchParams() யூஸ் பண்ணிருக்கேன்!
    const payload = new URLSearchParams({
      purpose: productName || "Kalai Studio Asset",
      amount: amount.toString(), // நம்பரை ஸ்ட்ரிங்கா மாத்தி அனுப்புறோம்
      buyer_name: "Customer",
      email: "customer@kalai.com",
      phone: "9999999999",
      redirect_url: "http://localhost:5173/payment-success",
      send_email: "false", // பூலியன் (boolean) வேல்யூவும் ஸ்ட்ரிங்கா தான் போகணும்
      allow_repeated_payments: "false",
    });

    const response = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      payload,
      {
        headers: {
          "X-Api-Key": "b6982fe014d1ab37d9aec853ecd0e0cb", 
          "X-Auth-Token": "44a28336b05632e5e601af2c4e1f2658", 
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );

    if (response.data && response.data.success) {
      res.status(200).json({
        success: true,
        paymentUrl: response.data.payment_request.longurl,
      });
    } else {
      console.log("Instamojo Response:", response.data);
      res.status(400).json({ success: false, message: "Instamojo rejected the request" });
    }

  } catch (error) {
    console.error("Instamojo Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Payment Link Generation Failed!"
    });
  }
};