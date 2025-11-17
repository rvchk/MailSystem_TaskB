package org.example.Data

data class PostOffice(
    var postOfficeId: Int,
    var postOfficeType: PostOfficeType,
    var postOfficeEmployees: List<User>,
    var postOfficeParcels: List<Parcel?>
)
