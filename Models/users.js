module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('Users',{
        userName:{
            type:DataTypes.STRING,
    
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING
        }
    },{
        timestamps:false
    })
    return Users;
}