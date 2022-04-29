const bcrypt = require('bcrypt');
const { nanoid } = require("nanoid");

exports.cryptPassword = (password) =>
    bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash);

exports.comparePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword)
        .then(resp => resp)

exports.generateId = () => nanoid();

exports.getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function representRemainTime(){
    setTimeout(()=>{
        console.log(Math.floor(n/60) + ' ' + (n%60));
        n--;
        foo();
    }, 1000)

}








