import { getUserRole } from "./helpers";

// Конфиг регистрации
export const registerFormConfig = (postOffices) => ({
  fields: [
    { name: "name", label: "Имя" },
    { name: "surname", label: "Фамилия" },
    { name: "middleName", label: "Отчество" },
    { name: "password", label: "Пароль", type: "password" },
    {
      name: "userAddress",
      label: "Адрес проживания",
      type: "select",
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Зарегистрироваться"
});

// Конфиг входа
export const loginFormConfig = (users) => ({
  fields: [
    {
      name: "login",
      label: "Логин",
      type: "select",
      options: users.map(user => ({
        value: user.surname,
        label: `${getUserRole(user.userRole)} - ${user.surname} ${user.name}`
      }))
    },
    { name: "password", label: "Пароль", type: "password" }
  ],
  submitText: "Войти"
});

// Конфиг создания посылки
export const createParcelFormConfig = (postOffices, users) => ({
  fields: [
    {
      name: "parcelTo",
      label: "Отделение назначения",
      type: "select",
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    },
    {
      name: "parcelType",
      label: "Тип отправления",
      type: "select",
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
      options: [
        { value: "FIRST", label: "1 класс" },
        { value: "SECOND", label: "2 класс" },
        { value: "THIRD", label: "3 класс" }
      ]
    },
    { name: "parcelWeight", label: "Вес (кг)", type: "number" },
    {
      name: "parcelBlockchainTo",
      label: "Получатель",
      type: "select",
      options: users.map(user => ({
        value: user.surname,
        label: `${getUserRole(user.userRole)} - ${user.surname} ${user.name}`
      }))
    }
  ],
  submitText: "Создать посылку"
});

// Конфиг денежного перевода
export const moneyTransferFormConfig = (users) => ({
  fields: [
    {
      name: "moneyTransferTo",
      label: "Получатель",
      type: "select",
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name}`
      }))
    },
    { name: "moneyTransferAmount", label: "Сумма (WEST)", type: "number" },
    { name: "moneyTransferLifeTime", label: "Срок жизни (дней)", type: "number" }
  ],
  submitText: "Отправить перевод"
});

// Конфиг добавления сотрудника
export const addEmployeeFormConfig = (users, postOffices) => ({
  fields: [
    {
      name: "login",
      label: "Пользователь",
      type: "select",
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name}`
      }))
    },
    {
      name: "userAddress",
      label: "Отделение работы",
      type: "select",
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Добавить сотрудника"
});

// Конфиг удаления сотрудника
export const deleteEmployeeFormConfig = (employees) => ({
  fields: [
    {
      name: "employeeBlockchain",
      label: "Сотрудник для удаления",
      type: "select",
      options: employees.map(employee => ({
        value: employee.userBlockchain,
        label: `${employee.surname} ${employee.name} - ${employee.employeePostId}`
      }))
    }
  ],
  submitText: "Удалить сотрудника"
});

// Конфиг изменения отделения сотрудника
export const changeEmployeePostFormConfig = (employees, postOffices) => ({
  fields: [
    {
      name: "login",
      label: "Сотрудник",
      type: "select",
      options: employees.map(employee => ({
        value: employee.userBlockchain,
        label: `${employee.surname} ${employee.name}`
      }))
    },
    {
      name: "postId",
      label: "Новое отделение",
      type: "select",
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Изменить отделение"
});

// Конфиг подтверждения посылки
export const confirmParcelFormConfig = (parcels, postOffices) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    },
    { name: "parcelDeclaredValue", label: "Объявленная ценность", type: "number" },
    {
      name: "nextPostOfficeId",
      label: "Следующее отделение",
      type: "select",
      options: postOffices.map(office => ({
        value: office[0],
        label: `${office[0]} - ${office[1]}`
      }))
    }
  ],
  submitText: "Подтвердить посылку"
});

// Конфиг обработки посылки в транзите
export const checkoutParcelFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    }
  ],
  submitText: "Обработать посылку"
});

// Конфиг принятия/отклонения посылки
export const processParcelDeliveryFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    },
    {
      name: "isAccepted",
      label: "Действие",
      type: "select",
      options: [
        { value: "true", label: "Принять посылку" },
        { value: "false", label: "Отклонить посылку" }
      ]
    }
  ],
  submitText: "Подтвердить"
});

// Конфиг отмены денежного перевода
export const cancelMoneyTransferFormConfig = (transfers) => ({
  fields: [
    {
      name: "transferId",
      label: "Перевод для отмены",
      type: "select",
      options: transfers.map(transfer => ({
        value: transfer.moneyTransferId,
        label: `${transfer.moneyTransferId} - ${transfer.moneyTransferAmount} WEST`
      }))
    }
  ],
  submitText: "Отменить перевод"
});

// Конфиг принятия/отклонения перевода
export const processMoneyTransferFormConfig = (transfers) => ({
  fields: [
    {
      name: "transferId",
      label: "Перевод",
      type: "select",
      options: transfers.map(transfer => ({
        value: transfer.moneyTransferId,
        label: `${transfer.moneyTransferId} - ${transfer.moneyTransferAmount} WEST`
      }))
    },
    {
      name: "action",
      label: "Действие",
      type: "select",
      options: [
        { value: "accept", label: "Принять перевод" },
        { value: "decline", label: "Отклонить перевод" }
      ]
    }
  ],
  submitText: "Подтвердить"
});

// Конфиг редактирования профиля
export const editProfileFormConfig = (postOffices) => ({
  fields: [
    { name: "name", label: "Имя" },
    { name: "surname", label: "Фамилия" },
    { name: "middleName", label: "Отчество" },
    {
      name: "userAddress",
      label: "Адрес",
      type: "select",
      options: postOffices.map(office => ({
        value: office.postOfficeId,
        label: `${office.postOfficeId}`
      }))
    },
    { name: "password", label: "Пароль", type: "password" }
  ],
  submitText: "Сохранить изменения"
});

// Конфиг просмотра истории посылки
export const parcelHistoryFormConfig = (parcels) => ({
  fields: [
    {
      name: "trackId",
      label: "Трек-номер посылки",
      type: "select",
      options: parcels.map(parcel => ({
        value: parcel.parcelTrackNumber,
        label: `${parcel.parcelTrackNumber} - ${parcel.parcelType}`
      }))
    }
  ],
  submitText: "Показать историю"
});

// Конфиг выбора пользователя для демо-входа
export const demoLoginFormConfig = (users) => ({
  fields: [
    {
      name: "userId",
      label: "Выберите пользователя",
      type: "select",
      options: users.map(user => ({
        value: user.userBlockchain,
        label: `${user.surname} ${user.name} ${user.middleName} - ${user.userRole}`
      }))
    },
    { name: "password", label: "Пароль", type: "password" }
  ],
  submitText: "Войти"
});