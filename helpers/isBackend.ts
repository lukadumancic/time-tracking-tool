const isBackend = () => {
    return typeof window === "undefined";
  };
  
  export default isBackend;
  