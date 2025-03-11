<div>
<h1>Profile Settings</h1>
<p>Update your profile information and preferences.</p>
      <div className="account-box">
        <img 
          src={user.profile_image && images} 
          alt="Profile" 
          width={150} 
          height={150} 
        />
        <p>Change Image</p>
      </div>

      <div className="account-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
      </div>
</div>