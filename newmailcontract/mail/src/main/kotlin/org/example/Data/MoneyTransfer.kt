package org.example.Data

data class MoneyTransfer(
    val moneyTransferId:String,
    val moneyTransferFrom : String,
    val moneyTransferTo : String,
    val moneyTransferAmount: Double,
    val moneyTransferLifeTime: Int,
    val moneyTransferStatus: MoneyTransferStatus? = MoneyTransferStatus.INITIALIZED
)