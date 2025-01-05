# Elemall_API

这是一个基于 Node.js + Express 开发的电商后台管理系统 API，提供了完整的商品管理、订单管理、库存管理、多语言支持等功能。

## 功能特性

- 用户认证与授权
- 商品管理
  - 商品 CRUD
  - 商品分类管理
  - 多语言商品信息
  - 商品规格管理
- 订单管理
  - 订单状态流转
  - 订单详情查看
  - 支付方式管理
- 库存管理
  - 多仓库管理
  - 库存调拨
  - 库存变动记录
- 国际化支持
  - 多语言内容管理
  - 汇率管理
- 物流管理
  - 物流跟踪
  - 运单管理
- 清关管理
  - 清关状态管理
  - 清关文件上传下载
- 数据统计
  - 销售统计
  - 订单统计
  - 库存统计

## 技术栈

- Node.js
- Express
- MySQL
- Sequelize ORM
- JWT 认证
- Multer 文件上传

## 环境要求

- Node.js >= 12.0.0
- MySQL >= 5.7

## 安装部署

1. 克隆项目
```bash
git clone [repository-url]
cd ecommerce-admin-api
```

2.安装依赖

```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
```
编辑 .env 文件，配置数据库连接等信息：
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
```

4. 初始化数据库
```bash
node scripts/init-db.js
```

5. 启动服务
```bash
# 开发环境
npm run dev

# 生产环境
npm start
```

## API 文档

### 认证相关

- POST `/api/v1/auth/login` - 用户登录
- POST `/api/v1/auth/register` - 用户注册

### 商品管理

- GET `/api/v1/products` - 获取商品列表
- POST `/api/v1/products` - 创建商品
- PUT `/api/v1/products/:id` - 更新商品
- GET `/api/v1/products/:id` - 获取商品详情
- POST `/api/v1/products/:id/translations` - 添加商品翻译

### 订单管理

- GET `/api/v1/orders` - 获取订单列表
- GET `/api/v1/orders/:id` - 获取订单详情
- PUT `/api/v1/orders/:id/status` - 更新订单状态

### 库存管理

- GET `/api/v1/warehouses` - 获取仓库列表
- POST `/api/v1/warehouses` - 创建仓库
- GET `/api/v1/products/:id/inventory` - 获取商品库存
- PUT `/api/v1/products/:id/inventory/transfer` - 库存调拨

### 数据统计

- GET `/api/v1/statistics/overview` - 获取概览数据
- GET `/api/v1/statistics/sales` - 获取销售统计
- GET `/api/v1/statistics/inventory` - 获取库存统计

## 目录结构

```
├── config/             # 配置文件
├── controllers/        # 控制器
├── middleware/         # 中间件
├── models/            # 数据模型
├── routes/            # 路由
├── scripts/           # 脚本文件
├── uploads/           # 上传文件目录
├── app.js             # 应用入口
└── package.json
```

## 开发团队

- 后端开发
- 技术支持

## License

MIT
