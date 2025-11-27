package org.example

import com.wavesenterprise.sdk.contract.api.annotation.ContractHandler
import com.wavesenterprise.sdk.contract.api.domain.ContractCall
import com.wavesenterprise.sdk.contract.api.state.ContractState
import com.wavesenterprise.sdk.contract.api.state.mapping.Mapping
import com.wavesenterprise.sdk.contract.core.state.getValue
import org.example.Api.Api
import org.example.Data.*

@ContractHandler
class Impl(val contractState: ContractState, val call: ContractCall) : Api {
    val parcels: Mapping<Parcel> by contractState
    val users: Mapping<User> by contractState
    val moneyTransfers: Mapping<List<MoneyTransfer>> by contractState
    val postOffices: Mapping<PostOffice> by contractState

    override fun init() {
        moneyTransfers.put("_", emptyList())
        postOffices.put("344000", PostOffice(344000, PostOfficeType.SORTING_CENTER, emptyList(), emptyList()))
        postOffices.put("347900", PostOffice(347900, PostOfficeType.SORTING_CENTER, emptyList(), emptyList()))
        postOffices.put("347901", PostOffice(347901, PostOfficeType.POST_OFFICE, emptyList(), emptyList()))
        postOffices.put("347902", PostOffice(347902, PostOfficeType.POST_OFFICE, emptyList(), emptyList()))
        postOffices.put("347903", PostOffice(347903, PostOfficeType.POST_OFFICE, emptyList(), emptyList()))
        postOffices.put("346770", PostOffice(346770, PostOfficeType.SORTING_CENTER, emptyList(), emptyList()))
        postOffices.put("346771", PostOffice(346771, PostOfficeType.POST_OFFICE, emptyList(), emptyList()))
        postOffices.put("346781", PostOffice(346781, PostOfficeType.POST_OFFICE, emptyList(), emptyList()))

        users.put(
            "Семенов",
            User(
                "Семен",
                "Семенов",
                "Семенович",
                "123",
                344000,
                50.0,
                UserRole.ADMIN
            )
        )

        // Сотрудник в Ростове-на-Дону - Петров Петр Петрович
        val rostovEmployee = User(
            "Петр",
            "Петров",
            "Петрович",
            "111",
            userAddress = 344000,
            userBalance = 50.0,
            userRole = UserRole.POST_OFFICE_EMPLOYEE,
            employeePostId = 344000
        )
        users.put(rostovEmployee.surname, rostovEmployee)

        // Сотрудник в Таганроге - Антонов Антон Антонович
        val taganrogEmployee = User(
            "Антон",
            "Антонов",
            "Антонович",
            "222",
            userAddress = 347900,
            userBalance = 50.0,
            userRole = UserRole.POST_OFFICE_EMPLOYEE,
            employeePostId = 347900
        )
        users.put(taganrogEmployee.surname, taganrogEmployee)

        // Обычный пользователь - Юрьев Юрий Юрьевич
        val regularUser = User(
            "Юрий",
            "Юрьев",
            "Юрьевич",
            "333",
            userAddress = 346781, // Азов
            userBalance = 50.0,
            userRole = UserRole.USER
        )
        users.put(regularUser.surname, regularUser)
    }

    override fun register(
        name: String,
        surname: String,
        middleName: String,
        password: String,
        userAddress: String,
    ) {
        val newUser =
            User(name, surname, middleName, password, userAddress.toInt(), 50.0, UserRole.USER, 0)
        users.put(surname, newUser)
    }

    override fun registerEmployee(
        login: String,
        userAddress: String
    ) {
        // Проверка прав администратора
        val admin = users.tryGet(login).orElseThrow {
            IllegalStateException("Пользователь не найден!")
        }

        if (admin.userRole != UserRole.ADMIN) {
            throw IllegalStateException("Только администратор может добавлять сотрудников!")
        }

        val existingUser = users.tryGet(login).orElseThrow {
            IllegalStateException("Пользователь с фамилией '$login' не найден!")
        }

        val updatedUser = existingUser.copy(
            userRole = UserRole.POST_OFFICE_EMPLOYEE,
            employeePostId = userAddress.toInt()
        )

        users.put(login, updatedUser)
    }

    override fun changeEmployeePostId(login: String, postId: Int) {
        val employee = users.tryGet(login).orElseThrow {
            IllegalStateException("Сотрудник не найден!")
        }

        employee.employeePostId = postId
        users.put(login, employee)
    }

    override fun deleteEmployee(login: String) {
        val employee = users.tryGet(login).orElseThrow {
            IllegalStateException("Сотрудник не найден!")
        }

        if (employee.userRole == UserRole.DELETED) {
            throw IllegalStateException("Сотрудник уже удалён!")
        }

        employee.userRole = UserRole.DELETED
        users.put(login, employee)
    }

    override fun createMoneyTransfer(moneyTransferTo: String, moneyTransferAmount: Int, moneyTransferLifeTime: Int) {
        val user = users.tryGet(call.sender.asBase58String()).orElseThrow {
            IllegalStateException("Вы не зарегистрированы")
        }

        if (user.userBalance < moneyTransferAmount) {
            throw IllegalStateException("У вас недостаточно средств для перевода")
        }

        var id: String
        do {
            id = (1..1000).random().toString()
        } while (moneyTransfers.tryGet(id).isPresent)

        val moneyTransfer = MoneyTransfer(
            id,
            call.sender.asBase58String(),
            moneyTransferTo,
            moneyTransferAmount.toDouble(),
            moneyTransferLifeTime,
        )

        val allMoneyTransfers = moneyTransfers.tryGet("_").get()
        val updatedMoneyTransfers = allMoneyTransfers + moneyTransfer
        moneyTransfers.put("_", updatedMoneyTransfers)

        user.userBalance -= moneyTransferAmount
        users.put(call.sender.asBase58String(), user)
    }

    override fun processMoneyTransfer(id: String, action: String) {
        val allMoneyTransfers = moneyTransfers.tryGet("_").get()
        val moneyTransfer = allMoneyTransfers.find { it.moneyTransferId == id }
            ?: throw IllegalStateException("Перевод с указанным ID не найден!")

        if (call.sender.asBase58String() != moneyTransfer.moneyTransferTo) {
            throw IllegalStateException("Вы не можете выполнить это действие с данным переводом!")
        }

        val isAccepted = when (action.lowercase()) {
            "accept", "true" -> true
            "decline", "false" -> false
            else -> throw IllegalArgumentException("Аргумент action должен быть 'accept' или 'decline'")
        }

        val updatedMoneyTransfer = if (isAccepted) {
            moneyTransfer.copy(moneyTransferStatus = MoneyTransferStatus.RECEIVED)
        } else {
            moneyTransfer.copy(moneyTransferStatus = MoneyTransferStatus.DECLINED)
        }

        val updatedMoneyTransfers = allMoneyTransfers.map {
            if (it.moneyTransferId == id) updatedMoneyTransfer else it
        }
        moneyTransfers.put("_", updatedMoneyTransfers)

        // Обновление балансов
        if (isAccepted) {
            val recipient = users.tryGet(moneyTransfer.moneyTransferTo).get()
            recipient.userBalance += moneyTransfer.moneyTransferAmount
            users.put(moneyTransfer.moneyTransferTo, recipient)
        } else {
            val sender = users.tryGet(moneyTransfer.moneyTransferFrom).get()
            sender.userBalance += moneyTransfer.moneyTransferAmount
            users.put(moneyTransfer.moneyTransferFrom, sender)
        }
    }

    override fun initiateSendParcel(
        login: String,
        parcelTo: String,
        parcelType: String,
        parcelClass: String,
        parcelWeight: String,
        parcelBlockchainTo: String,
        currentDate: String,
        dailyCount: String
    ) {
        if (parcelWeight.toDouble() > 10.0) {
            throw IllegalStateException("Вес отправления не может превышать 10 кг!")
        }

        if (parcelWeight.toDouble() <= 0) {
            throw IllegalStateException("Вес отправления должен быть положительным!")
        }

        if (!users.tryGet(parcelBlockchainTo).isPresent) {
            throw IllegalStateException("Получатель не найден!")
        }

        if (!postOffices.tryGet(parcelTo).isPresent) {
            throw IllegalStateException("Почтовое отделение назначения не найдено!")
        }

        val user = users.tryGet(login).orElseThrow {
            IllegalStateException("Вы не зарегистрированы")
        }
        val parcelFrom = user.userAddress
        val currentPostOffice = postOffices.tryGet(parcelFrom.toString()).orElseThrow {
            IllegalStateException("Почтовое отделение не найдено!")
        }

        val newParcel = Parcel(
            parcelTrackNumber = createParcelTrackNumber(parcelFrom, parcelTo.toInt(), currentDate, dailyCount),
            parcelFrom = parcelFrom,
            parcelTo = parcelTo.toInt(),
            parcelType = ParcelType.valueOf(parcelType),
            parcelClass = ParcelClass.valueOf(parcelClass),
            parcelWeight = parcelWeight.toDouble(),
            parcelBlockchainFrom = user.surname,
            parcelBlockchainTo = parcelBlockchainTo,
            parcelCurrentOfficeId = parcelFrom,
            parcelCheckoutEmployees = listOf(),
            parcelDeliveryTime = ParcelClass.valueOf(parcelClass).deliveryDays.toString(),
            parcelDeliveryPrice = ParcelClass.valueOf(parcelClass).deliveryPrice,
            parcelTotalAmount = ""
        )

        val updatedPostOfficeParcels = currentPostOffice.postOfficeParcels + newParcel
        val updatedPostOffice = currentPostOffice.copy(postOfficeParcels = updatedPostOfficeParcels)
        postOffices.put(currentPostOffice.postOfficeId.toString(), updatedPostOffice)
        parcels.put(newParcel.parcelTrackNumber, newParcel)
    }

    override fun confirmParcel(login: String, trackId: String, parcelDeclaredValue: String, nextPostOfficeId: String) {
        val currentUser = users.tryGet(login).orElseThrow {
            IllegalStateException("Вы не зарегистрированы")
        }

        if (currentUser.userRole != UserRole.POST_OFFICE_EMPLOYEE) {
            throw IllegalStateException("Вы не сотрудник")
        }

        val parcel = parcels.tryGet(trackId).orElseThrow {
            IllegalStateException("Посылка с указанным трек-номером не найдена!")
        }

        if (currentUser.employeePostId != parcel.parcelCurrentOfficeId) {
            throw IllegalStateException("Вы не можете подтвердить эту посылку!")
        }

        val parcelClass = parcel.parcelClass
        val baseCost = parcelClass.deliveryPrice
        val weight = parcel.parcelWeight
        val declaredValue = parcelDeclaredValue.toDoubleOrNull() ?: 0.0
        val finalCost = baseCost * weight + declaredValue * 0.1

        val sender = users.tryGet(parcel.parcelBlockchainFrom!!).orElseThrow {
            IllegalStateException("Отправитель не найден!")
        }

        if (sender.userBalance < finalCost) {
            throw IllegalStateException("Недостаточно средств на балансе!")
        }

        sender.userBalance -= finalCost
        users.put(sender.surname, sender)

        val updatedParcel = parcel.copy(
            parcelConfirmStatus = ParcelStatus.CONFIRMED,
            parcelCurrentOfficeId = nextPostOfficeId.toInt(),
            parcelNextOfficeId = nextPostOfficeId.toInt()
        )

        parcels.put(trackId, updatedParcel)
    }

    override fun checkoutParcel(trackId: String, nextPostOfficeId: String) {
        val parcel = parcels.tryGet(trackId).orElseThrow {
            IllegalStateException("Не существует посылки")
        }

        val employee = users.tryGet(call.sender.asBase58String()).orElseThrow {
            IllegalStateException("Не существует пользователя")
        }

        if (employee.userRole != UserRole.POST_OFFICE_EMPLOYEE) {
            throw IllegalStateException("Вы не сотрудник")
        }

        if (employee.employeePostId != parcel.parcelNextOfficeId) {
            throw IllegalStateException("Вы сотрудник не того почтового отделения!")
        }

        if (parcel.parcelTo == employee.employeePostId) {
            val deliveredParcel = parcel.copy(
                parcelCurrentOfficeId = employee.employeePostId!!,
                parcelNextOfficeId = 0,
                parcelDeliveryStatus = ParcelStatus.DELIVERED
            )
            parcels.put(trackId, deliveredParcel)
            return
        }

        val updatedParcel = parcel.copy(
            parcelCurrentOfficeId = employee.employeePostId!!,
            parcelNextOfficeId = nextPostOfficeId.toInt()
        )
        parcels.put(trackId, updatedParcel)
    }

    override fun processParcelDelivery(trackId: String, isAccepted: String) {
        if (isAccepted != "true" && isAccepted != "false") {
            throw IllegalArgumentException("Аргумент isAccepted должен быть 'true' или 'false'")
        }
        val acceptedBoolean = isAccepted == "true"
        val parcel = parcels.tryGet(trackId).orElseThrow {
            throw IllegalStateException("Посылка с указанным трек-номером не найдена!")
        }

        if (parcel.parcelDeliveryStatus != ParcelStatus.DELIVERED) {
            throw IllegalStateException("Посылка не доставлена")
        }

        val getter = users.tryGet(call.sender.asBase58String()).orElseThrow {
            throw IllegalStateException("Вы не зарегистрированы!")
        }

        if (getter.surname != parcel.parcelBlockchainTo) {
            throw IllegalStateException("Вы не являетесь получателем")
        }

        if (getter.userAddress != parcel.parcelCurrentOfficeId) {
            val action = if (acceptedBoolean) "принять" else "отклонить"
            throw IllegalStateException("Вы не можете $action эту посылку!")
        }

        val newStatus = if (acceptedBoolean) {
            ParcelStatus.RECEIVED
        } else {
            ParcelStatus.RETURNED
        }

        val updatedParcel = parcel.copy(parcelDeliveryStatus = newStatus)
        parcels.put(trackId, updatedParcel)
    }

    override fun updatePersonalData(
        name: String,
        surname: String,
        middleName: String,
        password: String,
        userAddress: String,
    ) {
        val user = users.tryGet(surname).orElseThrow {
            IllegalStateException("Пользователь не найден!")
        }

        val updatedUser = user.copy(
            name = name,
            surname = surname,
            middleName = middleName,
            password = password,
            userAddress = userAddress.toInt()
        )
        users.put(surname, updatedUser)
    }

    private fun createParcelTrackNumber(from: Int, to: Int, date: String, dailyCount: String): String {
        return "RR${date}${dailyCount}${from}${to}"
    }
}