import { NextPageWithLayout } from "types/page";
import styles from "@/styles/nav.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearName, getUserName } from "@/store/features/authSlice";
import Link from "next/link";

import { BsPersonCircle } from "react-icons/bs";

export const Nav: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector(getUserName);

  function logout() {
    //TODO: Implement logout function
    dispatch(clearName);
    router.push("/login");
  }

  return (
    <div className={styles["nav-container"]}>
      <Link className="home-link" href="/">
        <a className="home-link">Football team manager</a>
      </Link>
      <div>
        <span className={styles["user-name"]}>
          <BsPersonCircle /> {username}
        </span>
        <button className="btn" onClick={logout} arial-label="Logout">
          Logout
        </button>
      </div>
    </div>
  );
};
