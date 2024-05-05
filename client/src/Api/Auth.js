import axiosSecure from ".";

// Save user data in database
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "guest",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

// Create token for the user
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  console.log("token is :  ", data);
  return data;
};

// Clear token
export const clearToken = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

// get user role
export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data.role;
};

// get all users
export const getUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

// update user role
export const updateRole = async ({ email, role }) => {
  const { data } = await axiosSecure.put(`/users/update/${email}`, {
    email,
    role,
    status: "Verified",
  });
  return data;
};

// update user status
export const updateStatus = async (email) => {
  const { data } = await axiosSecure.put(`/users/${email}`, {
    email,
    status: "Requested",
  });
  return data;
};
