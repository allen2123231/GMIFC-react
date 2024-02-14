import { Button } from "antd";
import { FC, useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import GoogleSvg from "./googleIcon";
import { MessageInstance } from "antd/es/message/interface";
import { datebase } from "../../firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../store/location";
import { TRootState } from "../../store/store";

interface IContinueWithGoogleProps {
  messageApi: MessageInstance;
}

const ContinueWithGoogle: FC<IContinueWithGoogleProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationState = useSelector<TRootState, string>(
    (state) => state.locationState.location
  );

  useEffect(() => {
    navigate(`../${locationState}`);
  }, [locationState, navigate]);

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
      navigate("../Model");
      dispatch(setLocation("Model"));
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
      Continue with Google
    </Button>
  );
};
export default ContinueWithGoogle;
