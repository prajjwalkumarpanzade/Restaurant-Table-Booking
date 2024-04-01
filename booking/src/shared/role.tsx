import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  role: string;
}

// rewrite as function

export const isAdmin = ()=>{
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);
    const role = decodedToken.role;
    console.log("User role:", role);
    return role.includes("admin");
  }
  return false;
}




