const validate = (formData) => {
    const err = {};
    if (!formData.name) {
      err["name"] = "name is needed*";
    }
    if (!formData.mobile ||!Number(formData.mobile)) {
      err["mobile"] = "Enter valid mobile number*";
    }
    if (!formData.pincode || !Number(formData.pincode)) {
      err["pincode"] = "Enter valid pincode number*";
    }
    if (!formData.address) {
      err["address"] = "address is needed*";
    }
    if (!formData.locality) {
      err["locality"] = "locality is needed*";
    }
    if (!formData.district) {
      err["district"] = "district is needed*";
    }
    if (!formData.state) {
      err["state"] = "state is needed*";
    }
    return err;
  };
  export { validate }