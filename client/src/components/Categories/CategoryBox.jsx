import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
const CategoryBox = ({ label, icon: Icon, category }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      const updatedQuery = { ...currentQuery, category: label };
      const url = qs.stringifyUrl({ url: "/", query: updatedQuery });
      navigate(url);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`${
        category
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      } flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
