const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('type_of_diets', {
		// ID: *
		type_of_diets_id: {
			type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		// Nombre *
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
