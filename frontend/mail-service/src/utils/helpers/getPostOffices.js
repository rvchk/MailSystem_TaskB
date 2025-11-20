const userRoles = {
  ADMIN: "Администратор",
  POST_OFFICE_EMPLOYEE: "Сотрудник",
  USER: "Пользователь"
}

export const getUserRole = (role) => userRoles[role]