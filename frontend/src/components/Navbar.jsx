import { MessageCircle, Settings, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
   <nav className="fixed top-0 left-0 w-screen px-6 py-4 bg-base-100 shadow-md z-50">
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-bold text-xl"
        >
          <MessageCircle size={26} />
          <span>Chatty</span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* Settings - ALWAYS visible  */}
          {/* <Link
            to="/setting"
            className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link> */}

          {/* Profile & Logout - ONLY when logged in */}
          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
