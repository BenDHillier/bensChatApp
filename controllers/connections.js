let connections = [];
module.exports = {
    getId: (user)=>{
        let id = "";
        connections.forEach(function(item){
            if(item.user === user) {
                id = item.id;
            }
        })
        return id;
    },
    addConnection: function (user, id){
        if(user){
            let result = true;
            connections.forEach(function(item){
                if(item.user === user) result = false;
            })
            if(result)
                connections.push({user: user, id: id});
        }
    }
}
