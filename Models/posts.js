module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define('Posts',{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true 
        }
    }, {
        timestamps: false
    });

    Posts.associate = function(models) {
        Posts.belongsTo(models.Users, { foreignKey: 'author_id' });
    };
    return Posts;
}


