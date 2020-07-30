export interface ICategories {
  id: number;
  category: string;
  sub_categories: [{ id: number; sub_category: string }];
}
