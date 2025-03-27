import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  signal
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  /** Current active page number */
  @Input({ required: true }) currentPage!: number;

  /** Total number of pages available */
  @Input({ required: true }) totalPages!: number;

  /** Event emitter for page changes */
  @Output() pageChanged = new EventEmitter<number>();

  /** Array of visible page numbers */
  readonly pages = signal<number[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['totalPages']) {
      this.updateVisiblePages();
    }
  }

  /**
   * Updates the list of visible pages based on current position
   * Shows up to 5 pages centered around current page
   */
  private updateVisiblePages(): void {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    this.pages.set(pages);
  }

  /**
   * Handles page navigation events
   * @param page - Target page number
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
