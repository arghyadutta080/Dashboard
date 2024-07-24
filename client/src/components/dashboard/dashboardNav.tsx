"use client";

import { usePathname } from "next/navigation";
import {
  
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
      
        <div className="block text-center text-4xl font-bold mb-4 mt-5">Dashboard</div>
        
      
    
  );
};

export default Navbar;