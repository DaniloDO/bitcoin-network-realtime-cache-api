// subscriptionMiddleware to verify user's subscription

const subscriptionMiddleware = (feature) => {
    // High order function to return customize middleware 
    return (req, res, next) => {

        // Extracts user data from the decoded payload of the login process
        const user = req.user; 
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated'}); 
        }

        // Checks if user is subscribed to feature
        const isSubscribed = user.subscriptions[feature]; 
        if(isSubscribed) {
            return next(); 
        }

        return res.status(403).json({ message: `Access denied: ${feature} subscription required`}); 

    }
}

export default subscriptionMiddleware; 