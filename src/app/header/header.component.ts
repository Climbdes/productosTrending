import { Component, HostListener, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Definir una interfaz para el tipo de objeto categoría
interface CategoriaConSubcategorias {
  categoria: string;
  subcategorias: string[];
  mostrarSubcategorias: boolean; // Agregar la propiedad mostrarSubcategorias
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavHidden = false;
  lastScrollTop = 0;
  categorias: CategoriaConSubcategorias[] = [];
  categoriasSeleccionadas = new Set<string>();

  constructor(private productService: ProductoService) {}

  ngOnInit(): void {
    this.productService.getCategorias().pipe(
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return of([]); // Retorna un observable vacío en caso de error
      })
    ).subscribe((categorias: any[]) => {
      this.categorias = categorias.map(categoria => ({ ...categoria, mostrarSubcategorias: false }));
    });
  }

  toggleCategoria(categoria: string): void {
    if (this.categoriasSeleccionadas.has(categoria)) {
      this.categoriasSeleccionadas.delete(categoria);
    } else {
      this.categoriasSeleccionadas.add(categoria);
    }
  }

  isCategoriaSeleccionada(categoria: string): boolean {
    return this.categoriasSeleccionadas.has(categoria);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.isNavHidden = currentScroll > this.lastScrollTop && currentScroll > 50;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}

