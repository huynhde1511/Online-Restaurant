import getCategories from "@/actions/get-categories";
import Box from "@/components/box";
import Container from "@/components/container";
import FilterContainer from "@/components/filter-container";
import CategoryFilters from "./components/category-filter";
import getSizes from "@/actions/get-sizes";
import SizesFilters from "./components/size-filter";
import KitchenFilters from "./components/kitchen-filter";
import getkitchens from "@/actions/get-kitchens";
import getCuisines from "@/actions/get-cuisines";
import CuisineFilters from "./components/cuisine-filter";
import getProducts from "@/actions/get-products";
import PageContent from "./components/page-content";

export const revalidate = 0; 
interface MenuProps { 
    searchParams:{ 
        size?:string, 
        isFeatured?:boolean, 
        cuisine?:string, 
        category?:string, 
        kitchen?:string
    }
}
const Menu = async({searchParams}:MenuProps) => { 
  const categories = await getCategories(); 
  const sizes = await getSizes()
  const kitchens = await getkitchens()
  const cuisines = await getCuisines() 
  const products = await getProducts({ 
    size: searchParams?.size, 
    isFeatured: searchParams?.isFeatured, 
    category: searchParams?.category, 
    cuisine: searchParams?.cuisine, 
    kitchen: searchParams?.kitchen
  })
  return <Container className="px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 py-12 gap-2">
            <div className="hidden md:block col-span-2 border-r border-gray-100"> 
                 <FilterContainer>
                    <CategoryFilters categories={categories} />
                    <SizesFilters sizes={sizes} />
                    <KitchenFilters kitchens={kitchens} />
                    <CuisineFilters cuisines={cuisines} />
                 </FilterContainer>
            </div> 
            <Box className="col-span-12 md:col-span-10 flex-col items-start justify-start w-full">
               <PageContent products={products} />
            </Box>
        </div>
  </Container>
}

export default Menu
