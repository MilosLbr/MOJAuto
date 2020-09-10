import myAuthService from "./myAuthService";

export default class carService {


    static async GetUsersCars() {

        const token = myAuthService.getAccessToken();
        const response = await fetch("/api/cars/getCarsForUser", {
            headers: {
                'Authorization': "Bearer " + token
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();

            return jsonResponse;
        }
    }
}