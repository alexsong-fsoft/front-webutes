import { Page } from './page';
import { PageItem } from './pageitem';

export class PageRender <T> {
    url: String;
    page: Page<T>;
    totalPaginas: number;
    numElementosPorPagina: number;
    paginaActual: number;
    paginas: PageItem[];
    first: boolean;
    last: boolean;
    hasPrevious: boolean;
    hasNext: boolean;

    constructor(url: String, page: Page<T>) {
        this.url = url;
        this.page = page;
        //this.paginas = new PageItem[];
        this.numElementosPorPagina = page.size;
        this.totalPaginas = page.totalPages;
        this.paginaActual = page.number + 1;
        this.first = page.first;
        this.last = page.last;
        this.hasPrevious = this.isHasPrevious();
        this.hasNext = this.isHasNext();
        let desde: number;
        let hasta: number;
        if (this.totalPaginas <= this.numElementosPorPagina) {
            desde = 1;
            hasta = this.totalPaginas;
        } else {
            if (this.paginaActual <= this.numElementosPorPagina / 2) {
                desde = 1;
                hasta = this.numElementosPorPagina;
            } else if (this.paginaActual >= this.totalPaginas - this.numElementosPorPagina / 2) {
                desde = this.totalPaginas - this.numElementosPorPagina + 1;
                hasta = this.numElementosPorPagina;
            } else {
                desde = this.paginaActual - this.numElementosPorPagina / 2;
                hasta = this.numElementosPorPagina;
            }
        }
        this.paginas = new Array(hasta);
        for (let i: number = 0; i < hasta; i++) {
            this.paginas[i] = new PageItem(desde + i, this.paginaActual == desde + i);
        }
    }

    isHasPrevious(): boolean {
        return !this.page.first;
    }

    isHasNext(): boolean {
        return !this.page.last;
    }
}