import React from "react";

interface ProfileAvatarProps {
  name: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name }) => {
  const firstLetter = name?.charAt(0).toUpperCase() || "?";

  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#1976d2",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: 20,
      userSelect: "none",
    }}>
      {firstLetter}
    </div>
  );
};

export default ProfileAvatar;
