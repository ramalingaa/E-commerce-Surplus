
const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
  
      script.onload = () => {
        resolve(true);
      };
  
      script.onerror = () => {
        resolve(false);
      };
  
      document.body.appendChild(script);
    });
  };

const displayRazorpay = async (finalAmount, userName, userEmail, navigate) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load, check you connection", "error");
      return;
    }

    const options = {
      key: "rzp_test_Byb162b3lqhh3t",
      amount: finalAmount * 100,
      currency: "INR",
      name: "Surplus",
      description: "Thank you for shopping with us",
      image:
        "",
      handler: function (response) {
        navigate("/orderconfirm")
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: "9985165628",
      },
      notes: {
        // address: orderstate.deliveryAddress.address,
      },
      theme: {
        color: "#f95b3d",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  export { displayRazorpay }