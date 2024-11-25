// tokenService.js
import axios from "axios";

export const checkToken = async (accessToken, serverUri) => {
    if (accessToken) {
        try {
            const response = await axios.post(`${serverUri}/api/token/valid-token`, {
                token: accessToken,
            });
            console.log(response)

            return response.status === 200; // Nếu token hợp lệ
        } catch (error) {
            console.error("Token không hợp lệ", error);
            return false; // Nếu có lỗi xảy ra
        }
    }
    return false;
};
