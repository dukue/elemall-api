# 前台商城 API 文档

## 基础信息
- 基础路径: `/api/v1/mall`
- 请求格式: JSON
- 响应格式: JSON
- 认证方式: Bearer Token

## 错误码说明
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/token失效 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

## 用户相关接口

### 1. 用户注册
- **接口**: POST `/api/v1/mall/user/register`
- **描述**: 新用户注册
- **请求参数**:
  ```json
  {
    "username": "string(3-50)",
    "password": "string(6-20)",
    "email": "string",
    "mobile": "string"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "注册成功",
    "data": {
      "id": 1,
      "username": "user123",
      "email": "user@example.com",
      "mobile": "13800138000"
    }
  }
  ```

### 2. 用户登录
- **接口**: POST `/api/v1/mall/user/login`
- **描述**: 用户登录获取token
- **请求参数**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "登录成功",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": {
        "id": 1,
        "username": "user123",
        "email": "user@example.com"
      }
    }
  }
  ```

### 3. 获取用户信息
- **接口**: GET `/api/v1/mall/user/info`
- **描述**: 获取当前登录用户信息
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "id": 1,
      "username": "user123",
      "email": "user@example.com",
      "mobile": "13800138000",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
  ```

### 4. 修改用户信息
- **接口**: PUT `/api/v1/mall/user/info`
- **描述**: 修改用户基本信息
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "email": "string",
    "mobile": "string",
    "avatar": "string"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "修改成功",
    "data": {
      "id": 1,
      "email": "new@example.com",
      "mobile": "13800138000",
      "avatar": "https://example.com/new-avatar.jpg"
    }
  }
  ```

### 5. 修改密码
- **接口**: PUT `/api/v1/mall/user/password`
- **描述**: 修改用户密码
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "密码修改成功"
  }
  ```

## 地址管理接口

### 1. 添加收货地址
- **接口**: POST `/api/v1/mall/address`
- **描述**: 添加新的收货地址
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "receiverName": "string",
    "receiverPhone": "string",
    "province": "string",
    "city": "string",
    "district": "string",
    "detailAddress": "string",
    "isDefault": boolean
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "添加成功",
    "data": {
      "id": 1,
      "receiverName": "张三",
      "receiverPhone": "13800138000",
      "province": "广东省",
      "city": "深圳市",
      "district": "南山区",
      "detailAddress": "科技园路1号",
      "isDefault": true
    }
  }
  ```

### 2. 获取地址列表
- **接口**: GET `/api/v1/mall/address`
- **描述**: 获取用户的所有收货地址
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 2,
      "list": [
        {
          "id": 1,
          "receiverName": "张三",
          "receiverPhone": "13800138000",
          "province": "广东省",
          "city": "深圳市",
          "district": "南山区",
          "detailAddress": "科技园路1号",
          "isDefault": true
        }
      ]
    }
  }
  ```

### 3. 修改收货地址
- **接口**: PUT `/api/v1/mall/address/:id`
- **描述**: 修改指定收货地址
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "receiverName": "string",
    "receiverPhone": "string",
    "province": "string",
    "city": "string",
    "district": "string",
    "detailAddress": "string",
    "isDefault": boolean
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "修改成功"
  }
  ```

### 4. 删除收货地址
- **接口**: DELETE `/api/v1/mall/address/:id`
- **描述**: 删除指定收货地址
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

## 购物车接口

### 1. 添加商品到购物车
- **接口**: POST `/api/v1/mall/cart`
- **描述**: 添加商品到购物车
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "productId": "number",
    "quantity": "number"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "添加成功",
    "data": {
      "id": 1,
      "productId": 1,
      "quantity": 2
    }
  }
  ```

### 2. 获取购物车列表
- **接口**: GET `/api/v1/mall/cart`
- **描述**: 获取当前用户的购物车商品列表
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 2,
      "totalAmount": 299.00,
      "items": [
        {
          "id": 1,
          "productId": 1,
          "productName": "商品名称",
          "productImage": "图片URL",
          "price": 99.00,
          "quantity": 2,
          "selected": true
        }
      ]
    }
  }
  ```

### 3. 更新购物车商品数量
- **接口**: PUT `/api/v1/mall/cart/:id`
- **描述**: 更新购物车中商品的数量
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "quantity": "number"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "更新成功"
  }
  ```

### 4. 删除购物车商品
- **接口**: DELETE `/api/v1/mall/cart/:id`
- **描述**: 从购物车中删除商品
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "删除成功"
  }
  ```

## 订单接口

### 1. 创建订单
- **接口**: POST `/api/v1/mall/order`
- **描述**: 创建新订单
- **请求头**: 需要携带token
- **请求参数**:
  ```json
  {
    "addressId": "number",
    "items": [
      {
        "productId": "number",
        "quantity": "number"
      }
    ],
    "remark": "string"
  }
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "创建成功",
    "data": {
      "orderId": "202403041234567",
      "totalAmount": 299.00,
      "status": "待支付"
    }
  }
  ```

### 2. 获取订单列表
- **接口**: GET `/api/v1/mall/order`
- **描述**: 获取用户订单列表
- **请求头**: 需要携带token
- **请求参数**:
  ```
  status: all/unpaid/paid/shipped/completed/cancelled (query参数)
  page: number
  pageSize: number
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 10,
      "list": [
        {
          "orderId": "202403041234567",
          "totalAmount": 299.00,
          "status": "待支付",
          "createTime": "2024-03-04 12:34:56",
          "items": [
            {
              "productId": 1,
              "productName": "商品名称",
              "productImage": "图片URL",
              "price": 99.00,
              "quantity": 2
            }
          ]
        }
      ]
    }
  }
  ```

### 3. 获取订单详情
- **接口**: GET `/api/v1/mall/order/:orderId`
- **描述**: 获取订单详细信息
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "orderId": "202403041234567",
      "totalAmount": 299.00,
      "status": "待支付",
      "createTime": "2024-03-04 12:34:56",
      "address": {
        "receiverName": "张三",
        "receiverPhone": "13800138000",
        "fullAddress": "广东省深圳市南山区科技园路1号"
      },
      "items": [
        {
          "productId": 1,
          "productName": "商品名称",
          "productImage": "图片URL",
          "price": 99.00,
          "quantity": 2
        }
      ],
      "remark": "备注信息"
    }
  }
  ```

### 4. 取消订单
- **接口**: PUT `/api/v1/mall/order/:orderId/cancel`
- **描述**: 取消未支付的订单
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "订单已取消"
  }
  ```

### 5. 确认收货
- **接口**: PUT `/api/v1/mall/order/:orderId/confirm`
- **描述**: 确认收到商品
- **请求头**: 需要携带token
- **响应示例**:
  ```json
  {
    "code": 200,
    "message": "确认收货成功"
  }
  ```

## 商品接口

### 1. 获取商品列表
- **接口**: GET `/api/v1/mall/products`
- **描述**: 获取商品列表
- **请求参数**:
  ```
  category: string (query参数，可选)
  keyword: string (query参数，可选)
  page: number
  pageSize: number
  sort: string (price_asc/price_desc/sales_desc)
  ```
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "name": "商品名称",
          "description": "商品描述",
          "price": 99.00,
          "originalPrice": 199.00,
          "image": "主图URL",
          "sales": 100,
          "stock": 999,
          "category": "分类名称"
        }
      ]
    }
  }
  ```

### 2. 获取商品详情
- **接口**: GET `/api/v1/mall/products/:id`
- **描述**: 获取商品详细信息
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": {
      "id": 1,
      "name": "商品名称",
      "description": "商品详细描述",
      "price": 99.00,
      "originalPrice": 199.00,
      "images": ["图片URL1", "图片URL2"],
      "sales": 100,
      "stock": 999,
      "category": "分类名称",
      "specifications": [
        {
          "name": "规格名称",
          "values": ["规格值1", "规格值2"]
        }
      ],
      "details": "商品详情HTML"
    }
  }
  ```

### 3. 获取商品分类
- **接口**: GET `/api/v1/mall/categories`
- **描述**: 获取商品分类列表
- **响应示例**:
  ```json
  {
    "code": 200,
    "data": [
      {
        "id": 1,
        "name": "分类名称",
        "icon": "分类图标URL",
        "children": [
          {
            "id": 2,
            "name": "子分类名称",
            "icon": "子分类图标URL"
          }
        ]
      }
    ]
  }
  ```
