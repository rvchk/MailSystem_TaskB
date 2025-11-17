package org.example.Data

data class User(
    var name: String,
    var surname: String,
    var middleName: String,
    var userBlockchain: String?,
    var userAddress: Int,
    var userBalance: Double =  0.0,
    var userRole: UserRole,
    var employeePostId: Int? = 0
)