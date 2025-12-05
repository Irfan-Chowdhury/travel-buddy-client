// import PublicFooter from "@/components/shared/PublicFooter";
// import PublicNavbar from "@/components/shared/PublicNavbar";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <Navbar/>

            {children}
            
            <Footer/>
        </>
    );
};

export default CommonLayout;