import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismaDb";

const page = async ({}) => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default page;
