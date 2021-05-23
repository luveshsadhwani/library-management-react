
const authentication={
    isLoggedIn:false,
    onAuthentication(){
        this.isLoggedIn=true
    },
    getLoginStatus(){
        return this.isLoggedIn
    }
}



export default authentication