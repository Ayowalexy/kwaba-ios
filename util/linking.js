const config = {
    screens: {
        Login: "Login",
        BuddySavings: {
            path: "buddySavings/:id",
            parse: {
                id: (id) => `${id}`
            }
        },
        SoloSavings: {
            path: "soloSavings/:id",
            parse: {
                id: (id) => `${id}`
            }
        }
    }
}


const linking = {
    prefixes: ["kwaba://app"],
    config
}

export default linking