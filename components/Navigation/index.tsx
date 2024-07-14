"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userSelector } from "@/store/selectors";
import { logoutUser } from "@/store/asyncActions/userActions";

import styles from "./styles.module.css";

const navigationRoutes = ["Trackers", "History"];

const NavButton = (props: {
  url: string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const { url, text, active, onClick } = props;
  return (
    <Link
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      href={url}
      className={cn(styles.btnWrapper, {
        [styles.active]: active,
        [styles.noBorder]: !!onClick,
      })}
    >
      <Button
        label={text}
        severity="secondary"
        text
        icon="pi pi-clock"
        className={cn(styles.btn, { [styles.active]: active })}
      />
    </Link>
  );
};

const Navigation = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const userData = useAppSelector(userSelector);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.svg" alt="logo" width={315} height={44} />
      {userData.user && (
        <div className={styles.btnGroup}>
          {navigationRoutes.map((route, index) => (
            <NavButton
              key={route}
              url={`/${route.toLowerCase()}`}
              text={route}
              active={pathname.includes(route.toLowerCase())}
            />
          ))}
          <NavButton url="/logout" text="Logout" onClick={logout} />
        </div>
      )}
    </div>
  );
};

export default Navigation;
