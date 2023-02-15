const salesDB = [
  {
    "id": 1,
    "date": "2023-02-15 13:00:00"
  },
  {
    "id": 2,
    "date": "2023-02-15 13:00:00"
  }
];

const expetedResponse = [
  {
    "id": 1,
    "date": "2023-02-15 13:00:00"
  },
  {
    "id": 2,
    "date": "2023-02-15 13:00:00"
  }
];

const allSalesById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const responseAllSalesById = [
  {
    date:"2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  }
];

const insertSalesModelMock = "2016-03-18 13:00:00";

module.exports = {
  salesDB,
  expetedResponse,
  allSalesById,
  responseAllSalesById,
  insertSalesModelMock,
}