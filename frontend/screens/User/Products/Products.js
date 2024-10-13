import { useEffect, useState } from "react";
import ProductsList from "../../../components/Products/ProductsList";
import { useSelector } from "react-redux";
import { getInitialData } from "../../../services/productsService";

export default function Products() {
  const token = useSelector((state) => state.auth.accessToken);

  const [initialFilters, setInitialFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInitialFilters();
  }, []);

  async function getInitialFilters() {
    setIsLoading(true);
    try {
      const filters = await getInitialData(token);
      setInitialFilters(filters);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProductsList
      initialFilters={initialFilters}
      isLoadingInitialFilters={isLoading}
    />
  );
}
