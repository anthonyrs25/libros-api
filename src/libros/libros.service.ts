import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
  private libros: Libro[] = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'García Márquez',
      disponible: true,
    },
    { id: 2, titulo: 'El túnel', autor: 'Sabato', disponible: true },
    { id: 3, titulo: 'Rayuela', autor: 'Cortázar', disponible: false },
  ];
  private siguienteId: 4;

  private indiceDe(id: number): number {
    const indice = this.libros.findIndex((libro) => libro.id === id);
    if (indice === -1) {
      throw new NotFoundException(`No existe el libro ${id}`);
    }
    return indice;
  }

  create(createLibroDto: CreateLibroDto) {
    const nuevo: Libro = {
      id: this.siguienteId++,
      titulo: createLibroDto.titulo,
      autor: createLibroDto.autor,
      disponible: createLibroDto.disponible,
    };
    this.libros.push(nuevo);
    return nuevo;
  }

  findAll(autor?: string) {
    if (autor) {
      return this.libros.filter((libro) =>
        libro.autor.toLowerCase().includes(autor.toLowerCase()),
      );
    }
    return this.libros;
  }

  findOne(id: number) {
    return this.libros[this.indiceDe(id)];
  }

  replace(id: number, createLibroDto: CreateLibroDto) {
    const indice = this.indiceDe(id);
    this.libros[indice] = {
      id: id,
      titulo: createLibroDto.titulo,
      autor: createLibroDto.autor,
      disponible: createLibroDto.disponible,
    };
    return this.libros[indice];
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    const indice = this.indiceDe(id);
    this.libros[indice] = { ...this.libros[indice], ...updateLibroDto, id: id };
    return this.libros[indice];
  }

  remove(id: number) {
    const indice = this.indiceDe(id);
    this.libros.splice(indice, 1);
  }
}
