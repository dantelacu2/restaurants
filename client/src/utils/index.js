
export const isLogin = () => {
    if (localStorage.getItem("token")) {
        console.log("Successfully validated")
        return true;
    }
    console.log("fail to validate");
    return false;
}