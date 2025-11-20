// utils/formConfigs.js

// Конфиг регистрации
export const registerFormConfig = {
  fields: [
    {
      name: "name",
      label: "Имя",
      type: "text",
      required: true,
      placeholder: "Введите ваше имя"
    },
    {
      name: "surname",
      label: "Фамилия", 
      type: "text",
      required: true,
      placeholder: "Введите вашу фамилию"
    },
    {
      name: "middleName",
      label: "Отчество",
      type: "text", 
      required: true,
      placeholder: "Введите ваше отчество"
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      required: true,
      placeholder: "Введите пароль"
    },
    {
      name: "userAddress",
      label: "Адрес проживания",
      type: "number", 
      required: true,
      placeholder: "Введите почтовый индекс"
    },
    {
      name: "userBalance",
      label: "Баланс",
      type: "number",
      required: true,
      placeholder: "Введите начальный баланс",
      min: 0
    }
  ],
  submitText: "Зарегистрироваться",
  loadingText: "Регистрация..."
};

// Конфиг входа
export const loginFormConfig = {
  fields: [
    {
      name: "login",
      label: "Логин",
      type: "text",
      required: true,
      placeholder: "Введите ваш логин"
    },
    {
      name: "password", 
      label: "Пароль",
      type: "password",
      required: true,
      placeholder: "Введите ваш пароль"
    }
  ],
  submitText: "Войти",
  loadingText: "Вход..."
};

// Конфиг создания посылки
export const createParcelFormConfig = (postOffices) => ({
  fields: [
    {
      name: "parcelTo",
      label: "Отделение назначения",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office.postOfficeId,
        label: `${office.postOfficeId} - ${office.postOfficeType}`
      }))
    },
    {
      name: "parcelType",
      label: "Тип отправления", 
      type: "select",
      required: true,
      options: [
        { value: "LETTER", label: "Письмо" },
        { value: "PARCEL", label: "Посылка" },
        { value: "PACKAGE", label: "Бандероль" }
      ]
    },
    {
      name: "parcelClass",
      label: "Класс отправления",
      type: "select", 
      required: true,
      options: [
        { value: "FIRST", label: "1 класс" },
        { value: "SECOND", label: "2 класс" },
        { value: "THIRD", label: "3 класс" }
      ]
    },
    {
      name: "parcelWeight",
      label: "Вес (кг)",
      type: "number",
      required: true,
      placeholder: "Введите вес от 0.1 до 10 кг",
      min: 0.1,
      max: 10,
      step: 0.1
    },
    {
      name: "parcelBlockchainTo",
      label: "Получатель",
      type: "text",
      required: true,
      placeholder: "Введите адрес получателя"
    }
  ],
  submitText: "Создать посылку", 
  loadingText: "Создание..."
});

// Конфиг денежного перевода
export const moneyTransferFormConfig = (users) => ({
  fields: [
    {
      name: "moneyTransferTo",
      label: "Получатель",
      type: "select",
      required: true,
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name}`
      }))
    },
    {
      name: "moneyTransferAmount",
      label: "Сумма (WEST)",
      type: "number",
      required: true,
      placeholder: "Введите сумму",
      min: 0.1,
      step: 0.1
    },
    {
      name: "moneyTransferLifeTime", 
      label: "Срок жизни (дней)",
      type: "number",
      required: true,
      placeholder: "Введите срок в днях",
      min: 1,
      max: 30
    }
  ],
  submitText: "Отправить перевод",
  loadingText: "Отправка..."
});