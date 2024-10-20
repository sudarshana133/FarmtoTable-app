export interface CategoryProps {
    id: number;
    category: string;
}
const categories: CategoryProps[] = [
    {
        id: 1,
        category: "Grain",
    },
    {
        id: 2,
        category: "Fruit",
    },
    {
        id: 3,
        category: "Vegetable",
    },
    {
        id: 4,
        category: "Other",
    },
];
export default categories;