import pluralize from "pluralize";
import { RefreshCw } from "preact-feather";
import { useState, useEffect } from "preact/hooks";
import { api } from "../lib/api";
import { useRoute } from "../lib/route-hooks";
import { IModule } from "../lib/types";

export const ItemListPage = () => {
  const [items, setItems] = useState<
    Record<string, string | number | boolean>[]
  >([]);
  const [module, setModule] = useState<Partial<IModule>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [_match, params] = useRoute("/:module");

  const getItems = async () => {
    setIsLoading(true);
    setItems([]);
    const res = await api.get(`/${params?.module}`);
    setItems(res.data.data);
    setModule(res.data.module);
    setIsLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-pink-600 font-bold text-3xl mb-4">
        {pluralize
          .plural(module.name ?? "Item")
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}
      </h1>
      <button className="btn" onClick={getItems}>
        {isLoading ? "Loading..." : <RefreshCw />}
      </button>
      <div className="mt-4 bg-gray-700 rounded max-w-xs w-full shadow-lg leading-normal">
        {items.map((item) => (
          <div key={item._id} className="p-4 text-center">
            <a href={`/${module.name}/${item._id}`}>
              {item[module.mainField ?? "name" ?? "_id"]}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
