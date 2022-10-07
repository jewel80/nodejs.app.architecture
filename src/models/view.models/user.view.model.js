class UserViewModel {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.address = user.address;
        this.createdAt = user.createdAt;
    }
}
module.exports.UserViewModel= UserViewModel;