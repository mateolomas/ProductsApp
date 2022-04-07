import {useEffect, useState} from 'react';
import {CagetoriesResponse, Categoria} from '../interfaces/appInterfaces';
import {productsApi} from '../api/productsApi';

export const useCategories = () => {
  const [categories, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await productsApi.get<CagetoriesResponse>('/categorias');
    setCategorias(resp.data.categorias);
    setIsLoading(false);
  };

  return {categories, isLoading};
};
