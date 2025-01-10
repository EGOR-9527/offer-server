import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

// Модель пользователя
class User extends Model {
  public id!: number;
  public email!: string;
  public avatar!: string | null;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User ',
  }
);

// Модель категории
class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: false,
});

// Модель поста обратной связи
class FeedbackPost extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public category!: string;
    public status!: string;
    public authorId!: number;
    public votes!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  FeedbackPost.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'FeedbackPost',
    }
  );

// Модель предложения
class Offer extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public votes!: number;
  public createdAt!: Date;
}

Offer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  votes: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Offer',
  tableName: 'offers',
  timestamps: false,
});

// Модель токена обновления
class RefreshToken extends Model {
  declare id: number;
  declare token: string;
  declare userId: number;
}

RefreshToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'RefreshToken',
});

// Модель статуса
class Status extends Model {
    public id!: number;
    public name!: string;
  }
  
  Status.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',
    timestamps: false,
  });

// Модель голоса
class Upvote extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Upvote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FeedbackPost,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Upvote',
  }
);

export { User, Category, FeedbackPost, Offer, RefreshToken, Status, Upvote };