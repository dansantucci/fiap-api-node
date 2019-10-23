const UsersModel = new (require('../models/Users'))();
class Auth {
    static login(request, response, next) {
        const { email, password } = request.body;
    
        UsersModel.auth(email, password)
            .then(users => {
                if(users.docs.length === 0) {
                    return response
                        .status(401)
                        .send({ 
                            code: 'not_found',
                            message: 'User not found'
                        });
                }
    
                const [{ id }] = users.docs;
                response.json({ token: createToken({ id }) });
            })
            .catch(err => {
                response
                    .sendStatus(500);
                console.log(err);
                console.log('Error getting document', err);
            });
    }

}

module.exports = Auth;