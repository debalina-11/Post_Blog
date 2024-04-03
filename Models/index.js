const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('Blog_post','root','debalina',{
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000},
    logging:false
})

sequelize.authenticate()
.then(()=>{
    console.log("DB Connected");
})
.catch(err => {
    console.log("Error"+err);
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users')(sequelize,DataTypes)
db.posts = require('./posts')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re sync");
})
module.exports=db