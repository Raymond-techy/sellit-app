import { useState, useEffect, useRef, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../Context/AuthContext";

export function UseAuthStatus() {
  // const { setUser } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, checkingStatus };
}
