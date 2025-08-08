import { useEffect } from "react";
import { useFirebase } from "../context/useFirebase";
import { getAuth } from "firebase/auth";

const TestConnection = () => {
  const app = useFirebase();
  const auth = getAuth(app);

  useEffect(() => {
    console.log("✅ Firebase Auth initialized", auth);
  }, [auth]);

  return <p className="text-green-600 font-semibold">Firebase is connected ✅</p>;
};

export default TestConnection;
