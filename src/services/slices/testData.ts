/* моковые данные для constructorReducer.test */
export const itemsToAdd = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

export const itemsToMove = [
  {
    id: '1',
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

export const mockNewOrder = {
  success: true,
  orders: [
    {
      _id: '6',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0948'
      ],
      owner: '1',
      status: 'done',
      name: 'Space флюоресцентный био-марсианский бургер',
      createdAt: '2025-01-03T11:13:19.020Z',
      updatedAt: '2025-01-03T11:13:19.906Z',
      number: 58234,
      __v: 0
    }
  ]
};

/* моковые данные для feedReducer.test */
export const mockFeedData = {
  orders: [
    {
      _id: '6746c05eb27b06001c3eb58f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный био-марсианский бургер',
      createdAt: '2024-11-27T06:46:54.493Z',
      updatedAt: '2024-11-27T06:46:55.400Z',
      number: 60719
    }
  ],
  total: 1,
  totalToday: 1
};

/* моковые данные для ingredientsReducer.test.ts */

export const mockIngredientData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0
    }
  ],
  loading: false,
  error: null
};

/* моковые данные для orderReducer.test.ts */
export const orderMockData = {
  orders: [
    {
      _id: '6746c05eb27b06001c3eb58f',
      status: 'done',
      name: 'Space флюоресцентный био-марсианский бургер',
      createdAt: '2024-11-27T06:46:54.493Z',
      updatedAt: '2024-11-27T06:46:55.400Z',
      number: 60719,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ]
    }
  ],
  isLoading: true
};

/* моковые данные для userReducer.test.ts */

export const userMockData = {
  isAuthChecked: true,
  user: {
    email: 'sergio-p@yandex.ru',
    name: 'Сергей'
  },
  error: ''
};

export const userResponceData = {
  success: true,
  user: {
    email: 'sergio-p@yandex.ru',
    name: 'Сергей'
  }
};

export const userRegisterData = {
  email: 'sergio-p@yandex.ru',
  name: 'Сергей',
  password: 'VNK4579brain'
};

export const mockPayload = {
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2NhMWJmYjI3YjA2MDAxYzNlOTIxYiIsImlhdCI6MTczMjY5NjQzMywiZXhwIjoxNzMyNjk3NjMzfQ.kb-L8Lr1H3B0B1QDnd_VocXRAl6_A2kmDP83hJ4dS7I',
  refreshToken:
    '99444a1fc28187cdbb1aa523ec506e176beccd20bdf0cd6771c4da7b4b341daae1027c8baf2911a6',
  user: {
    email: 'sergio-p@yandex.ru',
    name: 'Сергей'
  }
};
