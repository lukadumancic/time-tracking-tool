"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";
import cn from "classnames";

import styles from "./styles.module.css";

const navigationRoutes = ["Trackers", "History", "Logout"];

const NavButton = (props: {
  url: string;
  text: string;
  active?: boolean;
  hideActive?: boolean;
}) => {
  const { url, text, active, hideActive } = props;
  return (
    <Link
      href={url}
      className={cn(styles.btnWrapper, {
        [styles.active]: active,
        [styles.noBorder]: hideActive,
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

  return (
    <div className={styles.container}>
      <Image src="/logo.svg" alt="logo" width={315} height={44} />
      <div className={styles.btnGroup}>
        {navigationRoutes.map((route, index) => (
          <NavButton
            key={route}
            url={`/${route.toLowerCase()}`}
            text={route}
            active={pathname.includes(route.toLowerCase())}
            hideActive={navigationRoutes.length - 1 === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
