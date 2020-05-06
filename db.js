const Sequelize = require('sequelize')
const config = require('./config')
const uuid = require('uuid')

console.log('init sequelize...')

/**返回唯一id */
function generateId() {
  return uuid.v4()
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 1000,
    },
  }
)

const ID_TYPE = Sequelize.STRING(50)

function defineModel(name, attributes) {
  const attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      }
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  console.log(
    'model defined for table: ' +
      name +
      '\n' +
      JSON.stringify(
        attrs,
        function (k, v) {
          if (k === 'type') {
            for (let key in Sequelize) {
              if (key === 'ABSTRACT' || key === 'NUMBER') {
                continue
              }
              let dbType = Sequelize[key]
              if (typeof dbType === 'function') {
                if (v instanceof dbType) {
                  if (v._length) {
                    return `${dbType.key}(${v._length})`
                  }
                  return dbType.key
                }
                if (v === dbType) {
                  return dbType.key
                }
              }
            }
          }
          return v
        },
        '  '
      )
  )
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now()
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId()
          }
          obj.createdAt = now
          obj.updatedAt = now
          obj.version = 0
        } else {
          console.log('will update entity...')
          obj.updatedAt = now
          obj.version++
        }
      },
    },
  })
}

const TYPES = [
  'STRING',
  'INTEGER',
  'BIGINT',
  'TEXT',
  'DOUBLE',
  'DATEONLY',
  'BOOLEAN',
]

const exp = {
  defineModel,
  sync: () => {
    // 数据表初始化
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: true }) // 强制同步, 删除同名数据表后同步，谨慎使用，会导致数据丢失   {alter: true}:动态同步,修改同名数据表结构，以适用模型。
    } else {
      throw new Error("Cannot sync() when NODE_ENV is set to 'production'.")
    }
  },
}

for (let type of TYPES) {
  exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId
module.exports = exp
