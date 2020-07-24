import jwtDecode from 'jwt-decode';

export default class myAuthService {

    static async logIn(loginUserDto) {
        const response = await fetch("/api/auth/loginuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUserDto)
        });
        
        if (!response.ok) {
            let  responseInvalid = await response.text().then(text => {
                return { "success": false, "text": text }
            });

            return responseInvalid;
        } else {
            let jsonResponse = await response.json();
            let token = jsonResponse.token;

            sessionStorage.setItem("token", token);
            return { "success": true };
        }
    }

    static register(registerUserDto) {
        return fetch("/api/auth/registeruser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerUserDto)
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
            
            return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

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