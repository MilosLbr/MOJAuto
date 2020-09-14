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

    static async GetRegistrationsByCarId(carId) {
        const token = myAuthService.getAccessToken();
        const url = "/api/registrations/getRegistrationsForCar/"+ carId;
        const response = await fetch(url,
            {
                headers: {
                    'Authorization': "Bearer " + token
                }
            });
        
        if (response.ok) {
            const jsonResponse = await response.json();
            
            return jsonResponse;
        }
    }

    static async GetRegistrationsForUser() {
        const token = myAuthService.getAccessToken();
        const url = "/api/registrations/getRegistrationsForCurrentUser";

        const response = await fetch(url,
            {
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