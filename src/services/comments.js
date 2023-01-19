import sequelize from '../utils/db.js';
import { DataTypes } from 'sequelize';
import { io } from '../../index.js';

const Comments = sequelize.define(
  'Comments',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    home_page: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Comments',
    updatedAt: false,
  },
);

Comments.hasOne(Comments, {
  foreignKey: 'parent_id',
});

export async function getAll() {
  const result = await Comments.findAll({
    where: {
      parent_id: null,
    },
    order: ['createdAt'],
  });

  return result;
}

const getSubCommentsRecursive = async (comment) => {
  let subComments = await Comments.findAll({
    where: {
      parent_id: comment.id,
    },
    raw: false,
  });

  if (subComments.length > 0) {
    const promises = [];
    subComments.forEach((comm) => {
      promises.push(getSubCommentsRecursive(comm));
    });
    comment['dataValues']['subComments'] = await Promise.all(promises);
  } else comment['dataValues']['subComments'] = [];

  return comment;
};

export async function getById(commentId) {
  const rootComment = await Comments.findByPk(commentId, { raw: false });

  await getSubCommentsRecursive(rootComment);

  return rootComment;
}

export async function create(
  user_name,
  email,
  home_page,
  text,
  parent_id,
  file,
) {
  try {
    let newComment = await Comments.create({
      user_name,
      email,
      home_page,
      text,
      parent_id,
      file,
    });

    return newComment;
  } catch (err) {
    console.log(err);
  }
};