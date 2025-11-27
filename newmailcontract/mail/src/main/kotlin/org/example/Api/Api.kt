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
        password: String,
        userAddress: String,
    )

    @ContractAction
    fun registerEmployee(
        login: String,
        userAddress: String
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
        login: String,
        parcelTo: String,
        parcelType: String,
        parcelClass: String,
        parcelWeight: String,
        parcelBlockchainTo: String,
        currentDate: String,
        dailyCount: String
    )

    @ContractAction //parcelDeclaredValue = double в класе, нужно преоброзовать в toDouble() в контракте
    fun confirmParcel(login: String, trackId: String, parcelDeclaredValue: String, nextPostOfficeId: String)

    @ContractAction
    fun checkoutParcel(trackId: String, nextPostOfficeId: String)

    @ContractAction
    fun processParcelDelivery(trackId: String, isAccepted: String)

    @ContractAction
    fun changeEmployeePostId(login : String, postId: Int)

    @ContractAction
    fun deleteEmployee(login: String)

    @ContractAction
    fun updatePersonalData(name: String, surname: String, middleName: String, password: String, userAddress: String)

}