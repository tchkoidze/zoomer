import { useProductFiltersProvider } from "@src/providers/ProductFiltersProvider/useProductFiltersProvider";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { ConfigProvider, Pagination, PaginationProps, theme } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function PaginationButtons({totalProducts}: {totalProducts: number}) {
  const navigate = useNavigate();
  const {category} = useParams();
  const {pageSize} = useProductFiltersProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'))
  const onChange: PaginationProps['onChange'] = (page) => {
    navigate(`/products/${category}`)
    // setSearchParams({page: JSON.stringify(page)})
    searchParams.set("page", JSON.stringify(page));
    setSearchParams(searchParams);
  };

  const {lightMode} = useThemeProvider();
  const {defaultAlgorithm, darkAlgorithm} = theme;

  const configTheme = {
    algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
    "components": {
      "Pagination": {
        "colorPrimary": lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
        "colorPrimaryHover": lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
      }
    }
  }

  return (
    <ConfigProvider theme={configTheme}>
      <Pagination current={Number(page) || 1} pageSize={pageSize} total={totalProducts} onChange={onChange}/>
    </ConfigProvider>
  )
}
