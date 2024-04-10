// categoria.model.ts
export interface Categoria {
    id: number;
    nombre: string;
    subcategorias: Subcategoria[];
  }
  
  export interface Subcategoria {
    id: number;
    nombre: string;
  }
  