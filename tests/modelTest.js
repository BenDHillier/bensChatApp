let models = require('../models/models');
let user = models.createUser('Ben');
console.log(user.picture);
console.log(models.defaultProfile.username);
