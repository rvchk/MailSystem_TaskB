plugins {
    kotlin("jvm") version "1.9.22"
    application
    java
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

dependencies {
    implementation("com.wavesenterprise:we-contract-sdk-grpc:1.3.0")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.13.2")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.2")
    implementation("commons-codec:commons-codec:1.15")
}

application {
    this.mainClass.set("org.example.MainDispatchKt")
}