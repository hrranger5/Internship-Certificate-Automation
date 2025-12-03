const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_URL, {
dialect: 'mysql',
logging: false,
});


// Intern Model
const Intern = sequelize.define('Intern', {
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false },
role: { type: DataTypes.STRING },
start_date: { type: DataTypes.DATE },
end_date: { type: DataTypes.DATE },
status: {
type: DataTypes.ENUM('active', 'completed', 'terminated'),
defaultValue: 'active'
},
});


// Certificates Model
const Certificate = sequelize.define('Certificate', {
filename: { type: DataTypes.STRING },
url: { type: DataTypes.STRING },
email_sent: { type: DataTypes.BOOLEAN, defaultValue: false },
});


Intern.hasMany(Certificate, { foreignKey: 'intern_id' });
Certificate.belongsTo(Intern, { foreignKey: 'intern_id' });


module.exports = { sequelize, Intern, Certificate };
