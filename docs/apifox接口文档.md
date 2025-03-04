---
title: 电商毕设
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.28"

---

# 电商毕设

Base URLs:

* <a href="http://localhost:3000/api/v1">开发环境: http://localhost:3000/api/v1</a>

# Authentication

# Default

## POST 登录

POST /auth/login

> Body 请求参数

```
username: admin
password: "123456"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MTA3ODIyOCwiZXhwIjoxNzQxMTY0NjI4fQ.JfyQDkRUaujrSmWbxeSAM3qffP4UqaFkOK48OPFVPx8",
    "userInfo": {
      "id": 1,
      "username": "admin",
      "role": "admin",
      "avatar": "https://example.com/default-avatar.jpg"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» token|string|true|none||none|
|»» userInfo|object|true|none||none|
|»»» id|integer|true|none||none|
|»»» username|string|true|none||none|
|»»» role|string|true|none||none|
|»»» avatar|string|true|none||none|

## POST 临时文件

POST /temp-upload

> Body 请求参数

```yaml
file: file://C:\Users\dk\Pictures\01c8be56d7e78c6ac7252ce67e333c.jpg@900w_1l_2o_100sh.jpg

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|object| 否 |none|
|» file|body|string(binary)| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "文件上传成功",
  "data": {
    "filename": "1741078498993-148226419.jpg",
    "path": "uploads/temp/1741078498993-148226419.jpg",
    "mimetype": "image/jpeg",
    "size": 55831
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» filename|string|true|none||none|
|»» path|string|true|none||none|
|»» mimetype|string|true|none||none|
|»» size|integer|true|none||none|

# 用户

## GET 用户列表

GET /auth/users

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pagenum|query|string| 否 |none|
|pagesize|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取用户列表成功",
  "data": {
    "total": 11,
    "users": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@test.com",
        "mobile": "13800138000",
        "role": "admin",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 2,
        "username": "user1",
        "email": "user1@test.com",
        "mobile": "13800138000",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 3,
        "username": "user2",
        "email": "user2@test.com",
        "mobile": "13800138001",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 4,
        "username": "user3",
        "email": "user3@test.com",
        "mobile": "13800138002",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 5,
        "username": "user4",
        "email": "user4@test.com",
        "mobile": "13800138003",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 6,
        "username": "user5",
        "email": "user5@test.com",
        "mobile": "13800138004",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 7,
        "username": "user6",
        "email": "user6@test.com",
        "mobile": "13800138005",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 8,
        "username": "user7",
        "email": "user7@test.com",
        "mobile": "13800138006",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 9,
        "username": "user8",
        "email": "user8@test.com",
        "mobile": "13800138007",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      },
      {
        "id": 10,
        "username": "user9",
        "email": "user9@test.com",
        "mobile": "13800138008",
        "role": "user",
        "status": true,
        "createTime": "2025-03-03T12:52:18.000Z"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» users|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» username|string|true|none||none|
|»»» email|string|true|none||none|
|»»» mobile|string|true|none||none|
|»»» role|string|true|none||none|
|»»» status|boolean|true|none||none|
|»»» createTime|string|true|none||none|

## POST 添加用户

POST /auth/users

> Body 请求参数

```
username: test
password: "123456"
email: test@test.com
mobile: "13800138000"
role: user

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "用户创建成功",
  "data": {
    "id": 12,
    "username": "test",
    "email": "test@test.com",
    "mobile": "13800138000",
    "role": "user",
    "status": true,
    "createTime": "2025-03-04T08:55:38.927Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改用户

PUT /auth/users/2

> Body 请求参数

```
email: new@test.com
mobile: "13800138001"
role: admin
status: true

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "用户信息更新成功",
  "data": {
    "id": 2,
    "username": "user1",
    "email": "new@test.com",
    "mobile": "13800138001",
    "role": "admin",
    "status": true,
    "createTime": "2025-03-03T12:52:18.000Z",
    "updateTime": "2025-03-04T08:56:09.429Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除用户

DELETE /auth/users/3

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "用户删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## PUT 用户状态

PUT /auth/users/3/status

> Body 请求参数

```
status: true

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|status|query|boolean| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "用户状态更新成功",
  "data": {
    "id": 3,
    "username": "user2",
    "status": true
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» username|string|true|none||none|
|»» status|boolean|true|none||none|

# 商品

## GET 商品列表

GET /products

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pagenum|query|string| 否 |none|
|pagesize|query|string| 否 |none|
|query|query|string| 否 |none|
|lang|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取商品列表成功",
  "data": {
    "total": 11,
    "products": [
      {
        "id": 1,
        "name": "Product 1",
        "price": "231.74",
        "weight": "1.60",
        "status": true,
        "image": "uploads/products/product-1.jpg",
        "images": [
          "uploads/products/product-1-1.jpg",
          "uploads/products/product-1-2.jpg",
          "uploads/products/product-1-3.jpg"
        ],
        "category": {
          "id": 3,
          "name": "Food"
        },
        "description": "This is product 1 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 10,
        "name": "Product 10",
        "price": "146.95",
        "weight": "6.99",
        "status": true,
        "image": "uploads/products/product-10.jpg",
        "images": [
          "uploads/products/product-10-1.jpg",
          "uploads/products/product-10-2.jpg",
          "uploads/products/product-10-3.jpg"
        ],
        "category": {
          "id": 2,
          "name": "Clothing"
        },
        "description": "This is product 10 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 11,
        "name": "Product 11",
        "price": "244.61",
        "weight": "5.23",
        "status": true,
        "image": "uploads/products/product-11.jpg",
        "images": [
          "uploads/products/product-11-1.jpg",
          "uploads/products/product-11-2.jpg",
          "uploads/products/product-11-3.jpg"
        ],
        "category": {
          "id": 2,
          "name": "Clothing"
        },
        "description": "This is product 11 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 12,
        "name": "Product 12",
        "price": "199.72",
        "weight": "4.59",
        "status": true,
        "image": "uploads/products/product-12.jpg",
        "images": [
          "uploads/products/product-12-1.jpg",
          "uploads/products/product-12-2.jpg",
          "uploads/products/product-12-3.jpg"
        ],
        "category": {
          "id": 4,
          "name": "Home"
        },
        "description": "This is product 12 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 13,
        "name": "Product 13",
        "price": "465.42",
        "weight": "2.66",
        "status": true,
        "image": "uploads/products/product-13.jpg",
        "images": [
          "uploads/products/product-13-1.jpg",
          "uploads/products/product-13-2.jpg",
          "uploads/products/product-13-3.jpg"
        ],
        "category": {
          "id": 2,
          "name": "Clothing"
        },
        "description": "This is product 13 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 14,
        "name": "Product 14",
        "price": "508.01",
        "weight": "4.27",
        "status": true,
        "image": "uploads/products/product-14.jpg",
        "images": [
          "uploads/products/product-14-1.jpg",
          "uploads/products/product-14-2.jpg",
          "uploads/products/product-14-3.jpg"
        ],
        "category": {
          "id": 1,
          "name": "Electronics"
        },
        "description": "This is product 14 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 15,
        "name": "Product 15",
        "price": "405.58",
        "weight": "7.51",
        "status": true,
        "image": "uploads/products/product-15.jpg",
        "images": [
          "uploads/products/product-15-1.jpg",
          "uploads/products/product-15-2.jpg",
          "uploads/products/product-15-3.jpg"
        ],
        "category": {
          "id": 4,
          "name": "Home"
        },
        "description": "This is product 15 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 16,
        "name": "Product 16",
        "price": "144.72",
        "weight": "0.85",
        "status": true,
        "image": "uploads/products/product-16.jpg",
        "images": [
          "uploads/products/product-16-1.jpg",
          "uploads/products/product-16-2.jpg",
          "uploads/products/product-16-3.jpg"
        ],
        "category": {
          "id": 3,
          "name": "Food"
        },
        "description": "This is product 16 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 17,
        "name": "Product 17",
        "price": "792.30",
        "weight": "2.99",
        "status": true,
        "image": "uploads/products/product-17.jpg",
        "images": [
          "uploads/products/product-17-1.jpg",
          "uploads/products/product-17-2.jpg",
          "uploads/products/product-17-3.jpg"
        ],
        "category": {
          "id": 3,
          "name": "Food"
        },
        "description": "This is product 17 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      },
      {
        "id": 18,
        "name": "Product 18",
        "price": "22.86",
        "weight": "4.20",
        "status": true,
        "image": "uploads/products/product-18.jpg",
        "images": [
          "uploads/products/product-18-1.jpg",
          "uploads/products/product-18-2.jpg",
          "uploads/products/product-18-3.jpg"
        ],
        "category": {
          "id": 4,
          "name": "Home"
        },
        "description": "This is product 18 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» products|[string]|true|none||none|

## POST 添加商品

POST /products

> Body 请求参数

```
price: 99.99
weight: 1.5
status: true
categoryId: 1
translations:
  zh:
    name: 无线鼠标
    description: 高性能无线鼠标...
    specifications:
      color: 黑色
      interface: USB
  en:
    name: Wireless Mouse
    description: Ergonomic wireless mouse...
    specifications: {}
  ja:
    name: ワイヤレスマウス
    description: 人間工学に基づいた...
    specifications: {}
initialInventory:
  - warehouseId: 1
    quantity: 100
    safetyStock: 20
  - warehouseId: 2
    quantity: 50
    safetyStock: 10

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品创建成功",
  "data": {
    "id": 21,
    "price": "99.99",
    "weight": "1.50",
    "status": true,
    "categoryId": 1,
    "image": null,
    "images": null,
    "createTime": "2025-03-04T09:12:15.000Z",
    "updateTime": "2025-03-04T09:12:15.000Z",
    "ProductTranslations": [
      {
        "id": 62,
        "name": "无线鼠标",
        "description": "高性能无线鼠标...",
        "specifications": {
          "color": "黑色",
          "interface": "USB"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:12:15.000Z",
        "updateTime": "2025-03-04T09:12:15.000Z",
        "productId": 21,
        "languageId": 1,
        "Language": {
          "id": 1,
          "code": "zh",
          "name": "中文",
          "isDefault": true,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      },
      {
        "id": 63,
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse...",
        "specifications": {},
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:12:16.000Z",
        "updateTime": "2025-03-04T09:12:16.000Z",
        "productId": 21,
        "languageId": 2,
        "Language": {
          "id": 2,
          "code": "en",
          "name": "English",
          "isDefault": false,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      },
      {
        "id": 64,
        "name": "ワイヤレスマウス",
        "description": "人間工学に基づいた...",
        "specifications": {},
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:12:16.000Z",
        "updateTime": "2025-03-04T09:12:16.000Z",
        "productId": 21,
        "languageId": 3,
        "Language": {
          "id": 3,
          "code": "ja",
          "name": "日本語",
          "isDefault": false,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      }
    ],
    "Category": {
      "id": 1,
      "image": "uploads/categories/electronics.jpg",
      "sort": 0,
      "status": true,
      "createTime": "2025-03-04T09:04:01.000Z",
      "updateTime": "2025-03-04T09:04:01.000Z",
      "CategoryTranslations": [
        {
          "id": 1,
          "categoryId": 1,
          "languageId": 1,
          "name": "电子产品",
          "description": "电子产品分类的详细描述",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 1,
            "code": "zh",
            "name": "中文",
            "isDefault": true,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        },
        {
          "id": 2,
          "categoryId": 1,
          "languageId": 2,
          "name": "Electronics",
          "description": "Description for 电子产品",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 2,
            "code": "en",
            "name": "English",
            "isDefault": false,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        },
        {
          "id": 3,
          "categoryId": 1,
          "languageId": 3,
          "name": "電子製品",
          "description": "电子产品の説明",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 3,
            "code": "ja",
            "name": "日本語",
            "isDefault": false,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        }
      ]
    },
    "Inventories": [
      {
        "id": 61,
        "productId": 21,
        "warehouseId": 1,
        "quantity": 100,
        "safetyStock": 20,
        "reservedQuantity": 0,
        "createTime": "2025-03-04T09:12:16.000Z",
        "updateTime": "2025-03-04T09:12:16.000Z",
        "Warehouse": {
          "id": 1,
          "code": "CN001",
          "name": "上海仓",
          "location": "上海市浦东新区XX路XX号",
          "country": "CN",
          "contact": "张三",
          "phone": "13800138001",
          "isActive": true,
          "createTime": "2025-03-04T09:04:02.000Z",
          "updateTime": "2025-03-04T09:04:02.000Z"
        }
      },
      {
        "id": 62,
        "productId": 21,
        "warehouseId": 2,
        "quantity": 50,
        "safetyStock": 10,
        "reservedQuantity": 0,
        "createTime": "2025-03-04T09:12:16.000Z",
        "updateTime": "2025-03-04T09:12:16.000Z",
        "Warehouse": {
          "id": 2,
          "code": "US001",
          "name": "LA Warehouse",
          "location": "XXX Street, Los Angeles, CA",
          "country": "US",
          "contact": "John",
          "phone": "+1-123-456-7890",
          "isActive": true,
          "createTime": "2025-03-04T09:04:02.000Z",
          "updateTime": "2025-03-04T09:04:02.000Z"
        }
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» price|number|true|none||none|
|»» weight|number|true|none||none|
|»» status|boolean|true|none||none|
|»» description|string|true|none||none|
|»» createTime|string|true|none||none|

## PUT 修改商品

PUT /products/1

> Body 请求参数

```
price: 199.99
weight: 2.5
status: true
categoryId: 1
translations:
  zh:
    name: 更新的商品名
    description: 更新的商品描述
  en:
    name: Updated Product Name
    description: Updated product description

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品更新成功",
  "data": {
    "id": 1,
    "price": "199.99",
    "weight": "2.50",
    "status": true,
    "categoryId": 1,
    "image": "uploads/products/product-1.jpg",
    "images": [
      "uploads/products/product-1-1.jpg",
      "uploads/products/product-1-2.jpg",
      "uploads/products/product-1-3.jpg"
    ],
    "createTime": "2025-03-04T09:04:01.000Z",
    "updateTime": "2025-03-04T09:12:30.000Z",
    "ProductTranslations": [
      {
        "id": 1,
        "name": "更新的商品名",
        "description": "更新的商品描述",
        "specifications": {
          "size": "M",
          "color": "红色",
          "material": "棉"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:12:30.000Z",
        "productId": 1,
        "languageId": 1,
        "Language": {
          "id": 1,
          "code": "zh",
          "name": "中文",
          "isDefault": true,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      },
      {
        "id": 2,
        "name": "Updated Product Name",
        "description": "Updated product description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:12:30.000Z",
        "productId": 1,
        "languageId": 2,
        "Language": {
          "id": 2,
          "code": "en",
          "name": "English",
          "isDefault": false,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      },
      {
        "id": 3,
        "name": "商品1",
        "description": "商品1の説明",
        "specifications": {
          "size": "M",
          "color": "赤",
          "material": "綿"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null,
        "createTime": "2025-03-04T09:04:01.000Z",
        "updateTime": "2025-03-04T09:04:01.000Z",
        "productId": 1,
        "languageId": 3,
        "Language": {
          "id": 3,
          "code": "ja",
          "name": "日本語",
          "isDefault": false,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      }
    ],
    "Category": {
      "id": 1,
      "image": "uploads/categories/electronics.jpg",
      "sort": 0,
      "status": true,
      "createTime": "2025-03-04T09:04:01.000Z",
      "updateTime": "2025-03-04T09:04:01.000Z",
      "CategoryTranslations": [
        {
          "id": 1,
          "categoryId": 1,
          "languageId": 1,
          "name": "电子产品",
          "description": "电子产品分类的详细描述",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 1,
            "code": "zh",
            "name": "中文",
            "isDefault": true,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        },
        {
          "id": 2,
          "categoryId": 1,
          "languageId": 2,
          "name": "Electronics",
          "description": "Description for 电子产品",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 2,
            "code": "en",
            "name": "English",
            "isDefault": false,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        },
        {
          "id": 3,
          "categoryId": 1,
          "languageId": 3,
          "name": "電子製品",
          "description": "电子产品の説明",
          "seoTitle": null,
          "seoDescription": null,
          "seoKeywords": null,
          "createTime": "2025-03-04T09:04:01.000Z",
          "updateTime": "2025-03-04T09:04:01.000Z",
          "Language": {
            "id": 3,
            "code": "ja",
            "name": "日本語",
            "isDefault": false,
            "createTime": "2025-03-04T09:04:00.000Z",
            "updateTime": "2025-03-04T09:04:00.000Z"
          }
        }
      ]
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» price|number|true|none||none|
|»» weight|number|true|none||none|
|»» status|boolean|true|none||none|
|»» description|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## DELETE 删除商品

DELETE /products/1

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## PATCH 更新商品状态

PATCH /products/1/status

> Body 请求参数

```
status: false

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品状态更新成功",
  "data": {
    "id": 1,
    "status": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» status|boolean|true|none||none|

## POST 商品主图

POST /products/6/image

> Body 请求参数

```yaml
image: file://C:\Users\dk\Pictures\01c8be56d7e78c6ac7252ce67e333c.jpg@900w_1l_2o_100sh.jpg

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|object| 否 |none|
|» image|body|string(binary)| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品主图上传成功",
  "data": {
    "image": "uploads/products/1741079666157-461026702.jpg"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» image|string|true|none||none|

## GET 查询商品信息

GET /products/3

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取商品详情成功",
  "data": {
    "id": 3,
    "price": "444.99",
    "weight": "7.91",
    "status": true,
    "image": "uploads/products/product-3.jpg",
    "images": [
      "uploads/products/product-3-1.jpg",
      "uploads/products/product-3-2.jpg",
      "uploads/products/product-3-3.jpg"
    ],
    "category": {
      "id": 2,
      "translations": {
        "zh": {
          "name": "服装",
          "description": "服装分类的详细描述"
        },
        "en": {
          "name": "Clothing",
          "description": "Description for 服装"
        },
        "ja": {
          "name": "衣類",
          "description": "服装の説明"
        }
      }
    },
    "translations": {
      "zh": {
        "name": "商品3",
        "description": "这是商品3的详细描述",
        "specifications": {
          "size": "M",
          "color": "红色",
          "material": "棉"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null
      },
      "en": {
        "name": "Product 3",
        "description": "This is product 3 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null
      },
      "ja": {
        "name": "商品3",
        "description": "商品3の説明",
        "specifications": {
          "size": "M",
          "color": "赤",
          "material": "綿"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null
      }
    },
    "createTime": "2025-03-04T09:04:01.000Z",
    "updateTime": "2025-03-04T09:04:01.000Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» price|string|true|none||none|
|»» weight|string|true|none||none|
|»» status|boolean|true|none||none|
|»» category|object|true|none||none|
|»»» id|integer|true|none||none|
|»»» translations|object|true|none||none|
|»»»» zh|object|true|none||none|
|»»»»» name|string|true|none||none|
|»»»»» description|string|true|none||none|
|»»»» en|object|true|none||none|
|»»»»» name|string|true|none||none|
|»»»»» description|string|true|none||none|
|»»»» ja|object|true|none||none|
|»»»»» name|string|true|none||none|
|»»»»» description|string|true|none||none|
|»» translations|object|true|none||none|
|»»» zh|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» description|string|true|none||none|
|»»»» specifications|object|true|none||none|
|»»»»» size|string|true|none||none|
|»»»»» color|string|true|none||none|
|»»»»» material|string|true|none||none|
|»»»» seoTitle|null|true|none||none|
|»»»» seoDescription|null|true|none||none|
|»»»» seoKeywords|null|true|none||none|
|»»» en|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» description|string|true|none||none|
|»»»» specifications|object|true|none||none|
|»»»»» size|string|true|none||none|
|»»»»» color|string|true|none||none|
|»»»»» material|string|true|none||none|
|»»»» seoTitle|null|true|none||none|
|»»»» seoDescription|null|true|none||none|
|»»»» seoKeywords|null|true|none||none|
|»»» ja|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» description|string|true|none||none|
|»»»» specifications|object|true|none||none|
|»»»»» size|string|true|none||none|
|»»»»» color|string|true|none||none|
|»»»»» material|string|true|none||none|
|»»»» seoTitle|null|true|none||none|
|»»»» seoDescription|null|true|none||none|
|»»»» seoKeywords|null|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST 商品图集

POST /products/6/images

> Body 请求参数

```yaml
images:
  - file://C:\Users\dk\Pictures\01c8be56d7e78c6ac7252ce67e333c.jpg@900w_1l_2o_100sh.jpg
  - file://C:\Users\dk\Pictures\auto_62Z58PICF9880mckYCPyZ_PIC2018.jpg

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|object| 否 |none|
|» images|body|string(binary)| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品图片上传成功",
  "data": {
    "images": [
      "uploads/products/product-6-1.jpg",
      "uploads/products/product-6-2.jpg",
      "uploads/products/product-6-3.jpg",
      "uploads/products/1741079687472-286803166.jpg",
      "uploads/products/1741079687472-449725074.jpg"
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» images|[string]|true|none||none|

# 商品/多语言

## GET 指定语言翻译

GET /products/1/translations

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|lang|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取商品信息成功",
  "data": {
    "id": 1,
    "price": "520.49",
    "weight": "1.93",
    "status": true,
    "image": "uploads/products/product-1.jpg",
    "images": [
      "uploads/products/product-1-1.jpg",
      "uploads/products/product-1-2.jpg",
      "uploads/products/product-1-3.jpg"
    ],
    "translations": {
      "en": {
        "name": "Product 1",
        "description": "This is product 1 description",
        "specifications": {
          "size": "M",
          "color": "Red",
          "material": "Cotton"
        },
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null
      }
    },
    "createTime": "2025-03-04T09:58:11.000Z",
    "updateTime": "2025-03-04T09:58:11.000Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» description|string|false|none||none|
|»» specifications|null|false|none||none|
|»» seoTitle|null|false|none||none|
|»» seoDescription|null|false|none||none|
|»» seoKeywords|null|false|none||none|
|»» createTime|string|false|none||none|
|»» updateTime|string|false|none||none|
|»» productId|integer|false|none||none|
|»» languageId|integer|false|none||none|
|»» Language|object|false|none||none|
|»»» code|string|true|none||none|
|»»» name|string|true|none||none|

## POST 添加新语言翻译

POST /products/1/translations

> Body 请求参数

```
lang: fr
name: Souris sans fil
description: Souris sans fil haute performance...
specifications:
  color: Noir
  interface: USB

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品翻译创建成功",
  "data": {
    "id": 61,
    "productId": "1",
    "languageId": 4,
    "name": "Souris sans fil",
    "description": "Souris sans fil haute performance...",
    "specifications": {
      "color": "Noir",
      "interface": "USB"
    },
    "updateTime": "2025-03-04T09:02:35.395Z",
    "createTime": "2025-03-04T09:02:35.395Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» productId|string|true|none||none|
|»» languageId|integer|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» specifications|object|true|none||none|
|»»» color|string|true|none||none|
|»»» interface|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» createTime|string|true|none||none|

## PUT 更新翻译

PUT /products/1/translations/fr

> Body 请求参数

```
name: Souris sans fil Pro
description: Souris sans fil professionnelle...
specifications:
  color: Noir
  interface: USB

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品翻译更新成功",
  "data": {
    "id": 61,
    "name": "Souris sans fil Pro",
    "description": "Souris sans fil professionnelle...",
    "specifications": {
      "color": "Noir",
      "interface": "USB"
    },
    "seoTitle": null,
    "seoDescription": null,
    "seoKeywords": null,
    "createTime": "2025-03-04T09:07:00.000Z",
    "updateTime": "2025-03-04T09:07:03.448Z",
    "productId": 1,
    "languageId": 5
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除翻译

DELETE /products/1/translations/fr

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "商品翻译删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

# 商品/分类

## GET 获取分类列表

GET /categories

> Body 请求参数

```
""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|lang|query|string| 否 |none|
|id|query|string| 否 |ID 编号|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取分类列表成功",
  "data": [
    {
      "id": 4,
      "name": "家居",
      "description": "家居分类的详细描述",
      "image": "uploads/categories/home.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 5
    },
    {
      "id": 2,
      "name": "服装",
      "description": "服装分类的详细描述",
      "image": "uploads/categories/clothing.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 7
    },
    {
      "id": 1,
      "name": "电子产品",
      "description": "电子产品分类的详细描述",
      "image": "uploads/categories/electronics.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 3
    },
    {
      "id": 3,
      "name": "食品",
      "description": "食品分类的详细描述",
      "image": "uploads/categories/food.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 5
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» productCount|integer|true|none||none|

## POST 创建分类

POST /categories

> Body 请求参数

```yaml
translations:
  zh:
    name: 玩具
    description: 电子产品分类的详细描述
    seoTitle: 电子产品分类
    seoDescription: 各类电子产品
    seoKeywords: 手机,电脑,数码
  en:
    name: toy
    description: Electronics category description
    seoTitle: Electronics Category
    seoDescription: All kinds of electronics
    seoKeywords: phone,computer,digital

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|object| 否 |none|
|» image|body|string(binary)| 否 |none|
|» translations|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "分类创建成功",
  "data": {
    "id": 9,
    "image": "/uploads/categories/category-1741079261704-130928837.jpeg",
    "sort": 0,
    "status": true,
    "createTime": "2025-03-04T09:07:41.000Z",
    "updateTime": "2025-03-04T09:07:41.000Z",
    "CategoryTranslations": [
      {
        "id": 13,
        "categoryId": 9,
        "languageId": 1,
        "name": "玩具",
        "description": "电子产品分类的详细描述",
        "seoTitle": "电子产品分类",
        "seoDescription": "各类电子产品",
        "seoKeywords": "手机,电脑,数码",
        "createTime": "2025-03-04T09:07:41.000Z",
        "updateTime": "2025-03-04T09:07:41.000Z",
        "Language": {
          "id": 1,
          "code": "zh",
          "name": "中文",
          "isDefault": true,
          "createTime": "2025-03-04T09:04:00.000Z",
          "updateTime": "2025-03-04T09:04:00.000Z"
        }
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» image|string|true|none||none|
|»» sort|integer|true|none||none|
|»» status|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» CategoryTranslations|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» categoryId|integer|false|none||none|
|»»» languageId|integer|false|none||none|
|»»» name|string|false|none||none|
|»»» description|string|false|none||none|
|»»» seoTitle|string|false|none||none|
|»»» seoDescription|string|false|none||none|
|»»» seoKeywords|string|false|none||none|
|»»» createTime|string|false|none||none|
|»»» updateTime|string|false|none||none|
|»»» Language|object|false|none||none|
|»»»» id|integer|true|none||none|
|»»»» code|string|true|none||none|
|»»»» name|string|true|none||none|
|»»»» isDefault|boolean|true|none||none|
|»»»» createTime|string|true|none||none|
|»»»» updateTime|string|true|none||none|

## PUT 更新分类

PUT /categories/2

> Body 请求参数

```yaml
translations:
  zh:
    name: 数码产品
    description: 数码产品分类
  en:
    name: Digital Products
    description: Digital products category

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|object| 否 |none|
|» image|body|string(binary)| 否 |none|
|» translations|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "分类更新成功",
  "data": {
    "id": 2,
    "image": "/uploads/categories/category-1741082833341-106515647.jpeg",
    "translations": {
      "zh": {
        "name": "电子产品",
        "description": "电子产品分类描述",
        "seoTitle": "电子产品分类",
        "seoDescription": "电子产品分类描述",
        "seoKeywords": "电子,数码"
      },
      "en": {
        "name": "Electronics",
        "description": "Electronics category",
        "seoTitle": "Electronics",
        "seoDescription": "Electronics category",
        "seoKeywords": "electronics,digital"
      },
      "ja": {
        "name": "衣類",
        "description": "服装の説明",
        "seoTitle": null,
        "seoDescription": null,
        "seoKeywords": null
      }
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## DELETE 删除分类

DELETE /categories/10

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "分类删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

# 订单

## GET 订单列表

GET /orders

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pagenum|query|string| 否 |none|
|pagesize|query|string| 否 |none|
|startDate|query|string| 否 |none|
|endDate|query|string| 否 |none|
|query|query|string| 否 |none|
|status|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取订单列表成功",
  "data": {
    "total": 10,
    "orders": [
      {
        "id": 1,
        "orderNo": "ORDER202403150001",
        "createTime": "2025-03-04T09:04:02.000Z",
        "totalAmount": "289.02",
        "status": "pending",
        "statusText": "待发货",
        "payMethod": "bank",
        "payMethodText": "银行卡",
        "receiver": "测试用户1",
        "phone": "13800138000",
        "address": "测试地址1",
        "products": [
          {
            "id": 15,
            "price": "405.58",
            "quantity": 4,
            "subtotal": 1622.32
          },
          {
            "id": 18,
            "price": "22.86",
            "quantity": 2,
            "subtotal": 45.72
          }
        ]
      },
      {
        "id": 2,
        "orderNo": "ORDER202403150002",
        "createTime": "2025-03-04T09:04:02.000Z",
        "totalAmount": "184.83",
        "status": "pending",
        "statusText": "待发货",
        "payMethod": "alipay",
        "payMethodText": "支付宝",
        "receiver": "测试用户2",
        "phone": "13800138001",
        "address": "测试地址2",
        "products": [
          {
            "id": 2,
            "price": "470.34",
            "quantity": 1,
            "subtotal": 470.34
          },
          {
            "id": 16,
            "price": "144.72",
            "quantity": 5,
            "subtotal": 723.6
          }
        ]
      },
      {
        "id": 3,
        "orderNo": "ORDER202403150003",
        "createTime": "2025-03-04T09:04:02.000Z",
        "totalAmount": "75.05",
        "status": "pending",
        "statusText": "待发货",
        "payMethod": "alipay",
        "payMethodText": "支付宝",
        "receiver": "测试用户3",
        "phone": "13800138002",
        "address": "测试地址3",
        "products": [
          {
            "id": 5,
            "price": "148.46",
            "quantity": 3,
            "subtotal": 445.38
          },
          {
            "id": 20,
            "price": "960.18",
            "quantity": 4,
            "subtotal": 3840.72
          }
        ]
      },
      {
        "id": 4,
        "orderNo": "ORDER202403150004",
        "createTime": "2025-03-04T09:04:02.000Z",
        "totalAmount": "194.13",
        "status": "pending",
        "statusText": "待发货",
        "payMethod": "alipay",
        "payMethodText": "支付宝",
        "receiver": "测试用户4",
        "phone": "13800138003",
        "address": "测试地址4",
        "products": [
          {
            "id": 8,
            "price": "372.04",
            "quantity": 4,
            "subtotal": 1488.16
          },
          {
            "id": 10,
            "price": "146.95",
            "quantity": 4,
            "subtotal": 587.8
          }
        ]
      },
      {
        "id": 5,
        "orderNo": "ORDER202403150005",
        "createTime": "2025-03-04T09:04:02.000Z",
        "totalAmount": "493.28",
        "status": "pending",
        "statusText": "待发货",
        "payMethod": "bank",
        "payMethodText": "银行卡",
        "receiver": "测试用户5",
        "phone": "13800138004",
        "address": "测试地址5",
        "products": [
          {
            "id": 2,
            "price": "470.34",
            "quantity": 3,
            "subtotal": 1411.02
          },
          {
            "id": 5,
            "price": "148.46",
            "quantity": 1,
            "subtotal": 148.46
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» orders|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» orderNo|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» totalAmount|string|true|none||none|
|»»» status|string|true|none||none|
|»»» statusText|string|true|none||none|
|»»» payMethod|string|true|none||none|
|»»» payMethodText|string|true|none||none|
|»»» receiver|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» address|string|true|none||none|
|»»» products|[object]|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» price|string|true|none||none|
|»»»» quantity|integer|true|none||none|
|»»»» subtotal|number|true|none||none|

## PUT 更新订单状态

PUT /orders/1/status

> Body 请求参数

```
status: processing

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |none|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "订单状态更新成功",
  "data": {
    "id": 1,
    "orderNo": "ORDER202403150001",
    "status": "processing"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderNo|string|true|none||none|
|»» status|string|true|none||none|

## GET 订单详情

GET /orders/1

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取订单详情成功",
  "data": {
    "id": 1,
    "orderNo": "ORDER202403150001",
    "createTime": "2025-03-04T09:04:02.000Z",
    "updateTime": "2025-03-04T09:19:54.000Z",
    "totalAmount": "289.02",
    "status": "processing",
    "payMethod": "bank",
    "receiver": "测试用户1",
    "phone": "13800138000",
    "address": "测试地址1",
    "products": [
      {
        "id": 15,
        "price": "405.58",
        "quantity": 4,
        "subtotal": 1622.32
      },
      {
        "id": 18,
        "price": "22.86",
        "quantity": 2,
        "subtotal": 45.72
      }
    ],
    "statusText": "已发货",
    "payMethodText": "银行卡"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderNo|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» totalAmount|string|true|none||none|
|»» status|string|true|none||none|
|»» payMethod|string|true|none||none|
|»» receiver|string|true|none||none|
|»» phone|string|true|none||none|
|»» address|string|true|none||none|
|»» products|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» price|string|true|none||none|
|»»» quantity|integer|true|none||none|
|»»» subtotal|number|true|none||none|
|»» statusText|string|true|none||none|
|»» payMethodText|string|true|none||none|

# 订单/海关

## GET 获取清关状态

GET /orders/1/customs

> Body 请求参数

```
string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取清关状态成功",
  "data": {
    "id": 1,
    "orderId": 1,
    "status": "pending",
    "declarationNo": null,
    "customsOffice": null,
    "inspectionNotes": null,
    "operatorId": 1,
    "createTime": "2025-03-04T09:04:05.000Z",
    "updateTime": "2025-03-04T09:04:05.000Z",
    "Order": {
      "orderNo": "ORDER202403150001"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderId|integer|true|none||none|
|»» status|string|true|none||none|
|»» declarationNo|null|true|none||none|
|»» customsOffice|null|true|none||none|
|»» inspectionNotes|null|true|none||none|
|»» operatorId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» Order|object|true|none||none|
|»»» orderNo|string|true|none||none|

## PUT 更新清关状态

PUT /orders/1/customs/status

> Body 请求参数

```
status: submitted
declarationNo: CD20240319001
customsOffice: 上海海关

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "更新清关状态成功",
  "data": {
    "id": 1,
    "orderId": 1,
    "status": "submitted",
    "declarationNo": "CD20240319001",
    "customsOffice": "上海海关",
    "inspectionNotes": null,
    "operatorId": 1,
    "createTime": "2025-03-04T09:58:15.000Z",
    "updateTime": "2025-03-04T10:14:25.881Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderId|integer|true|none||none|
|»» status|string|true|none||none|
|»» declarationNo|string|true|none||none|
|»» customsOffice|string|true|none||none|
|»» inspectionNotes|null|true|none||none|
|»» operatorId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## GET 清关文件列表

GET /orders/1/customs/documents

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取清关文件成功",
  "data": [
    {
      "id": 1,
      "clearanceId": 1,
      "type": "invoice",
      "name": "商业发票.pdf",
      "path": "uploads/customs/test-invoice.pdf",
      "uploaderId": 1,
      "createTime": "2025-03-04T09:04:06.000Z",
      "updateTime": "2025-03-04T09:04:06.000Z"
    },
    {
      "id": 2,
      "clearanceId": 1,
      "type": "packing_list",
      "name": "装箱单.pdf",
      "path": "uploads/customs/test-packing-list.pdf",
      "uploaderId": 1,
      "createTime": "2025-03-04T09:04:06.000Z",
      "updateTime": "2025-03-04T09:04:06.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» clearanceId|integer|true|none||none|
|»» type|string|true|none||none|
|»» name|string|true|none||none|
|»» path|string|true|none||none|
|»» uploaderId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST 上传清关文件

POST /orders/1/customs/documents

> Body 请求参数

```yaml
file: file://C:\Users\dk\Documents\Adobe\PhotoshopPrefsManager-20210527-131114.log
type: invoice
name: 商业发票

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|body|body|object| 否 |none|
|» file|body|string(binary)| 否 |none|
|» type|body|string| 否 |none|
|» name|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "上传清关文件成功",
  "data": {
    "id": 11,
    "clearanceId": 1,
    "type": "invoice",
    "name": "商业发票",
    "path": "uploads/customs/1741079813808-fvj2ib544.log",
    "uploaderId": 1,
    "updateTime": "2025-03-04T09:16:53.810Z",
    "createTime": "2025-03-04T09:16:53.810Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» clearanceId|integer|true|none||none|
|»» type|string|true|none||none|
|»» name|string|true|none||none|
|»» path|string|true|none||none|
|»» uploaderId|integer|true|none||none|
|»» updateTime|string|true|none||none|
|»» createTime|string|true|none||none|

# 订单/物流

## GET 获取物流信息

GET /orders/1/tracking

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取物流信息成功",
  "data": {
    "id": 1,
    "orderId": 1,
    "trackingNo": "TN1741079046480169",
    "carrier": "UPS",
    "status": "in_transit",
    "estimatedDelivery": "2025-03-11T09:04:06.000Z",
    "originCountry": "CN",
    "destinationCountry": "GB",
    "operatorId": 1,
    "createTime": "2025-03-04T09:04:06.000Z",
    "updateTime": "2025-03-04T09:04:06.000Z",
    "Order": {
      "orderNo": "ORDER202403150001"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderId|integer|true|none||none|
|»» trackingNo|string|true|none||none|
|»» carrier|string|true|none||none|
|»» status|string|true|none||none|
|»» estimatedDelivery|string|true|none||none|
|»» originCountry|string|true|none||none|
|»» destinationCountry|string|true|none||none|
|»» operatorId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» Order|object|true|none||none|
|»»» orderNo|string|true|none||none|

## POST 创建物流信息

POST /orders/1/tracking

> Body 请求参数

```
trackingNo: DHL1234567890
carrier: DHL
estimatedDelivery: 2024-03-26T10:00:00Z
originCountry: CN
destinationCountry: US

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|array[string]| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "创建物流追踪成功",
  "data": {
    "id": 6,
    "orderId": "1",
    "trackingNo": "DHL1234567890",
    "carrier": "DHL",
    "status": "pending",
    "estimatedDelivery": "2024-03-26T10:00:00.000Z",
    "originCountry": "CN",
    "destinationCountry": "US",
    "operatorId": 1,
    "updateTime": "2025-03-04T09:17:19.668Z",
    "createTime": "2025-03-04T09:17:19.668Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|Inline|

### 返回数据结构

状态码 **500**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## PUT 更新物流状态

PUT /orders/1/tracking/TN1741079046480169

> Body 请求参数

```
status: in_transit
location: Los Angeles International Airport
details: Package arrived at destination airport

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "更新物流状态成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» orderId|integer|true|none||none|
|»» trackingNo|string|true|none||none|
|»» carrier|string|true|none||none|
|»» status|string|true|none||none|
|»» estimatedDelivery|string|true|none||none|
|»» originCountry|string|true|none||none|
|»» destinationCountry|string|true|none||none|
|»» operatorId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## GET 获取物流历史

GET /orders/1/tracking/history

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取物流历史记录成功",
  "data": [
    {
      "id": 11,
      "trackingId": 1,
      "location": "Los Angeles International Airport",
      "status": "in_transit",
      "details": "Package arrived at destination airport",
      "eventTime": "2025-03-04T09:17:49.000Z",
      "operatorId": 1,
      "createTime": "2025-03-04T09:17:49.000Z",
      "updateTime": "2025-03-04T09:17:49.000Z"
    },
    {
      "id": 2,
      "trackingId": 1,
      "location": "上海浦东国际机场",
      "status": "in_transit",
      "details": "包裹已发出",
      "eventTime": "2025-03-04T09:04:06.000Z",
      "operatorId": 1,
      "createTime": "2025-03-04T09:04:06.000Z",
      "updateTime": "2025-03-04T09:04:06.000Z"
    },
    {
      "id": 1,
      "trackingId": 1,
      "location": "上海",
      "status": "pending",
      "details": "物流信息已创建",
      "eventTime": "2025-03-03T09:04:06.000Z",
      "operatorId": 1,
      "createTime": "2025-03-04T09:04:06.000Z",
      "updateTime": "2025-03-04T09:04:06.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» trackingId|integer|true|none||none|
|»» location|string|true|none||none|
|»» status|string|true|none||none|
|»» details|string|true|none||none|
|»» eventTime|string|true|none||none|
|»» operatorId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

# 数据统计

## GET 获取概览数据

GET /statistics/overview

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取概览数据成功",
  "data": {
    "totalSales": 1236.31,
    "totalOrders": 5,
    "totalProducts": 20,
    "totalUsers": 11,
    "trends": {
      "sales": 100,
      "orders": 100,
      "products": 100,
      "users": 100
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» totalSales|number|true|none||none|
|»» totalOrders|integer|true|none||none|
|»» totalProducts|integer|true|none||none|
|»» totalUsers|integer|true|none||none|
|»» trends|object|true|none||none|
|»»» sales|integer|true|none||none|
|»»» orders|integer|true|none||none|
|»»» products|integer|true|none||none|
|»»» users|integer|true|none||none|

## GET 获取销售数据

GET /statistics/sales

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|range|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取销售趋势成功",
  "data": {
    "xAxis": [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    "series": [
      0,
      0,
      1236.31,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» xAxis|[string]|true|none||none|
|»» series|[oneOf]|true|none||none|

*oneOf*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|»»» *anonymous*|integer|false|none||none|

*xor*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|»»» *anonymous*|number|false|none||none|

## GET 商品分类统计

GET /statistics/categories

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取商品分类统计成功",
  "data": [
    {
      "id": 2,
      "name": "服装",
      "value": 7
    },
    {
      "id": 4,
      "name": "家居",
      "value": 5
    },
    {
      "id": 1,
      "name": "电子产品",
      "value": 4
    },
    {
      "id": 3,
      "name": "食品",
      "value": 4
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» name|string|true|none||none|
|»» value|integer|true|none||none|

## GET 支付方式统计

GET /statistics/payments

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取支付方式统计成功",
  "data": [
    {
      "name": "支付宝",
      "value": 3
    },
    {
      "name": "银行卡",
      "value": 2
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» name|string|true|none||none|
|»» value|integer|true|none||none|

# 数据统计/物流数据

## GET 获取物流成本统计

GET /statistics/logistics/cost

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取物流成本统计成功",
  "data": [
    {
      "country": "GB",
      "carrier": "UPS",
      "shipmentCount": 1,
      "avgCost": 289.02
    },
    {
      "country": "JP",
      "carrier": "FedEx",
      "shipmentCount": 2,
      "avgCost": 343.7
    },
    {
      "country": "JP",
      "carrier": "UPS",
      "shipmentCount": 1,
      "avgCost": 184.83
    },
    {
      "country": "US",
      "carrier": "DHL",
      "shipmentCount": 2,
      "avgCost": 182.03
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» country|string|true|none||none|
|»» carrier|string|true|none||none|
|»» shipmentCount|integer|true|none||none|
|»» avgCost|number|true|none||none|

## GET 获取物流时效统计

GET /statistics/logistics/time

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取物流时效统计成功",
  "data": []
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[string]|true|none||none|

## GET 获取承运商绩效统计

GET /statistics/logistics/carrier-performance

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取承运商绩效统计成功",
  "data": [
    {
      "carrier": "DHL",
      "totalShipments": 2,
      "deliveredCount": 0,
      "exceptionCount": 0,
      "returnedCount": 0,
      "deliveryRate": 0,
      "exceptionRate": 0,
      "returnRate": 0
    },
    {
      "carrier": "FedEx",
      "totalShipments": 2,
      "deliveredCount": 0,
      "exceptionCount": 0,
      "returnedCount": 0,
      "deliveryRate": 0,
      "exceptionRate": 0,
      "returnRate": 0
    },
    {
      "carrier": "UPS",
      "totalShipments": 2,
      "deliveredCount": 0,
      "exceptionCount": 0,
      "returnedCount": 0,
      "deliveryRate": 0,
      "exceptionRate": 0,
      "returnRate": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» carrier|string|true|none||none|
|»» totalShipments|integer|true|none||none|
|»» deliveredCount|integer|true|none||none|
|»» exceptionCount|integer|true|none||none|
|»» returnedCount|integer|true|none||none|
|»» deliveryRate|integer|true|none||none|
|»» exceptionRate|integer|true|none||none|
|»» returnRate|integer|true|none||none|

# 数据统计/国际销售数据

## GET 获取国际销售数据

GET /statistics/sales/international

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string| 否 |none|
|endDate|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取国际销售数据成功",
  "data": {
    "domestic": {
      "amount": 0,
      "count": 0
    },
    "international": {
      "amount": 1525.33,
      "count": 6,
      "yearOverYearGrowth": "0.00"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» domestic|object|true|none||none|
|»»» amount|integer|true|none||none|
|»»» count|integer|true|none||none|
|»» international|object|true|none||none|
|»»» amount|integer|true|none||none|
|»»» count|integer|true|none||none|
|»»» yearOverYearGrowth|string|true|none||none|

## GET 获取各国销售数据

GET /statistics/sales/by-country

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string| 否 |none|
|endDate|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取各国销售数据成功",
  "data": [
    {
      "country": "JP",
      "countryName": "日本",
      "orderCount": 3,
      "totalAmount": 872.24,
      "percentage": 50
    },
    {
      "country": "US",
      "countryName": "美国",
      "orderCount": 2,
      "totalAmount": 364.07,
      "percentage": 33.33
    },
    {
      "country": "GB",
      "countryName": "英国",
      "orderCount": 1,
      "totalAmount": 289.02,
      "percentage": 16.67
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» country|string|true|none||none|
|»» countryName|string|true|none||none|
|»» orderCount|integer|true|none||none|
|»» totalAmount|number|true|none||none|
|»» percentage|integer|true|none||none|

## GET 获取各币种销售数据

GET /statistics/sales/by-currency

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取各币种销售数据成功",
  "data": [
    {
      "currency": "EUR",
      "orderCount": 2,
      "totalAmount": 568.33,
      "totalAmountCNY": 4234.06
    },
    {
      "currency": "USD",
      "orderCount": 2,
      "totalAmount": 473.85,
      "totalAmountCNY": 3018.42
    },
    {
      "currency": "JPY",
      "orderCount": 1,
      "totalAmount": 194.13,
      "totalAmountCNY": 11.45
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» currency|string|true|none||none|
|»» orderCount|integer|true|none||none|
|»» totalAmount|number|true|none||none|
|»» totalAmountCNY|number|true|none||none|

# 语言

## GET 语言列表

GET /i18n/languages

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取语言列表成功",
  "data": [
    {
      "id": 1,
      "code": "zh",
      "name": "中文",
      "isDefault": true,
      "createTime": "2025-03-03T12:52:18.000Z",
      "updateTime": "2025-03-03T12:52:18.000Z"
    },
    {
      "id": 2,
      "code": "en",
      "name": "English",
      "isDefault": false,
      "createTime": "2025-03-03T12:52:18.000Z",
      "updateTime": "2025-03-03T12:52:18.000Z"
    },
    {
      "id": 3,
      "code": "ja",
      "name": "日本語",
      "isDefault": false,
      "createTime": "2025-03-03T12:52:18.000Z",
      "updateTime": "2025-03-03T12:52:18.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» isDefault|boolean|true|none||none|
|»» isActive|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST 添加语言

POST /i18n/languages

> Body 请求参数

```
code: fr
name: Français
isDefault: false

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "语言创建成功",
  "data": {
    "id": 4,
    "code": "fr",
    "name": "Français",
    "isDefault": false,
    "updateTime": "2025-03-04T09:02:00.045Z",
    "createTime": "2025-03-04T09:02:00.045Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» isActive|boolean|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» isDefault|boolean|true|none||none|
|»» updateTime|string|true|none||none|
|»» createTime|string|true|none||none|

## PUT 更新语言

PUT /i18n/languages/1

> Body 请求参数

```
name: 中文
isDefault: true

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "语言更新成功",
  "data": {
    "id": 1,
    "code": "zh",
    "name": "中文",
    "isDefault": true,
    "createTime": "2025-03-03T12:52:18.000Z",
    "updateTime": "2025-03-03T12:52:18.000Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» isDefault|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## DELETE 删除语言

DELETE /i18n/languages/4

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "语言删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

# 汇率

## GET 汇率列表

GET /exchange/rates

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取汇率列表成功",
  "data": [
    {
      "id": 4,
      "fromCurrency": "CNY",
      "toCurrency": "EUR",
      "rate": "0.134228",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 6,
      "fromCurrency": "CNY",
      "toCurrency": "JPY",
      "rate": "16.949153",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 2,
      "fromCurrency": "CNY",
      "toCurrency": "USD",
      "rate": "0.156986",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 3,
      "fromCurrency": "EUR",
      "toCurrency": "CNY",
      "rate": "7.450000",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 5,
      "fromCurrency": "JPY",
      "toCurrency": "CNY",
      "rate": "0.059000",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 1,
      "fromCurrency": "USD",
      "toCurrency": "CNY",
      "rate": "6.370000",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» fromCurrency|string|true|none||none|
|»» toCurrency|string|true|none||none|
|»» rate|string|true|none||none|
|»» isActive|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST 添加汇率

POST /exchange/rates

> Body 请求参数

```
fromCurrency: GBP
toCurrency: CNY
rate: 8.75

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "汇率创建成功",
  "data": {
    "isActive": true,
    "id": 7,
    "fromCurrency": "GBP",
    "toCurrency": "CNY",
    "rate": 8.75,
    "updateTime": "2025-03-04T09:24:47.505Z",
    "createTime": "2025-03-04T09:24:47.505Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 更新汇率

PUT /exchange/rates/1

> Body 请求参数

```
rate: 6.33

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "汇率更新成功",
  "data": {
    "id": 1,
    "fromCurrency": "USD",
    "toCurrency": "CNY",
    "rate": "6.330000",
    "isActive": true,
    "createTime": "2025-03-04T09:04:02.000Z",
    "updateTime": "2025-03-04T09:24:58.000Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» fromCurrency|string|true|none||none|
|»» toCurrency|string|true|none||none|
|»» rate|string|true|none||none|
|»» isActive|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## GET 汇率转换

GET /exchange/convert

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|from|query|string| 否 |none|
|to|query|string| 否 |none|
|amount|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "汇率转换成功",
  "data": {
    "from": "CNY",
    "to": "USD",
    "amount": 100,
    "rate": "0.156986",
    "convertedAmount": 15.7
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» from|string|true|none||none|
|»» to|string|true|none||none|
|»» amount|integer|true|none||none|
|»» rate|string|true|none||none|
|»» convertedAmount|integer|true|none||none|

# 仓库

## GET 仓库列表

GET /warehouses

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取仓库列表成功",
  "data": [
    {
      "id": 1,
      "code": "CN001",
      "name": "上海仓",
      "location": "上海市浦东新区XX路XX号",
      "country": "CN",
      "contact": "张三",
      "phone": "13800138001",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 3,
      "code": "JP001",
      "name": "東京倉庫",
      "location": "東京都港区XX",
      "country": "JP",
      "contact": "田中",
      "phone": "+81-3-1234-5678",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    },
    {
      "id": 2,
      "code": "US001",
      "name": "LA Warehouse",
      "location": "XXX Street, Los Angeles, CA",
      "country": "US",
      "contact": "John",
      "phone": "+1-123-456-7890",
      "isActive": true,
      "createTime": "2025-03-04T09:04:02.000Z",
      "updateTime": "2025-03-04T09:04:02.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» location|string|true|none||none|
|»» country|string|true|none||none|
|»» contact|string|true|none||none|
|»» phone|string|true|none||none|
|»» isActive|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## POST 创建仓库

POST /warehouses

> Body 请求参数

```
code: UK001
name: London Warehouse
location: XXX Street, London
country: GB
contact: William
phone: +44-20-1234-5678

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "仓库创建成功",
  "data": {
    "isActive": true,
    "id": 4,
    "code": "UK001",
    "name": "London Warehouse",
    "location": "XXX Street, London",
    "country": "GB",
    "contact": "William",
    "phone": "+44-20-1234-5678",
    "updateTime": "2025-03-04T09:25:44.982Z",
    "createTime": "2025-03-04T09:25:44.982Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» isActive|boolean|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» location|string|true|none||none|
|»» country|string|true|none||none|
|»» contact|string|true|none||none|
|»» phone|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» createTime|string|true|none||none|

## PUT 更新仓库

PUT /warehouses/1

> Body 请求参数

```
name: Shanghai Main Warehouse
location: 上海市浦东新区XX路XX号
country: CN
contact: 李四
phone: "13900139000"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "仓库更新成功",
  "data": {
    "id": 1,
    "code": "CN001",
    "name": "Shanghai Main Warehouse",
    "location": "上海市浦东新区XX路XX号",
    "country": "CN",
    "contact": "李四",
    "phone": "13900139000",
    "isActive": true,
    "createTime": "2025-03-04T09:04:02.000Z",
    "updateTime": "2025-03-04T09:25:56.988Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» code|string|true|none||none|
|»» name|string|true|none||none|
|»» location|string|true|none||none|
|»» country|string|true|none||none|
|»» contact|string|true|none||none|
|»» phone|string|true|none||none|
|»» isActive|boolean|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|

## GET 商品库存

GET /products/3/inventory

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取商品库存成功",
  "data": [
    {
      "id": 7,
      "productId": 3,
      "warehouseId": 1,
      "quantity": 89,
      "safetyStock": 10,
      "reservedQuantity": 0,
      "createTime": "2025-03-04T09:04:03.000Z",
      "updateTime": "2025-03-04T09:04:03.000Z",
      "Warehouse": {
        "code": "CN001",
        "name": "Shanghai Main Warehouse",
        "location": "上海市浦东新区XX路XX号",
        "country": "CN"
      }
    },
    {
      "id": 9,
      "productId": 3,
      "warehouseId": 3,
      "quantity": 12,
      "safetyStock": 10,
      "reservedQuantity": 0,
      "createTime": "2025-03-04T09:04:03.000Z",
      "updateTime": "2025-03-04T09:04:03.000Z",
      "Warehouse": {
        "code": "JP001",
        "name": "東京倉庫",
        "location": "東京都港区XX",
        "country": "JP"
      }
    },
    {
      "id": 8,
      "productId": 3,
      "warehouseId": 2,
      "quantity": 18,
      "safetyStock": 10,
      "reservedQuantity": 0,
      "createTime": "2025-03-04T09:04:03.000Z",
      "updateTime": "2025-03-04T09:04:03.000Z",
      "Warehouse": {
        "code": "US001",
        "name": "LA Warehouse",
        "location": "XXX Street, Los Angeles, CA",
        "country": "US"
      }
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» productId|integer|true|none||none|
|»» warehouseId|integer|true|none||none|
|»» quantity|integer|true|none||none|
|»» safetyStock|integer|true|none||none|
|»» reservedQuantity|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» updateTime|string|true|none||none|
|»» Warehouse|object|true|none||none|
|»»» code|string|true|none||none|
|»»» name|string|true|none||none|
|»»» location|string|true|none||none|
|»»» country|string|true|none||none|

## PUT 库存调拨

PUT /products/3/inventory/transfer

> Body 请求参数

```
fromWarehouseId: 2
toWarehouseId: 1
quantity: 10
reason: 调整库存分布

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "库存调拨成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## GET 调拨记录

GET /products/3/inventory/transactions

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string| 否 |none|
|endDate|query|string| 否 |none|
|type|query|string| 否 |none|
|page|query|string| 否 |none|
|pageSize|query|string| 否 |none|
|Authorization|header|string| 否 |none|

> 返回示例

```json
{
  "code": 200,
  "message": "获取库存变动记录成功",
  "data": {
    "total": 1,
    "page": 1,
    "pageSize": 10,
    "transactions": [
      {
        "id": 63,
        "productId": 3,
        "productName": "商品3",
        "fromWarehouse": {
          "id": 2,
          "code": "US001",
          "name": "LA Warehouse"
        },
        "toWarehouse": {
          "id": 1,
          "code": "CN001",
          "name": "Shanghai Main Warehouse"
        },
        "quantity": 10,
        "type": "transfer",
        "reason": "调整库存分布",
        "operatorId": 1,
        "createTime": "2025-03-04T09:26:34.000Z"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» page|integer|true|none||none|
|»» pageSize|integer|true|none||none|
|»» transactions|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» productId|integer|false|none||none|
|»»» productName|string|false|none||none|
|»»» fromWarehouse|object|false|none||none|
|»»»» id|integer|true|none||none|
|»»»» code|string|true|none||none|
|»»»» name|string|true|none||none|
|»»» toWarehouse|object|false|none||none|
|»»»» id|integer|true|none||none|
|»»»» code|string|true|none||none|
|»»»» name|string|true|none||none|
|»»» quantity|integer|false|none||none|
|»»» type|string|false|none||none|
|»»» reason|string|false|none||none|
|»»» operatorId|integer|false|none||none|
|»»» createTime|string|false|none||none|

# 数据模型

