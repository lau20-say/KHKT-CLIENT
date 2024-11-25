export const initialState = {
    user: {
        id: null,
        name: null,
        email: null,
        avatar: null,
        accessToken: null,
    },
    login: false,
    loading: false,
    navbar: true,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SCREEN_LOADING":
            return {
                ...state,
                loading: action.payload.loading,
            };
        case "SET_HAS_LOGIN":
            return {
                ...state,
                login: action.payload.login,
            };

        case "SET_OPEN_NAV":
            return {
                ...state,
                navbar: action.payload.navbar,
            };

        case "USER_LOGIN":
            const { name, email, avatar, accessToken,id } = action.payload;

            // Lưu RefreshToken và AccessToken vào localStorage
            localStorage.setItem("AccessToken", accessToken)
            localStorage.setItem("Fullname", name);
            localStorage.setItem("Email", email);
            localStorage.setItem("Avatar", avatar);
            localStorage.setItem("Id", id);
            return {
                ...state,
                user: { id,name, email, avatar, accessToken },
            };


        case "USER_LOGOUT":
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("Fullname");
            localStorage.removeItem("Email");
            localStorage.removeItem("Avatar");
            localStorage.removeItem("Id");

            return {
                ...state,
                login: false,
                user: {
                    name: null,
                    email: null,
                    avatar: null,
                    accessToken: null,
                    id: null,

                },
            };
        case "UPDATE_USER_AVATAR":
            return {
                ...state,
                user: { ...state.user, avatar: action.payload },
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    name: action.payload.name, email: action.payload.email, avatar: action.payload.avatar
                }
            };
        default:
            return state;
    }
};
