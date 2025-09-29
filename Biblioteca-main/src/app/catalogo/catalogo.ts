import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo {
  searchTerm: string = '';

  // ----- ESTADO DEL MODAL / CALENDARIO -----
  showCalendario = false;
  libroSeleccionado: any = null;
  fechaDesde = '';
  fechaHasta = '';

  // mínimo: hoy (para no permitir fechas pasadas)
  get hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  libros = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      disponibilidad: '(Disponible)',
      autor: 'Gabriel García Márquez',
      genero: 'novela realista magico',
      descripcion: 'Una de las obras más importantes de la literatura hispanoamericana.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40DdhptlKmZrqWs42vaYh5q8dDTYqSjac2g&s',
      anio_edicion: '1967',
    },
    {
      id: 2,
      titulo: 'Don Quijote de la Mancha',
      disponibilidad: '(Agotado)',
      autor: 'Miguel de Cervantes',
      genero: 'narrativo',
      descripcion: 'La historia del caballero andante y su escudero Sancho Panza.',
      imagen: 'https://www.elejandria.com/covers/Don_Quijote_de_la_Mancha-Cervantes_Miguel-lg.png',
      anio_edicion: '1605',
    },
    {
      id: 3,
      titulo: 'El Principito',
      disponibilidad: '(Disponible)',
      autor: 'Antoine de Saint-Exupéry',
      genero: 'novela infantil',
      descripcion: 'Un clásico que explora la infancia, la imaginación y la amistad.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGS4EXMwDImmp1Hi_uCZebMn8bCVnF6JPyww&s',
      anio_edicion: '1943',
    },
    {
      id: 4,
      titulo: 'Crepúsculo',
      disponibilidad: '(Disponible)',
      autor: 'Stephenie Meyer',
      genero: 'novela fantasia romance y ciencia ficcion',
      descripcion: 'Un clásico que explora el amor sobrenatural.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp80W-_ySBHlkvUtqDeOpwfYok3oSG9uY7qw&s',
      anio_edicion: '2005',
    },
    {
      id: 5,
      titulo: 'La Odisea',
      disponibilidad: '(Disponible)',
      autor: 'Homero',
      genero: 'poema epico',
      descripcion: 'Historia del héroe griego Ulises.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-do1cARnM5ZjqdKeSUiaUpqTzrkRVOWEfpg&s',
      anio_edicion: 'siglo VIII a. C.',
    },
    {
      id: 6,
      titulo: 'Harry Potter y la piedra filosofal',
      disponibilidad: '(Agotado)',
      autor: 'J. K. Rowling',
      genero: 'novela magica',
      descripcion: 'Historia de un niño que descubre que es mago.',
      imagen: 'https://imgv2-1-f.scribdassets.com/img/word_document/636301739/original/216x287/f40ab5f3e7/1752077214?v=1',
      anio_edicion: '1997',
    },
    {
      id: 7,
      titulo: 'Papelucho detective',
      disponibilidad: '(Disponible)',
      autor: 'Marcela Paz',
      genero: 'Ficcion',
      descripcion: 'Un niño ingenioso se convierte en detective amateur tras un viaje con su amigo Chirigüe.',
      imagen: 'https://dojiw2m9tvv09.cloudfront.net/82626/product/asdsdsfasdasd3465.png',
      anio_edicion: '1956',
    },
    {
      id: 8,
      titulo: 'Diario de Ana Frank',
      disponibilidad: '(Disponible)',
      autor: 'Ana Frank',
      genero: 'Biografía, Autobiografía, Narrativa personal',
      descripcion: 'Relato íntimo durante el escondite en el anexo secreto de Ámsterdam.',
      imagen: 'https://www.antartica.cl/media/catalog/product/9/7/9789878354194_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg',
      anio_edicion: '1947',
    }
  ];

  // Filtro de búsqueda
  librosFiltrados() {
    if (!this.searchTerm) return this.libros;
    const term = this.searchTerm.toLowerCase();
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(term) ||
      libro.autor.toLowerCase().includes(term) ||
      libro.genero.toLowerCase().includes(term)
    );
  }

  // ----- MODAL: abrir / cerrar / confirmar -----
  openCalendario(libro: any) {
    if (libro.disponibilidad.toLowerCase().includes('agotado')) return;
    this.libroSeleccionado = libro;
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.showCalendario = true;
  }

  cerrarCalendario() {
    this.showCalendario = false;
    this.libroSeleccionado = null;
  }

  confirmarPrestamo() {
    if (!this.fechaDesde || !this.fechaHasta) {
      alert('Selecciona ambas fechas (desde y hasta).');
      return;
    }
    if (this.fechaDesde > this.fechaHasta) {
      alert('La fecha “desde” no puede ser mayor que la “hasta”.');
      return;
    }

    // Aquí llamarías a tu backend/servicio real
    console.log('Préstamo solicitado:', {
      libroId: this.libroSeleccionado?.id,
      titulo: this.libroSeleccionado?.titulo,
      desde: this.fechaDesde,
      hasta: this.fechaHasta
    });

    alert(`Préstamo solicitado para "${this.libroSeleccionado.titulo}"
Desde: ${this.fechaDesde}
Hasta: ${this.fechaHasta}`);

    this.cerrarCalendario();
  }
}
