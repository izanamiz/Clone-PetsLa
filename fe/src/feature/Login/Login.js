import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { getUsers, loginUser } from "../../service/apiRequest";
import { useDispatch } from "react-redux";
import { successToast, errorToast, warnToast } from "../../utils/toastify/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validateForm/index";

export default function Login() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
        warnToast('Bạn đã đăng nhập rồi!')
        navigate("/shop")
    }
  }, [token, navigate])
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoad(true);
    const newUser = {
      username: data.username,
      password: data.password,
    };
    loginUser(newUser, dispatch).then((res) => {
      if (res) {
        successToast("Đăng nhập thành công!");
        getUsers(localStorage.getItem("token"), dispatch).then(() => {
          (navigate(-1))
        })
      } else {
        errorToast("Sai tên đăng nhập hoặc mật khẩu");
        setLoad(false);
      }
    });
  };

  const handleOnhide = () => {
    navigate("/shop");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  return (
    <div>
      <Modal
        show={true}
        onHide={handleOnhide}
        centered
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Username..."
                name="username"
                {...register("username", { value: "" })}
                
              />
              <Form.Text className="text-danger">
                {errors.username?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password..."
                name="password"
                {...register("password", { value: "" })}
                
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group className="d-grid">
              <Button variant="success" type="submit" disabled={load}>
                Login
              </Button>
            </Form.Group>
          </Form>
          <div className="separate-wrap">
            <div className="separate-dash"></div>
            <div className="separate-text">or</div>
            <div className="separate-dash"></div>
          </div>
          <div>
            <div className="d-grid gap-3">
              <Button variant="danger" size="md">
                Login with Google
              </Button>
              <Button variant="primary" size="md">
                Login with Facebook
              </Button>
            </div>
          </div>
          <div>
            <div className="change-modal-wrap">
              <div onClick={handleRegister} className="change-to-register">
                Do not have an account? Register
              </div>
              <div className="forgot-password">Forgot password?</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
