package org.example

import org.example.Data.Parcel
import org.example.Data.PostOffice

import java.text.SimpleDateFormat
import java.util.Date

fun createParcelTrackNumber(parcelFrom: Int, parcelTo: Int, currentPostOffice: PostOffice): String {
    // Получаем текущую дату в формате ddMMyy
    val dateFormat = SimpleDateFormat("ddMMyy")
    val currentDate = dateFormat.format(Date())

    // Получаем количество посылок в почтовом отделении, если 0, то используем 1
    val optionalPostOfficeParcelsSize = if (currentPostOffice.postOfficeParcels.isEmpty()) 1 else currentPostOffice.postOfficeParcels.size

    // Генерируем трек-номер
    val trackNumber = "RR$currentDate$optionalPostOfficeParcelsSize${parcelFrom}${parcelTo}"

    return trackNumber
}