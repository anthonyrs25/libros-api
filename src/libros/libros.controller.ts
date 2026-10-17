import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { CreateLibroDto } from './dto/create-libro.dto';
import type { Response } from 'express'

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto, @Res({ passthrough: true }) res: Response) {
    const nuevo = this.librosService.create(createLibroDto);
    res.setHeader('Location', `/libros/${nuevo.id}`);
    return nuevo;
  }

  @Get()
  findAll(@Query('autor') autor?: string) {
    return this.librosService.findAll(autor);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.findOne(id);
  }

  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() createLibroDto: CreateLibroDto) {
    return this.librosService.replace(id, createLibroDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(id, updateLibroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.remove(id);
  }
}
