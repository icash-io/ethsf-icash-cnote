'use strict';
module.exports = (sequelize, DataTypes) => {
  var KycDocument = sequelize.define('KycDocument', {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
      },
      createRecord: async function(obj, user) {
        const kycDoc = this.build(obj);
        await kycDoc.save();
        return await kycDoc.setUser(user);    
      },
    }
  });
  return KycDocument;
};