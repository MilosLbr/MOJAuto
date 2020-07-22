import jwtDecode from 'jwt-decode';

export default class myAuthService {

    static logIn(loginUserDto) {
        return fetch("/api/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUserDto)
        });
    }


    static isUserLoggedIn() {
        let token = sessionStorage.getItem("token");

        if (token!== null) {

            let decodedToken = jwtDecode(token);

            if (Date.now() >= decodedToken.exp * 1000) {
                return false;
            }
            return true;
        }

        return false;
    }

    static getUserName() {
        let token = sessionStorage.getItem("token");

        if (token !== null) {
            let decodedToken = jwtDecode(token);
            return decodedToken.email;

        }
        return null;
    }

    static getAccessToken() {
        let token = sessionStorage.getItem("token");

        if (token !== null) {
            return token;
        }
        return null;
    }

}