import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Sprout,
  Leaf,
  MessageCircle,
  Stethoscope,
  LogOut,
  Menu,
} from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newsdata, setNewsdata] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser("User");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        setUser(data.name);
        setUserData(data);
      } catch {
        setUser("User");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_81924bea37683a2602e8855a2c144f6c1c31a&q=herbs%20OR%20ayurveda%20OR%20homeopathy&country=in&language=en&category=health,science&size=6"
        );
        const data = await res.json();
        setNewsdata(data);
      } catch (e) {
        console.error("Error loading news");
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading || newsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-green-600"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-poppins">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gradient-to-br from-green-900 to-green-700 text-white p-4 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mb-6 text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
          {!isCollapsed && (
            <h1 className="text-3xl font-bold mb-10 tracking-wide">
              🌿 FloraMed
            </h1>
          )}

          <nav className="space-y-3 text-sm">
            <NavItem to="/" label="Home" icon={<Home size={20} />} />
            <NavItem to="/myherbs" label="My Herbs" icon={<Sprout size={20} />} />
            <NavItem
              to="/dashboard/gardening-tips"
              label="Gardening Tips"
              icon={<Leaf size={20} />}
            />
            <NavItem
              to="/health"
              label="Health Tips"
              icon={<MessageCircle size={20} />}
            />
            <NavItem
              to="/add-plants"
              label="Add Plants"
              icon={<Sprout size={20} />}
            />
            <NavItem
              to="/doctors"
              label="Book Appointment"
              icon={<Stethoscope size={20} />}
            />
            {userData?.role === "HERBALIST" && (
              <NavItem
                to="/my-plants"
                label="My Plants"
                icon={<Sprout size={20} />}
              />
            )}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 max-w-screen-xl mx-auto overflow-auto">
        <h2 className="text-3xl font-bold text-green-900 mb-2 tracking-wide">
          👋 Welcome back, <span className="text-green-700">{user}</span>
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Stay updated with the latest herbal wellness news 🍀
        </p>

        {/* News Section */}
        <section className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-green-800">Latest News</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {newsdata?.results?.map((article, index) => (
              <div
                key={index}
                className="bg-white card rounded-xl overflow-hidden shadow hover:shadow-lg transform transition duration-300"
              >
                <img
                  src={
                    article.image_url ||
                    "https://mediaengagement.org/wp-content/uploads/2022/12/News-Desert-Web-Tile-1.png"
                  }
                  alt="News"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-green-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Read full article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  function NavItem({ to, label, icon }) {
    return (
      <Link
        to={to}
        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
          location.pathname === to ? "bg-green-800" : "hover:bg-green-800"
        }`}
        title={label}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Link>
    );
  }
}
