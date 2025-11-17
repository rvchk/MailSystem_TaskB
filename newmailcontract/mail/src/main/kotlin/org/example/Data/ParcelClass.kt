package org.example.Data

enum class ParcelClass(
    val deliveryDays: Int,
    val deliveryPrice: Double
) {
    FIRST(5, 0.5),
    SECOND(10, 0.3),
    THIRD(15, 0.1),
}