package org.example.Data

data class Parcel(
    var parcelTrackNumber: String = "",
    val parcelFrom: Int,
    val parcelTo: Int,
    val parcelType: ParcelType,
    val parcelClass: ParcelClass,
    val parcelDeliveryTime: String?,
    val parcelDeliveryPrice: Double?,
    val parcelWeight: Double,
    val parcelDeclaredValue: Double? = 0.0,
    val parcelTotalAmount: String?,
    val parcelBlockchainFrom: String?,
    val parcelBlockchainTo: String,
    var parcelCurrentOfficeId: Int,
    var parcelNextOfficeId: Int? = 0,
    val parcelCheckoutEmployees: List<User>?,
    var parcelDeliveryStatus: ParcelStatus? = ParcelStatus.RETURNED,
    val parcelExpiredStatus: ParcelStatus? = ParcelStatus.CANCELLED,
    val parcelConfirmStatus: ParcelStatus? = ParcelStatus.IN_TRANSIT
)