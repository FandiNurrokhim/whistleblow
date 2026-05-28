import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { id: 1, name_en: "dashboard", name_id: "beranda" },
  { id: 2, name_en: "role", name_id: "peran" },
  { id: 3, name_en: "user", name_id: "pengguna" },
  { id: 4, name_en: "product", name_id: "produk" },
  { id: 5, name_en: "stand", name_id: "stand" },
  { id: 6, name_en: "category", name_id: "kategori" },
  { id: 7, name_en: "ingredient", name_id: "bahan" },
  { id: 8, name_en: "setting", name_id: "pengaturan" },
];

const PermissionToggle = ({ value = [], onChange, isReadonly = false }) => {
  const [selected, setSelected] = useState({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const obj = {};
    value.forEach(val => {
      if (typeof val === "number") {
        const found = menuItems.find(item => item.id === val);
        if (found) obj[found.name_en] = true;
      } else if (typeof val === "string") {
        obj[val] = true;
      }
    });
    setSelected(obj);
  }, [value]);

  const toggle = (name_en) => {
    if (isReadonly) return;
    const updated = { ...selected, [name_en]: !selected[name_en] };
    setSelected(updated);
    if (onChange) {
      const names = menuItems.filter(item => updated[item.name_en]).map(item => item.name_en);
      onChange(names);
    }
  };

  const selectAll = () => {
    if (isReadonly) return;
    const allSelected = {};
    menuItems.forEach(item => allSelected[item.name_en] = true);
    setSelected(allSelected);
    if (onChange) {
      onChange(menuItems.map(item => item.name_en));
    }
  };

  const clearAll = () => {
    if (isReadonly) return;
    setSelected({});
    if (onChange) {
      onChange([]);
    }
  };

  const getLabel = (item) => i18n.language === "id" ? item.name_id : item.name_en;

  return (
    <div className="p-4 rounded border bg-white">
      {!isReadonly && (
        <div className="flex justify-end mb-4 gap-2">
          <button onClick={selectAll} type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">
            {t("global.selectAll")}
          </button>
          <button onClick={clearAll} type="button" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded shadow">
            {t("global.clearAll")}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <label key={item.id} className="inline-flex items-center space-x-2 cursor-pointer">
            <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in`}>
              <input
                type="checkbox"
                checked={!!selected[item.name_en]}
                onChange={() => toggle(item.name_en)}
                disabled={isReadonly}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <span className={`toggle-label block overflow-hidden h-6 rounded-full bg-indigo-900 ${selected[item.name_en] ? 'bg-opacity-100' : 'bg-opacity-50'}`}></span>
            </div>
            <span className="text-sm text-gray-700 capitalize">{getLabel(item)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PermissionToggle;