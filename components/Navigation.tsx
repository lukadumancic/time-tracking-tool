import Image from "next/image";

const Navigation = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "112px",
        background: "var(--primary-color)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: '45px',
        paddingRight: '45px',
      }}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        width={315}
        height={44}
      />
    </div>
  );
};

export default Navigation;
