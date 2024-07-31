import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import Breadcrumb from "../components/Breadcrumb";
import api from "../services/api";
import userPlaceholder from "../components/img/user.png";

const OperatorCreate = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    position: "",
    hire_date: "",
    equipament_id: "",
    bio: "",
    birthday: "",
    image: null,
    rfid: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [equipaments, setEquipaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipaments = async () => {
      try {
        const response = await api.get("/equipament/");
        setEquipaments(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipaments();
  }, []);

  useEffect(() => {
    const selectedEquipament = equipaments.find(
      (equipament) => equipament.id === formData.equipament_id
    );
    if (selectedEquipament) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        rfid: selectedEquipament.device?.RFID || "",
      }));
    }
  }, [formData.equipament_id, equipaments]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      await api.post("/profile/", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard/operator");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Failed to create operator", error);
      }
    }
  };

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Operators", link: "/dashboard/operator" },
    { name: "Create Operator" },
  ];

  const phoneMask = [
    "+",
    "5",
    "5",
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container mx-auto my-2">
        <h1 className="text-xl font-bold mb-4">Create Operator</h1>

        <Breadcrumb items={breadcrumbItems} />
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={
                    formData.image && typeof formData.image === "string"
                      ? formData.image
                      : formData.image
                      ? URL.createObjectURL(formData.image)
                      : userPlaceholder
                  }
                  alt="Profile"
                  className="rounded-full w-32 h-32 mb-4"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="form-control text-sm"
                />
                {errors.image && (
                  <div className="text-red-500 text-sm">{errors.image}</div>
                )}
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-sm">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.first_name && (
                    <div className="text-red-500 text-sm">
                      {errors.first_name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.last_name && (
                    <div className="text-red-500 text-sm">
                      {errors.last_name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Phone Number</label>
                  <InputMask
                    mask={phoneMask}
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.phone_number && (
                    <div className="text-red-500 text-sm">
                      {errors.phone_number}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.department && (
                    <div className="text-red-500 text-sm">
                      {errors.department}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.position && (
                    <div className="text-red-500 text-sm">
                      {errors.position}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Hire Date</label>
                  <input
                    type="date"
                    name="hire_date"
                    value={formData.hire_date}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  />
                  {errors.hire_date && (
                    <div className="text-red-500 text-sm">
                      {errors.hire_date}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="form-control text-sm"
                  />
                  {errors.birthday && (
                    <div className="text-red-500 text-sm">
                      {errors.birthday}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">Equipament / Device</label>
                  <select
                    name="equipament_id"
                    value={formData.equipament_id}
                    onChange={handleChange}
                    className="form-control text-sm"
                    required
                  >
                    <option value="">Select Equipament</option>
                    {equipaments.map((equipament) => (
                      <option key={equipament.id} value={equipament.id}>
                        {equipament.device.device_id}
                      </option>
                    ))}
                  </select>
                  {errors.equipament_id && (
                    <div className="text-red-500 text-sm">
                      {errors.equipament_id}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-sm">RFID</label>
                  <input
                    type="text"
                    name="rfid"
                    value={formData.rfid}
                    className="form-control text-sm"
                    readOnly
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="text-sm">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-control text-sm"
                  ></textarea>
                  {errors.bio && (
                    <div className="text-red-500 text-sm">{errors.bio}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Create Operator
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/operator")}
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OperatorCreate;
