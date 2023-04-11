import { useNavigate } from "react-router-dom";

class AuthService {
  username = "";
  //   navigate = useNavigate();

  async isLoggedIn(username) {
    if (!username) {
      return false;
    }
    return true;
  }

  async login() {
    if (this.username) {
      //   this.navigate("/upload");
    }
  }

  async getUser() {
    return this.username;
  }

  async setUser(username) {
    this.username = username;
  }
}

const authService = new AuthService();
export default authService;
