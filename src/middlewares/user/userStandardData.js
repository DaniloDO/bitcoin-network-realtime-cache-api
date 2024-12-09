
const standardData = (req, res, next) => {
    const data = req.body;
    
    if(data['subscriptions.coingecko'] || data['subscriptions.mempool'] || data['subscriptions.mempool']) {
        const standard = {
            username: data.username,
            password: data.password,
            email: data.email,
            emailVerifiedAt: data.emailVerifiedAt,
            subscriptions: {
                coingecko: data['subscriptions.coingecko'],
                mempool: data['subscriptions.mempool'],
                realtime: data['subscriptions.realtime']
            }
        }; 

        res.locals.updatedData = standard;
        next();
    }

    else{
        res.locals.updatedData = data; 
        next(); 
    }


}

export default standardData; 