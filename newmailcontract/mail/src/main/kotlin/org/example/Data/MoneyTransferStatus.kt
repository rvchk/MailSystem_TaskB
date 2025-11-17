package org.example.Data

enum class MoneyTransferStatus{
    INITIALIZED,           // ИНИЦИАЛИЗИРОВАНО
    SENT,                  // ОТПРАВЛЕНО
    RECEIVED,              // ПОЛУЧЕНО
    NOT_RECEIVED,          // НЕ_ПОЛУЧЕНО
    RETURNED,              // ВОЗВРАЩЕНО
    EXPIRED,               // ВРЕМЯ_ЖИЗНИ_ЗАКОНЧИЛОСЬ
    DECLINED               // ОТКАЗАЛСЯ_ОТ_ПОЛУЧЕНИЯ
}