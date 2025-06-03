import { useEffect } from "react";
import { useLocation } from "react-router";

const getSEOData: Record<string, { title: string; description: string }> = {
  "/": { title: "Home", description: "Home Page" },
  "/route2": { title: "Route 2", description: "Route 2 Page" },
  "/route3": { title: "Route 3", description: "Route 3 Page" },
  "/route4": { title: "Route 4", description: "Route 3 Page" },
};

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSEOData[pathname] || {
      title: "Home",
      description: "Home Page",
    };
    document.title = seo.title;

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      if (!document.head.contains(metaDescription)) {
        document.head.appendChild(metaDescription);
      }
    }
    metaDescription.setAttribute("content", seo.description);
  }, [pathname]);
  return <></>;
};

export default SEO;
