module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmpty: { msg: "La valeur nom ne peux pas être vide" },
          notNull: { msg: "La valeur du nom sont une propriété requise !" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [999],
            msg: "La valeur de point de vie doit être inferieur ou égales a 999",
          },
          min: {
            args: [0],
            msg: "La valeur de point de vie doit être supérieur a 0",
          },
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          notNull: { msg: "Les points de vie sont une propriété requise !" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [99],
            msg: "La valeur de point de dégat doit être inferieur ou égales a 99",
          },
          min: {
            args: [0],
            msg: "La valeur de point de dégat doit être supérieur a 0",
          },
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégats.",
          },
          notNull: { msg: "Les points de dégat sont une propriété requise !" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
          notNull: { msg: "L'image sont une propriété requise !" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
