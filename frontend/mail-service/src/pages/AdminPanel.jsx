import { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import { Button, Card, CardBody, Modal } from "react-bootstrap";
import { getUserRole } from "../utils/helpers";
import ChangeUserInfoModal from "../components/forms/ChangeUserInfoModal";

export default function AdminPanel() {
  const [user, setUser] = useState({})
  const [showModal, setShowModal] = useState(false)
  const { getUser } = useData();
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const user = await getUser()
    console.log(user)
    setUser(user)
  }

  const changeUserInfo = async () => {
    setShowModal(true)
  }

  return (
    <>
      <h1>Профиль</h1>
      <Card>
        <h4>{user.surname} {user.name} {user.middleName}</h4>
        <CardBody className="text-left">
          <h5>Адрес: {user.userAddress}</h5>
          <h5>Баланс: {user.userBalance}</h5>
          <h5>Роль: {getUserRole(user.userRole)}</h5>
        </CardBody>

        <Button onClick={changeUserInfo}>
          Изменить личные данные
        </Button>
      </Card>
      <div className="mt-4">
        <h2>Основная информация</h2>
      </div>
      <ChangeUserInfoModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={user}
      />
    </>
  );
}
