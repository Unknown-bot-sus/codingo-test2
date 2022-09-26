import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getUserName } from "@/store/features/authSlice";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const username = useSelector(getUserName);

  useEffect(() => {
    if (username === "" || username === null) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
