import { Button } from "antd";
import { FC } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import GoogleSvg from "./googleIcon";
import { MessageInstance } from "antd/es/message/interface";
import { datebase } from "../../firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface IContinueWithGoogleProps {
  loginType: string;
  messageApi: MessageInstance;
}

const ContinueWithGoogle: FC<IContinueWithGoogleProps> = ({
  loginType,
  messageApi,
}) => {
  const navigate = useNavigate();

  const onclick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // check for the user
      const docRef = doc(datebase, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          username: user.displayName,
          photoURL: user.photoURL,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/Model");
    } catch (error) {
      messageApi.error("Could not authenticate with Google");
    }
  };
  return (
    <Button
      type="primary"
      onClick={onclick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40px",
        fontSize: "16px",
        border: 0,
        background: "#393939",
        boxShadow: "0 0 0 0",
      }}
    >
      <GoogleSvg />
      {loginType === "Login" ? "Login with Google" : "Signup with Google"}
    </Button>
  );
};
export default ContinueWithGoogle;
