interface CategoryBodeyRequest {
  name: string;
  icon?: string; // Optional if icon may not always be provided
  slug: string;
  parent?: string | null; // Optional or null if parent may not be provided
}

export { CategoryBodeyRequest };
