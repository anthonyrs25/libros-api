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

  private indiceDe(id: number): number {
    const indice = this.libros.findIndex((libro) => libro.id === id);
    if (indice === -1) {
      throw new NotFoundException(`No existe el libro ${id}`);
    }
    return indice;
  }

  create(createLibroDto: CreateLibroDto) {
    return 'This action adds a new libro';
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

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
}
