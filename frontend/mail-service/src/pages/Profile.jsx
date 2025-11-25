import { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import { Button, Card, CardBody, Modal } from "react-bootstrap";
import { getUserRole } from "../utils/helpers";
import ChangeUserInfoModal from "../components/modals/ChangeUserInfoModal";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({})
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const { getUser } = useData();

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const user = await getUser()
    setUser(user)
  }

  const changeUserInfo = async () => {
    setShowModal(true)
  }

  const logOut = () => {
    localStorage.setItem("login", "")
    localStorage.setItem("currentRole", "")
    navigate("/")
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
        <Button className="mt-3" variant="danger" onClick={logOut}>
          Выйти из аккаунта
        </Button>
      </Card>
      <ChangeUserInfoModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
