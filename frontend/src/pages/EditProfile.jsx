import { useState } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null); // Store the file for upload
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setProfilePhotoFile(file); // Store the file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const formData = new FormData();
      
      if (name) formData.append('name', name);
      if (password) formData.append('password', password);
      if (profilePhotoFile) formData.append('file', profilePhotoFile);
  
    
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
  
      const responseText = await response.text();
      console.log('Raw response:', responseText);
  
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error(`Server sent invalid response: ${responseText.slice(0, 100)}...`);
      }
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
  
      setSuccess("Profile updated successfully!");
      
      setName("");
      setPassword("");
      setProfilePhoto(null);
      setProfilePhotoFile(null);
      
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message || "An error occurred while updating profile");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#472C9D] to-[#644AB5] flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] bg-white rounded-3xl p-10 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#472C9D]">
          Edit Profile
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col items-center">
            <Avatar
              src={profilePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
              sx={{ width: 100, height: 100 }}
              className="shadow-lg"
            />
            <label
              htmlFor="profile-photo-upload"
              className="mt-3 cursor-pointer text-[#472C9D]"
            >
              <CameraAltIcon fontSize="small" /> Change Profile Photo
            </label>
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
          </div>

          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
            InputLabelProps={{
              style: { color: "#472C9D" },
            }}
            InputProps={{
              style: { color: "#472C9D", borderColor: "#472C9D" },
            }}
          />

          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#472C9D" },
            }}
            InputProps={{
              style: { color: "#472C9D", borderColor: "#472C9D" },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#472C9D",
              color: "white",
              marginTop: "20px",
            }}
            className="rounded-2xl"
          >
            Save Changes
          </Button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
