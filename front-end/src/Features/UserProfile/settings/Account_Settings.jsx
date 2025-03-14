import React, {useState} from "react";
import ProfileForm from "./Profile_Form";

const AccountSettings = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <ProfileForm setEditing={setEditing} setUser={setUser}/>
  );
};

export default AccountSettings;
