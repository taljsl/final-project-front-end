import React, { useState } from "react";
import { getUserProfile } from "../Services/ServiceFunctions";

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
        // If we have a token, run the fetch
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(token);
                setProfile(data);
            } catch (err) {
                setError("Failed to Fetch Profile");
            }
        };
        fetchProfile();
    }
}, [token]); 


  return (
    <div>
        <h2>Profile</h2>
        {profile? (
            <div>
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
                <p>Nickname: {profile.nickname}</p>
                </div>
        ): (
            <p>Loading</p>
        )}
    </div>
  )
};

export default ProfilePage;
