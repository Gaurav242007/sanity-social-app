export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };

export const fetchUsers = `*[_type == "user"] | order(_createdAt desc)`;

export const fetchPosts = `*[_type == "post"] | order(_createdAt desc)`;

export const fetchChats = `*[_type == "chat"] | order(_createdAt asc)`;


export const fetchLoginUser = (username, email) => {
  const query = `*[_type == "user" && username == '${username}' && email == '${email}'][0]`;
  return query
}