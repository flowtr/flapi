import { IModule } from "../lib/types";

export const Item = ({ item, module }: { item: Record<string, string | number | boolean>, module: IModule }) => {
  return (
    <div className="item bg-gray-700 text-white flex-col flex items-center justify-start">
      <div className="item__info">
        {module.model.fields.map((field) => {
          if (field.type === "image") {
            return <img src={item[field.id].toString()} alt={field.displayName} />;
          } else {
            return <p>{item[field.id].toString()}</p>;
          }
        })}
        </div>
    </div>
  );
};
