.././gradlew clean build
docker build . -t $1
docker push $1