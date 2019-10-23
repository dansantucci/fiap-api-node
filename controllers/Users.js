const UsersModel = new (require('../models/Users'))();
class Users {
    static get(request, response) {
        const id = request.params.id;
        
        UsersModel.get(id)
            .then(user => {
                if(!user.exists) {
                    response
                        .sendStatus(404);
                        //.send({ message: 'No Content' });
                }
    
                response.json(user.data());
            })
            .catch(err => {
                response
                    .sendStatus(500);
                console.log(err);
                console.log('Error getting document', err);
            });
    }
}

module.exports = Users;