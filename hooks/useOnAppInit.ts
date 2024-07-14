import { setupUserTriggers } from "@/store/asyncActions/userActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userSelector } from "@/store/selectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useOnAppInit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(setupUserTriggers());
  }, []);

  useEffect(() => {
    if (userData.user) {
      if (window.location.pathname === "/") {
        router.push("/trackers");
      }
    } else {
      if (window.location.pathname !== "/") {
        router.push("/");
      }
    }
  }, [userData]);
};

export default useOnAppInit;
