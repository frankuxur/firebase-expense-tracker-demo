export const useGetUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('auth'))
    if (userInfo) {
        const { name, profilePhoto, userID, isAuth } = userInfo
        return { name, profilePhoto, userID, isAuth }
    }

    return { isAuth: false }
}