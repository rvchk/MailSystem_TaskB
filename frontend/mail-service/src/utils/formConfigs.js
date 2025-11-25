// utils/formConfigs.js

import { getUserRole } from "./helpers";

// Конфиг регистрации
export const registerFormConfig = (postOffices) => ({
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
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
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
});

// Конфиг входа
export const loginFormConfig = (users) => ({
  fields: [
    {
      name: "login",
      label: "Логин",
      type: "select",
      required: true,
      options: users.map(user => ({
        value: user.surname,
        label: `${getUserRole(user.userRole)} - ${user.surname} ${user.name}`
      }))
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
});

// Конфиг создания посылки
export const createParcelFormConfig = (postOffices) => ({
  fields: [
    {
      name: "parcelTo",
      label: "Отделение назначения",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
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

// Конфиг добавления сотрудника (Админ)
export const addEmployeeFormConfig = (users, postOffices) => ({
  fields: [
    {
      name: "moneyTransferTo",
      label: "Пользователь",
      type: "select",
      required: true,
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name}`
      }))
    },
    {
      name: "userPostId",
      label: "Отделение работы",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    },
    {
      name: "userBalance",
      label: "Начальный баланс",
      type: "number",
      required: true,
      placeholder: "Введите баланс",
      min: 0
    }
  ],
  submitText: "Добавить сотрудника",
  loadingText: "Добавление..."
});

// Конфиг удаления сотрудника (Админ)
export const deleteEmployeeFormConfig = (employees) => ({
  fields: [
    {
      name: "employeeBlockchain",
      label: "Сотрудник для удаления",
      type: "select",
      required: true,
      options: employees.map(employee => ({
        value: employee.userBlockchain,
        label: `${employee.surname} ${employee.name} - ${employee.employeePostId}`
      }))
    }
  ],
  submitText: "Удалить сотрудника",
  loadingText: "Удаление..."
});

// Конфиг изменения отделения сотрудника (Админ)
export const changeEmployeePostFormConfig = (employees, postOffices) => ({
  fields: [
    {
      name: "employeeBlockchain",
      label: "Сотрудник",
      type: "select",
      required: true,
      options: employees.map(employee => ({
        value: employee.userBlockchain,
        label: `${employee.surname} ${employee.name}`
      }))
    },
    {
      name: "postId",
      label: "Новое отделение",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Изменить отделение",
  loadingText: "Изменение..."
});

// Конфиг подтверждения посылки (Сотрудник)
export const confirmParcelFormConfig = (parcels, postOffices) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      required: true,
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    },
    {
      name: "parcelDeclaredValue",
      label: "Объявленная ценность",
      type: "number",
      required: true,
      placeholder: "Введите ценность",
      min: 0,
      step: 0.1
    },
    {
      name: "nextPostOfficeId",
      label: "Следующее отделение",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Подтвердить посылку",
  loadingText: "Подтверждение..."
});

// Конфиг обработки посылки в транзите (Сотрудник)
export const checkoutParcelFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      required: true,
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    }
  ],
  submitText: "Обработать посылку",
  loadingText: "Обработка..."
});

// Конфиг принятия/отклонения посылки (Все)
export const processParcelDeliveryFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      required: true,
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    },
    {
      name: "isAccepted",
      label: "Действие",
      type: "select",
      required: true,
      options: [
        { value: "true", label: "Принять посылку" },
        { value: "false", label: "Отклонить посылку" }
      ]
    }
  ],
  submitText: "Подтвердить",
  loadingText: "Обработка..."
});

// Конфиг отмены денежного перевода (Все)
export const cancelMoneyTransferFormConfig = (transfers) => ({
  fields: [
    {
      name: "transferId",
      label: "Перевод для отмены",
      type: "select",
      required: true,
      options: transfers.map(transfer => ({
        value: transfer.moneyTransferId,
        label: `${transfer.moneyTransferId} - ${transfer.moneyTransferAmount} WEST`
      }))
    }
  ],
  submitText: "Отменить перевод",
  loadingText: "Отмена..."
});

// Конфиг принятия/отклонения перевода (Все)
export const processMoneyTransferFormConfig = (transfers) => ({
  fields: [
    {
      name: "transferId",
      label: "Перевод",
      type: "select",
      required: true,
      options: transfers.map(transfer => ({
        value: transfer.moneyTransferId,
        label: `${transfer.moneyTransferId} - ${transfer.moneyTransferAmount} WEST`
      }))
    },
    {
      name: "action",
      label: "Действие",
      type: "select",
      required: true,
      options: [
        { value: "accept", label: "Принять перевод" },
        { value: "decline", label: "Отклонить перевод" }
      ]
    }
  ],
  submitText: "Подтвердить",
  loadingText: "Обработка..."
});

// Конфиг редактирования профиля (Все)
export const editProfileFormConfig = (postOffices, currentUser) => ({
  fields: [
    {
      name: "name",
      label: "Имя",
      type: "text",
      required: true,
      placeholder: "Введите имя",
      defaultValue: currentUser?.name
    },
    {
      name: "surname",
      label: "Фамилия",
      type: "text",
      required: true,
      placeholder: "Введите фамилию",
      defaultValue: currentUser?.surname
    },
    {
      name: "middleName",
      label: "Отчество",
      type: "text",
      required: true,
      placeholder: "Введите отчество",
      defaultValue: currentUser?.middleName
    },
    {
      name: "userAddress",
      label: "Адрес",
      type: "select",
      required: true,
      options: postOffices.map(office => ({
        value: office.postOfficeId,
        label: `${office.postOfficeId}`
      })),
      defaultValue: currentUser?.userAddress
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      required: true,
      placeholder: "Введите пароль",
      defaultValue: currentUser?.password
    }
  ],
  submitText: "Сохранить изменения",
  loadingText: "Сохранение..."
});

// Конфиг просмотра истории посылки (Все)
export const parcelHistoryFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      required: true,
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    }
  ],
  submitText: "Показать историю",
  loadingText: "Загрузка..."
});

// Конфиг выбора пользователя для демо-входа
export const demoLoginFormConfig = (users) => ({
  fields: [
    {
      name: "userId",
      label: "Выберите пользователя",
      type: "select",
      required: true,
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name} ${user.middleName} - ${user.userRole}`
      }))
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      required: true,
      placeholder: "Введите пароль (password123)"
    }
  ],
  submitText: "Войти",
  loadingText: "Вход..."
});