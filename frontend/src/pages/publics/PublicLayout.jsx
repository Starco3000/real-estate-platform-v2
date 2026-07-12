import { Outlet } from "react-router";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
