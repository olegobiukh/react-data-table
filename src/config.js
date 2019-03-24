const config = {
  name: {
    title: "Название", // в таблице колонка будет так называться
    isSortable: true, // Поиск будет проверять эту и последнюю колонки
    isSearchable: true
  },
  age: {
    title: "Возраст",
    isSortable: true // по этой колонке можно сортировать
  },
  snippet: {
    // Только для тех ключей которые есть в columnConfig будут колонки в таблице
    title: "Описание",
    isSearchable: true // В этой колонке тоже будет происходить поиск query
  }
};

export default config;
