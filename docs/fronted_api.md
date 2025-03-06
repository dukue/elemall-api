# ele_mall前台接口

## POST 前台用户注册

POST /mall/user/register

> Body 请求参数

```json
{
  "username": "cayden",
  "password": "400823823a",
  "email": "248211@qq.com",
  "mobile": "18887798993"
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "email": "string",
    "mobile": "string"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » message   | string  | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» id       | integer | true | none |        | none |
| »» username | string  | true | none |        | none |
| »» email    | string  | true | none |        | none |
| »» mobile   | string  | true | none |        | none |

## POST 前台登录

POST /mall/user/login

> Body 请求参数

```
username: cayden
password: 400823823a

```

### 请求参数

| 名称         | 位置   | 类型   | 必选 | 说明 |
| ------------ | ------ | ------ | ---- | ---- |
| Content-Type | header | string | 否   | none |
| body         | body   | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjYXlkZW4iLCJ0eXBlIjoibWFsbF91c2VyIiwiaWF0IjoxNzQxMDk4ODIxLCJleHAiOjE3NDExODUyMjF9.RYP0UGStuOmvZ-OSU8SNOtUPLu_yDJmxTajd7lW0ufc",
    "user": {
      "id": 4,
      "username": "cayden",
      "email": "24821@qq.com",
      "mobile": "18887798990",
      "avatar": null
    }
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称         | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------------ | ------- | ---- | ---- | ------ | ---- |
| » code       | integer | true | none |        | none |
| » message    | string  | true | none |        | none |
| » data       | object  | true | none |        | none |
| »» token     | string  | true | none |        | none |
| »» user      | object  | true | none |        | none |
| »»» id       | integer | true | none |        | none |
| »»» username | string  | true | none |        | none |
| »»» email    | string  | true | none |        | none |
| »»» mobile   | string  | true | none |        | none |
| »»» avatar   | null    | true | none |        | none |

## GET 前台用户信息

GET /mall/user/info

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "id": 4,
    "username": "cayden",
    "email": "24821@qq.com",
    "mobile": "18887798990",
    "avatar": null
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» id       | integer | true | none |        | none |
| »» username | string  | true | none |        | none |
| »» email    | string  | true | none |        | none |
| »» mobile   | string  | true | none |        | none |
| »» avatar   | null    | true | none |        | none |

## PUT 更新用户信息

PUT /mall/user/info

> Body 请求参数

```json
{
  "email": "27788@163.com",
  "mobile": "18899076576",
  "avatar": "string"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 4,
    "username": "cayden",
    "email": "27788@163.com",
    "mobile": "18899076576",
    "avatar": "string"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » message   | string  | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» id       | integer | true | none |        | none |
| »» username | string  | true | none |        | none |
| »» email    | string  | true | none |        | none |
| »» mobile   | string  | true | none |        | none |
| »» avatar   | string  | true | none |        | none |

## PUT 修改密码

PUT /mall/user/password

> Body 请求参数

```json
{
  "oldPassword": "666888aaa",
  "newPassword": "400823823a"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "密码修改成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------- | ------- | ---- | ---- | ------ | ---- |
| » code    | integer | true | none |        | none |
| » message | string  | true | none |        | none |

## POST 添加地址

POST /mall/address

> Body 请求参数

```json
{
  "receiverName": "张三",
  "receiverPhone": "18878899980",
  "province": "江西",
  "city": "南昌",
  "district": "新建区",
  "detailAddress": "石埠镇2888号",
  "isDefault": true
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "id": 5,
    "userId": 4,
    "receiverName": "张三",
    "receiverPhone": "18878899980",
    "province": "江西",
    "city": "南昌",
    "district": "新建区",
    "detailAddress": "石埠镇2888号",
    "isDefault": true,
    "updateTime": "2025-03-04T15:17:59.669Z",
    "createTime": "2025-03-04T15:17:59.669Z"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称             | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------------- | ------- | ---- | ---- | ------ | ---- |
| » code           | integer | true | none |        | none |
| » message        | string  | true | none |        | none |
| » data           | object  | true | none |        | none |
| »» id            | integer | true | none |        | none |
| »» userId        | integer | true | none |        | none |
| »» receiverName  | string  | true | none |        | none |
| »» receiverPhone | string  | true | none |        | none |
| »» province      | string  | true | none |        | none |
| »» city          | string  | true | none |        | none |
| »» district      | string  | true | none |        | none |
| »» detailAddress | string  | true | none |        | none |
| »» isDefault     | boolean | true | none |        | none |
| »» updateTime    | string  | true | none |        | none |
| »» createTime    | string  | true | none |        | none |

## GET 获取地址

GET /mall/address

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "total": 2,
    "list": [
      {
        "id": 5,
        "userId": 4,
        "receiverName": "张三",
        "receiverPhone": "18878899980",
        "province": "江西",
        "city": "南昌",
        "district": "新建区",
        "detailAddress": "石埠镇2888号",
        "isDefault": true,
        "createTime": "2025-03-04T15:17:59.000Z",
        "updateTime": "2025-03-04T15:17:59.000Z"
      },
      {
        "id": 4,
        "userId": 4,
        "receiverName": "张三",
        "receiverPhone": "18878899980",
        "province": "江西",
        "city": "南昌",
        "district": "新建区",
        "detailAddress": "石埠镇2888号",
        "isDefault": false,
        "createTime": "2025-03-04T15:17:19.000Z",
        "updateTime": "2025-03-04T15:17:59.000Z"
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## PUT 修改地址

PUT /mall/address/5

> Body 请求参数

```json
{
  "receiverName": "黄少",
  "receiverPhone": "18878899980",
  "province": "江西",
  "city": "南昌",
  "district": "新建区",
  "detailAddress": "石埠镇2888号",
  "isDefault": true
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 5,
    "userId": 4,
    "receiverName": "黄少",
    "receiverPhone": "18878899980",
    "province": "江西",
    "city": "南昌",
    "district": "新建区",
    "detailAddress": "石埠镇2888号",
    "isDefault": true,
    "createTime": "2025-03-04T15:17:59.000Z",
    "updateTime": "2025-03-04T15:20:40.897Z"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## DELETE 删除地址

DELETE /mall/address/4

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "删除成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------- | ------- | ---- | ---- | ------ | ---- |
| » code    | integer | true | none |        | none |
| » message | string  | true | none |        | none |

## POST 添加购物车

POST /mall/cart

> Body 请求参数

```json
{
  "productId": "1",
  "quantity": "3"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "id": 4,
    "productId": 1,
    "quantity": 6
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称         | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------------ | ------- | ---- | ---- | ------ | ---- |
| » code       | integer | true | none |        | none |
| » message    | string  | true | none |        | none |
| » data       | object  | true | none |        | none |
| »» id        | integer | true | none |        | none |
| »» productId | integer | true | none |        | none |
| »» quantity  | integer | true | none |        | none |

## GET 获取购物车

GET /mall/cart

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "total": 1,
    "totalAmount": 2307.6,
    "items": [
      {
        "id": 4,
        "productId": 1,
        "productName": "商品1哦",
        "productImage": "uploads/products/product-1.jpg",
        "price": "384.60",
        "quantity": 6,
        "selected": true
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## PUT 更新购物车商品数量

PUT /mall/cart/4

> Body 请求参数

```json
{
  "quantity": "1"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "更新成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## DELETE 删除购物车商品

DELETE /mall/cart/4

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "删除成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------- | ------- | ---- | ---- | ------ | ---- |
| » code    | integer | true | none |        | none |
| » message | string  | true | none |        | none |

## POST 创建订单

POST /mall/order

> Body 请求参数

```json
{
  "addressId": "4",
  "items": [
    {
      "productId": "1",
      "quantity": "1"
    }
  ],
  "remark": "test"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "orderId": "MALL202503054322",
    "totalAmount": 106.09,
    "status": "待付款"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称           | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------------- | ------- | ---- | ---- | ------ | ---- |
| » code         | integer | true | none |        | none |
| » message      | string  | true | none |        | none |
| » data         | object  | true | none |        | none |
| »» orderId     | string  | true | none |        | none |
| »» totalAmount | number  | true | none |        | none |
| »» status      | string  | true | none |        | none |

## GET 订单列表

GET /mall/order

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "total": 2,
    "list": [
      {
        "orderId": "MALL202503054322",
        "totalAmount": "106.09",
        "status": "pending",
        "statusText": "待付款",
        "createTime": "2025-03-05T14:54:52.000Z",
        "items": [
          {
            "productId": 1,
            "productName": "商品1",
            "productImage": "uploads/products/product-1.jpg",
            "price": "106.09",
            "quantity": 1
          }
        ]
      },
      {
        "orderId": "MALL202503058817",
        "totalAmount": "106.09",
        "status": "pending",
        "statusText": "待付款",
        "createTime": "2025-03-05T14:54:32.000Z",
        "items": [
          {
            "productId": 1,
            "productName": "商品1",
            "productImage": "uploads/products/product-1.jpg",
            "price": "106.09",
            "quantity": 1
          }
        ]
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称              | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ----------------- | -------- | ---- | ---- | ------ | ---- |
| » code            | integer  | true | none |        | none |
| » data            | object   | true | none |        | none |
| »» total          | integer  | true | none |        | none |
| »» list           | [object] | true | none |        | none |
| »»» orderId       | string   | true | none |        | none |
| »»» totalAmount   | string   | true | none |        | none |
| »»» status        | string   | true | none |        | none |
| »»» statusText    | string   | true | none |        | none |
| »»» createTime    | string   | true | none |        | none |
| »»» items         | [object] | true | none |        | none |
| »»»» productId    | integer  | true | none |        | none |
| »»»» productName  | string   | true | none |        | none |
| »»»» productImage | string   | true | none |        | none |
| »»»» price        | string   | true | none |        | none |
| »»»» quantity     | integer  | true | none |        | none |

## GET 订单详情

GET /mall/order/MALL202503058817

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "orderId": "MALL202503058817",
    "totalAmount": "106.09",
    "status": "pending",
    "statusText": "待付款",
    "createTime": "2025-03-05T14:54:32.000Z",
    "address": {
      "receiverName": "张三",
      "receiverPhone": "18878899980",
      "fullAddress": "江西南昌新建区石埠镇2888号"
    },
    "items": [
      {
        "productId": 1,
        "productName": "商品1",
        "productImage": "uploads/products/product-1.jpg",
        "price": "106.09",
        "quantity": 1
      }
    ],
    "remark": "test"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称              | 类型     | 必选  | 约束 | 中文名 | 说明 |
| ----------------- | -------- | ----- | ---- | ------ | ---- |
| » code            | integer  | true  | none |        | none |
| » data            | object   | true  | none |        | none |
| »» orderId        | string   | true  | none |        | none |
| »» totalAmount    | string   | true  | none |        | none |
| »» status         | string   | true  | none |        | none |
| »» statusText     | string   | true  | none |        | none |
| »» createTime     | string   | true  | none |        | none |
| »» address        | object   | true  | none |        | none |
| »»» receiverName  | string   | true  | none |        | none |
| »»» receiverPhone | string   | true  | none |        | none |
| »»» fullAddress   | string   | true  | none |        | none |
| »» items          | [object] | true  | none |        | none |
| »»» productId     | integer  | false | none |        | none |
| »»» productName   | string   | false | none |        | none |
| »»» productImage  | string   | false | none |        | none |
| »»» price         | string   | false | none |        | none |
| »»» quantity      | integer  | false | none |        | none |
| »» remark         | string   | true  | none |        | none |

## PUT 取消订单

PUT /mall/order/MALL202503058817/cancel

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "订单已取消"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称      | 类型    | 必选 | 约束 | 中文名 | 说明 |
| --------- | ------- | ---- | ---- | ------ | ---- |
| » code    | integer | true | none |        | none |
| » message | string  | true | none |        | none |

## PUT 确认收货

PUT /mall/order/MALL202503054322/confirm

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "message": "确认收货成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## GET 获取分类

GET /mall/category

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

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
      "productCount": 6
    },
    {
      "id": 1,
      "name": "电子产品",
      "description": "电子产品分类的详细描述",
      "image": "uploads/categories/electronics.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 6
    },
    {
      "id": 3,
      "name": "食品",
      "description": "食品分类的详细描述",
      "image": "uploads/categories/food.jpg",
      "seoTitle": null,
      "seoDescription": null,
      "seoKeywords": null,
      "productCount": 3
    }
  ]
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称              | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ----------------- | -------- | ---- | ---- | ------ | ---- |
| » code            | integer  | true | none |        | none |
| » message         | string   | true | none |        | none |
| » data            | [object] | true | none |        | none |
| »» id             | integer  | true | none |        | none |
| »» name           | string   | true | none |        | none |
| »» description    | string   | true | none |        | none |
| »» image          | string   | true | none |        | none |
| »» seoTitle       | null     | true | none |        | none |
| »» seoDescription | null     | true | none |        | none |
| »» seoKeywords    | null     | true | none |        | none |
| »» productCount   | integer  | true | none |        | none |

## GET 商品信息（列表，查询）

GET /mall/products

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| page          | query  | string | 否   | none |
| pageSize      | query  | string | 否   | none |
| sort          | query  | string | 否   | none |
| lang          | query  | string | 否   | none |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "total": 20,
    "list": [
      {
        "id": 14,
        "name": "Product 14",
        "description": "This is product 14 description",
        "price": "954.95",
        "image": "uploads/products/product-14.jpg",
        "sales": 0,
        "stock": "121",
        "category": {
          "id": 3,
          "name": "Food"
        }
      },
      {
        "id": 3,
        "name": "Product 3",
        "description": "This is product 3 description",
        "price": "924.85",
        "image": "uploads/products/product-3.jpg",
        "sales": 0,
        "stock": "134",
        "category": {
          "id": 2,
          "name": "Clothing"
        }
      },
      {
        "id": 20,
        "name": "Product 20",
        "description": "This is product 20 description",
        "price": "916.51",
        "image": "uploads/products/product-20.jpg",
        "sales": 0,
        "stock": "115",
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      },
      {
        "id": 18,
        "name": "Product 18",
        "description": "This is product 18 description",
        "price": "731.60",
        "image": "uploads/products/product-18.jpg",
        "sales": 0,
        "stock": "210",
        "category": {
          "id": 2,
          "name": "Clothing"
        }
      },
      {
        "id": 17,
        "name": "Product 17",
        "description": "This is product 17 description",
        "price": "696.88",
        "image": "uploads/products/product-17.jpg",
        "sales": 0,
        "stock": "100",
        "category": {
          "id": 4,
          "name": "Home"
        }
      },
      {
        "id": 16,
        "name": "Product 16",
        "description": "This is product 16 description",
        "price": "681.85",
        "image": "uploads/products/product-16.jpg",
        "sales": 0,
        "stock": "201",
        "category": {
          "id": 2,
          "name": "Clothing"
        }
      },
      {
        "id": 11,
        "name": "Product 11",
        "description": "This is product 11 description",
        "price": "574.22",
        "image": "uploads/products/product-11.jpg",
        "sales": 0,
        "stock": "262",
        "category": {
          "id": 2,
          "name": "Clothing"
        }
      },
      {
        "id": 10,
        "name": "Product 10",
        "description": "This is product 10 description",
        "price": "570.15",
        "image": "uploads/products/product-10.jpg",
        "sales": 0,
        "stock": "111",
        "category": {
          "id": 3,
          "name": "Food"
        }
      },
      {
        "id": 13,
        "name": "Product 13",
        "description": "This is product 13 description",
        "price": "452.60",
        "image": "uploads/products/product-13.jpg",
        "sales": 0,
        "stock": "168",
        "category": {
          "id": 4,
          "name": "Home"
        }
      },
      {
        "id": 12,
        "name": "Product 12",
        "description": "This is product 12 description",
        "price": "440.97",
        "image": "uploads/products/product-12.jpg",
        "sales": 0,
        "stock": "188",
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明 |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| » code          | integer  | true | none |        | none |
| » data          | object   | true | none |        | none |
| »» total        | integer  | true | none |        | none |
| »» list         | [object] | true | none |        | none |
| »»» id          | integer  | true | none |        | none |
| »»» name        | string   | true | none |        | none |
| »»» description | string   | true | none |        | none |
| »»» price       | string   | true | none |        | none |
| »»» image       | string   | true | none |        | none |
| »»» images      | [string] | true | none |        | none |
| »»» category    | string   | true | none |        | none |

## GET 商品详情

GET /mall/products/2

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "id": 2,
    "name": "商品2",
    "description": "这是商品2的详细描述",
    "price": "187.59",
    "images": [
      "uploads/products/product-2-1.jpg",
      "uploads/products/product-2-2.jpg",
      "uploads/products/product-2-3.jpg"
    ],
    "sales": 0,
    "stock": 40,
    "category": {
      "id": 2,
      "name": "服装"
    },
    "specifications": {
      "size": "M",
      "color": "红色",
      "material": "棉"
    },
    "details": "这是商品2的详细描述",
    "warehouses": [
      {
        "id": 1,
        "name": "上海仓",
        "stock": 34
      },
      {
        "id": 2,
        "name": "LA Warehouse",
        "stock": 1
      },
      {
        "id": 3,
        "name": "東京倉庫",
        "stock": 5
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称              | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ----------------- | -------- | ---- | ---- | ------ | ---- |
| » code            | integer  | true | none |        | none |
| » data            | object   | true | none |        | none |
| »» id             | integer  | true | none |        | none |
| »» name           | string   | true | none |        | none |
| »» description    | string   | true | none |        | none |
| »» price          | string   | true | none |        | none |
| »» images         | [string] | true | none |        | none |
| »» sales          | integer  | true | none |        | none |
| »» stock          | integer  | true | none |        | none |
| »» category       | object   | true | none |        | none |
| »»» id            | integer  | true | none |        | none |
| »»» name          | string   | true | none |        | none |
| »» specifications | object   | true | none |        | none |
| »»» size          | string   | true | none |        | none |
| »»» color         | string   | true | none |        | none |
| »»» material      | string   | true | none |        | none |
| »» details        | string   | true | none |        | none |
| »» warehouses     | [object] | true | none |        | none |
| »»» id            | integer  | true | none |        | none |
| »»» name          | string   | true | none |        | none |
| »»» stock         | integer  | true | none |        | none |
