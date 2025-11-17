package org.example.Api

import com.google.type.Money
import com.wavesenterprise.sdk.contract.api.annotation.ContractAction
import com.wavesenterprise.sdk.contract.api.annotation.ContractInit
import org.example.Data.*

interface Api {
    @ContractInit
    fun init()

    @ContractAction
    fun register(
        name: String,
        surname: String,
        middleName: String,
        userAddress: Int,
        userBalance: Int = 0
    )

    @ContractAction
    fun registerEmployee(
        name: String,
        surname: String,
        middleName: String,
        employeeBlockchain: String,
        userAddress: Int,
        userBalance: Int,
        userPostId: Int
    )

    @ContractAction
    fun createMoneyTransfer(
        moneyTransferTo: String,
        moneyTransferAmount: Int,
        moneyTransferLifeTime: Int,
    )

    @ContractAction
    fun processMoneyTransfer(id: String, action: String)

    @ContractAction
    fun initiateSendParcel(
        parcelTo: Int,
        parcelType: String,
        parcelClass: String,
        parcelWeight: Int,
        parcelBlockchainTo: String,
        currentDate: String,
        dailyCount: String
    )

    @ContractAction //parcelDeclaredValue = double в класе, нужно преоброзовать в toDouble() в контракте
    fun confirmParcel(trackId: String, parcelDeclaredValue: String, nextPostOfficeId: Int)

    @ContractAction
    fun checkoutParcel(trackId: String, nextPostOfficeId: Int)

    @ContractAction
    fun processParcelDelivery(trackId: String, isAccepted: String)

    @ContractAction
    fun changeEmployeePostId(employeeBlockchain : String, postId: Int)

    @ContractAction
    fun deleteEmployee(employeeBlockchain: String)

    @ContractAction
    fun updatePersonalData(name: String, surname: String, middleName: String, userAddress: Int)

}