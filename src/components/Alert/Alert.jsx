import styles from "./Alert.module.css";
import { useLocation } from "react-router";

const Alert = ({
  alertMessage = "",
  alertType = "",
  validationErrors = [],
}) => {
  const location = useLocation();
  const message = alertMessage || location.state?.message || "";
  const type = alertType || location.state?.type || "";

  if (!message) return;

  return (
    <>
      <div className={`${styles.alert} ${styles[type]}`}>
        <p>{message}</p>
      </div>
      {validationErrors.length > 0 &&
        validationErrors.map((error) => {
          return (
            <div className={`${styles.alert} ${styles.error}`}>
              <p>{error.msg}</p>
            </div>
          );
        })}
    </>
  );
};

export default Alert;
