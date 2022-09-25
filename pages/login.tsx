import { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setName } from "@/store/features/authSlice";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //TODO: Implement busness logic
    dispatch(setName(username));
    router.push("/");
  }

  function toggle() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={login}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username</label>
            <div>
              <input
                id="username"
                aria-label="Enter your username"
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <div className={styles["password-container"]}>
              <input
                id="password"
                aria-label="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete={showPassword ? "off" : "on"}
                required
              />
              <button
                className={styles["password-toggler"]}
                type="button"
                onClick={toggle}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          <div>
            <button type="submit" aria-label="login">
              Login
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
