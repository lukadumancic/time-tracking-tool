import React, { useState } from "react";
import cn from "classnames";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.css";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/asyncActions/userActions";
import { userSelector } from "@/store/selectors";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div>
      <form className={styles.card} onSubmit={onSubmit}>
        <h2 className="header">Login</h2>
        <div style={{ marginTop: "50px" }}>
          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
        </div>
        <div style={{ marginTop: "30px" }}>
          <FloatLabel>
            <Password
              style={{ width: "100%" }}
              id="password"
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
        </div>
        {userData.errorMessage && (
          <span style={{ color: "red" }}>{userData.errorMessage}</span>
        )}
        <Button
          disabled={!email || !password}
          loading={userData.isLoading}
          label="Login"
          size="small"
          type="submit"
          className={styles.loginBtn}
        />
      </form>
      <div className={cn(styles.card, styles.small)}>
        <Image src="/avatar.svg" alt="avatar" width={95} height={95} />
        <div className={styles.infoCardWrapper}>
          <span className={styles.infoCardWrapperText}>Need an account?</span>
          <Link className={styles.infoCardWrapperLink} href="/register">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
