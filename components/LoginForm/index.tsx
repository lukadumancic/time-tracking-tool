import React, { useState } from "react";
import cn from "classnames";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";

import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className={styles.card}>
        <h2 className="header">Login</h2>
        <div style={{ marginTop: "50px" }}>
          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
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
        <Button label="Login" size="small" className={styles.loginBtn} />
      </div>
      <div className={cn(styles.card, styles.small)}>
        <Image src="/avatar.svg" alt="avatar" width={95} height={95} />
        <div className={styles.infoCardWrapper}>
          <span className={styles.infoCardWrapperText}>Need an account?</span>
          <Link className={styles.infoCardWrapperLink} href="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
