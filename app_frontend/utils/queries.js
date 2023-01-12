export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };

export const fetchUsers = `*[_type == "user"]`

export const fetchLoginUser = (username, email) => {
  const query = `*[_type == "user" && username == '${username}' && email == '${email}'][0]`;
  return query
}