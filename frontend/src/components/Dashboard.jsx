import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Search, BookOpen, Sprout, Leaf, MessageCircle, LogOut, Menu } from "lucide-react";
import "./dashboard.css";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newsdata, setNewsdata] = useState(null);
  const[userData,setUserData]=useState(null);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(false);
  

  // Collapse sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // or whatever key you're using
      if (!token) {
        console.warn("No token found in localStorage");
        setUser("User");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch("https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setUser(data.name);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser("User");
      }
    };
  
    fetchUserData();
  }, []);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_81924bea37683a2602e8855a2c144f6c1c31a&q=medicinal%20herbs%20OR%20medicinal%20herbs%20OR%20herbs%20OR%20ayurveda%20OR%20homeopathy&country=in&language=en&category=health,science&size=3"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewsdata(data);
        setNewsLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  if (loading || newsLoading) return <div className="text-center mt-10">Loading...</div>;


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? "w-16" : "w-64"} bg-green-900 text-white p-6 flex flex-col justify-between transition-all duration-300`}>
        <div>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-6 text-white focus:outline-none">
            <Menu size={24} />
          </button>
          {!isCollapsed && <h1 className="text-3xl font-bold mb-10">FloraMed</h1>}

          {/* Navigation */}
          <nav className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 nav-link" title="Home"><Home size={20} />{!isCollapsed && <span>Home</span>}</Link>
            <Link to="/myherbs" className="flex items-center space-x-2 nav-link" title="My Herbs"><Sprout size={20} />{!isCollapsed && <span>My Herbs</span>}</Link>
            <Link to="/dashboard/gardening-tips" className="flex items-center space-x-2 nav-link" title="Gardening Tips"><Leaf size={20} />{!isCollapsed && <span>Gardening Tips</span>}</Link>
            <Link to="/health" className="flex items-center space-x-2 nav-link" title="Health Tips"><MessageCircle size={20} />{!isCollapsed && <span>Health Tips</span>}</Link>
            <Link to="/add-plants" className="flex items-center space-x-2 nav-link" title="Health Tips"><Sprout size={20} />{!isCollapsed && <span>Add Plants</span>}</Link>
            <Link to="/doctors" className="flex items-center space-x-2 nav-link" title="Health Tips"><Sprout size={20} />{!isCollapsed && <span>Book an Appointment</span>}</Link>

            {(userData && userData.role=="HERBALIST") ? (<Link to="/my-plants" className="flex items-center space-x-2 nav-link" title="Health Tips"><Sprout size={20} />{!isCollapsed && <span>My Plants</span>}</Link>): (<div></div>)}


          </nav>
        </div>

        {/* Logout */}
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Welcome, {user ? user : "..." }!
        </h2>

        {/* News */}
        <section className="mt-12 bg-green-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-main-color">Latest News</h2>
          <div className="space-y-6">
            {newsdata?.results?.length > 0 ? (
              newsdata.results.map((article, index) => (
                <div key={index} className="flex p-7 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] duration-300">
                  <img src={article.image_url ? article.image_url : "https://mediaengagement.org/wp-content/uploads/2022/12/News-Desert-Web-Tile-1.png"} alt="News" className="w-32 h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-green-800 mb-2">{article.title}</h3>
                    <p className="text-gray-700 mb-2">{article.description}</p>
                    <a href={article.link} target="_blank" className="text-blue-600 hover:underline text-sm" rel="noreferrer">Read more</a>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading news articles...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
